import {
  Alert,
  Stack
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React from "react";

function Toast({...props}) {

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);
  };
  console.log("toast",props.open)
    return (
       <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}  open={props.open} autoHideDuration={3000}  onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%',color:props.color}}>
              {props.title}
            </Alert>
          </Snackbar>
    </Stack>
    );
}

export default Toast;