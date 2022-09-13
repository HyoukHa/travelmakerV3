import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ errormassage }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => {
        setOpen(true);
      }}>
        <Alert onClose={() => {
          setOpen(true);
        }} severity="success" sx={{ width: "100%" }}>
          {errormassage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
