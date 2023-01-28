import { Alert, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

function Toast({ ...props }) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.toastData.type}
          sx={{ width: "100%", color: props.toastData.color }}
        >
          {props.toastData.title}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Toast;
