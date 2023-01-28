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
import { changePassword ,profile} from "../../utils/userUtils";
import jwt from 'jwt-decode'
import Toast from "../Toast/index.jsx";
import {MESSAGE_SUCCESS} from "../../constants/index.js";
function ProfileInput({ ...props }) {
    const [fields, setFields] = useState({})
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
          setUser(data);
          console.log("data",data)        
        }
       
      }
      decodeToken();
    },[])
    const onSubmit = async (payload) =>{
        const token = await localStorage.getItem("token");
        console.log("token11",token);
        if(token !== null){
          const user = await jwt(token); 
          console.log("user",user.id)
          const data = {
            ProfileId: user.id,
            password:payload.passwordNew
        }
        const result = await Profile(data);
        handleOpen({
            color: "#009933",
            title: `Đổi mật khẩu ${MESSAGE_SUCCESS}`,
            type: "success",
        });
        setFields({})
        }
       
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setAlertState(false);
    };
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
                          Chọn ảnh<input type="file" name="file" id="fileUpload" hidden />
                      </label>
                  </div>
                  <div style={{marginLeft: "0px",marginTop:"10px"}} id="divImage" >
                      <img id="avatar" height="150" width="150" style={{borderRadius: "100px"}}  src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"/>
                  </div>
              </div>
          </div>
       </div>
       <TextField
                key="fullName"
                label="Họ và tên"
                value={fields["fullName"]}
                error={!!errors["fullName"]}
                required={true}
                helperText={errors["fullName"]}
                name="fullName"
                type="text"
                
                onChange={(e) => handleChange(e)}
              />
                <span style={{marginRight: "50px"}}></span>
                <TextField
                key="userName"
                label="Tên người dùng"
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
                <TextField
                key="address"
                label="Địa chỉ"
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