import { Box, Button, Dialog, Typography } from "@mui/material";
import Api from "../api";
import { toast } from "react-hot-toast";

const DeleteTask = ({ open, onClose, mutate }) => {
  const submit = async () => {
    try {
      const res = await Api.delete("/task", { params: { _id: open } });
      if (res?.status) {
        toast(res?.message);
        mutate();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={Boolean(open)} onClose={onClose}>
      <Typography textAlign="center" variant="h5" pb="1rem">
        Are you sure?
      </Typography>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" pt="1rem">
        <Button variant="contained" onClick={submit}>
          Delete
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancle
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteTask;
