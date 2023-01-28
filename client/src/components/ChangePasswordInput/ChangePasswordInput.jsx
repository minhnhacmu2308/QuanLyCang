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
import { changePassword } from "../../utils/userUtils";
import jwt from 'jwt-decode'
import Toast from "../Toast/index.jsx";
import {MESSAGE_SUCCESS} from "../../constants/index.js";
function ChangePasswordInput({ ...props }) {
    const [fields, setFields] = useState({})
    const [errors, setErrors] = useState({})
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
    
    const onSubmit = async (payload) =>{
        const token = await localStorage.getItem("token");
        console.log("token11",token);
        if(token !== null){
          const user = await jwt(token); 
          console.log("user",user.id)
          const data = {
            changePasswordId: user.id,
            password:payload.passwordNew
        }
        const result = await changePassword(data);
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
        console.log(fields["rePasswordNew"] + fields["passwordNew"])
        //Name
        if (!fields["passwordNew"]) {
            formIsValid = false;
            errors["passwordNew"] = "Không thể để trống";
        }
        if (!fields["rePasswordNew"]) {
            formIsValid = false;
            errors["rePasswordNew"] = "Không thể để trống";
        }

        if (fields["rePasswordNew"] !== fields["passwordNew"]) {
            formIsValid = false;
            errors["rePasswordNew"] = "Hai mật khẩu không trùng khớp";
            errors["passwordNew"] = "Hai mật khẩu không trùng khớp";
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
              width: "80%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
              <Toast
        toastData={toastData}
        open={alertState}
        handleClose={() => handleClose()}
      />
            <TextField
                key="passwordNew"
                label="Mật khẩu mới"
                value={fields["passwordNew"]}
                error={!!errors["passwordNew"]}
                required={true}
                helperText={errors["passwordNew"]}
                name="passwordNew"
                type="password"
                
                onChange={(e) => handleChange(e)}
              />
                <span style={{marginRight: "50px"}}></span>
                <TextField
                key="rePasswordNew"
                label="Nhập lại mật khẩu"
                value={fields["rePasswordNew"]}
                error={!!errors["rePasswordNew"]}
                required={true}
                helperText={errors["rePasswordNew"]}
                name="rePasswordNew"
                type="password"
                onChange={(e) => handleChange(e)}
              />
               <Button color="primary" onClick={handleSubmit} variant="contained">
                Xác nhận
        </Button>
          </Stack>
        </form>
            
       </>
    )
}
export default ChangePasswordInput;