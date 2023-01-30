import { useCallback, useMemo, useState,useEffect} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
  } from "@mui/material";
import { changePassword ,profile,updateProfile} from "../../utils/userUtils";
import jwt from 'jwt-decode'
import Toast from "../Toast/index.jsx";
import {MESSAGE_SUCCESS} from "../../constants/index.js";
import axios from "axios";
function ProfileInput({ ...props }) {
    const [fields, setFields] = useState({})
    const [image,setImage] = useState();
    const [loading,setLoading] = useState("default");
    const [errors, setErrors] = useState({})
    const [user,setUser] = useState("");
    const [toastData, setToastData] = useState({
        color: "",
        title: "",
        type: "",
      });
    const [alertState, setAlertState] = useState(false);
    const handleOpen = (params) => {
        const data = {
          color: params.color,
          title: params.title,
          type: params.type,
        };
        setToastData(data);
        setAlertState(true);
    };
    useEffect(()=>{
      async function decodeToken(){
        const token = await localStorage.getItem("token");
        console.log("token11",token);
        if(token !== null){
          const user = await jwt(token); 
          const data = await profile({id:user.id});
          setFields(data.data.user);
          setImage(data.data.user.image);
          console.log("data",data)        
        }
       
      }
      decodeToken();
    },[])
    const onSubmit = async (payload) =>{
      fields["image"] = image;
      await setFields(fields);
      const result = await updateProfile(fields);
      console.log("data",result);
        handleOpen({
            color: "#009933",
            title: `Cập nhật thông tin cá nhân  ${MESSAGE_SUCCESS}`,
            type: "success",
        });
        setFields({})
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setAlertState(false);
    };
    const onChangeImage = async (e) =>{
      setLoading("false")
      const formData = new FormData();
      console.log("file", e.target.files[0])
      // Update the formData object
      formData.append(
        "image",
        e.target.files[0]
      );
      let url = "http://localhost:3000/admin/upload-image";
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if(response.status === 200){
          setImage(response.data.secure_url);
          setLoading("true")
        }
        console.log("res",response)
      } catch(error) {
        console.log(error)
      }
    }
    const handleSubmit = (e) => {
        console.log("E",fields)
        if (handleValidation()) {
            onSubmit(fields);
        } 
        return;
      };
    
      const handleValidation =()=> {
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["fullName"]) {
            formIsValid = false;
            errors["fullName"] = "Không thể để trống";
        }
        if (!fields["userName"]) {
            formIsValid = false;
            errors["userName"] = "Không thể để trống";
        }
        if (!fields["address"]) {
          formIsValid = false;
          errors["address"] = "Không thể để trống";
      }
      if (!fields["birthday"]) {
          formIsValid = false;
          errors["birthday"] = "Không thể để trống";
      }

        setErrors(errors);
        return formIsValid;
      }
    
      const  handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFields(fields);
        setErrors({ ...errors, [e.target.name]: "" });
      }
    return(
       <>
       <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
              <Toast
        toastData={toastData}
        open={alertState}
        handleClose={() => handleClose()}
      />
        <div className="container">
          <div className="row no-gutters slider-text align-items-end justify-content-start">
              <div className="col-md-12 text-center mb-5">              
                  <div className="form-group">
                      <label className="btn btn-primary btn-md btn-file">
                          Chọn ảnh<input type="file" name="image" onChange={(e)=>onChangeImage(e)} id="fileUpload" hidden />
                      </label>
                  </div>
                  <div style={{marginLeft: "0px",marginTop:"10px"}} id="divImage" >
                      <img id="avatar" height="150" width="150" style={{borderRadius: "100px"}}  src={image}/>
                      {loading !== "default" ?  (loading === "false" ?<p>Loading....</p> : <p style={{color:"green"}}>Upload ảnh thành công</p>):null}
                      
                  </div>
              </div>
          </div>
       </div>
       <label>Họ và tên:</label>
       <TextField
                key="fullName"           
                value={fields["fullName"]}
                error={!!errors["fullName"]}
                required={true}
                helperText={errors["fullName"]}
                name="fullName"
                type="text"
                
                onChange={(e) => handleChange(e)}
              />
                <span style={{marginRight: "50px"}}></span>
                <label>Tên người dùng:</label>
                <TextField
                key="userName"
                value={fields["userName"]}
                error={!!errors["userName"]}
                required={true}
                helperText={errors["userName"]}
                name="userName"
                disabled
                type="text"              
                onChange={(e) => handleChange(e)}
              />
               <span style={{marginRight: "50px"}}></span>
               <label>Địa chỉ:</label>
                <TextField
                key="address"
                value={fields["address"]}
                error={!!errors["address"]}
                required={true}
                helperText={errors["address"]}
                name="address"
                type="text"
                onChange={(e) => handleChange(e)}
              />
               <span style={{marginRight: "50px"}}></span>
               <label>Ngày sinh:</label>
              <TextField
                key="birthday"
                value={fields["birthday"]}
                error={!!errors["birthday"]}
                required={true}
                helperText={errors["birthday"]}
                name="birthday"
                type="date"
                onChange={(e) => handleChange(e)}
              />
               <Button color="primary" onClick={handleSubmit} variant="contained">
                Cập nhật
        </Button>
          </Stack>
        </form>
            
       </>
    )
}
export default ProfileInput;