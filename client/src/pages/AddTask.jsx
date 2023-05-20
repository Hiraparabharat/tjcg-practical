import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../api";
import { toast } from "react-hot-toast";

const AddTask = ({ open, onClose, mutate }) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: typeof open === "boolean" ? {} : open,
  });

  const submit = async (data) => {
    try {
      const res =
        typeof open === "boolean"
          ? await Api.post("/task", data)
          : await Api.put("/task", data);
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
        {typeof open === "boolean" ? "Add" : "Edit"} Task
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Box minHeight="75px">
          <Typography>Enter title</Typography>
          <TextField
            {...register("title")}
            error={Boolean(errors?.title?.message)}
          />
          <Typography variant="body2" color="error">
            {errors?.title?.message}
          </Typography>
        </Box>
        <Box minHeight="75px">
          <Typography>Enter Description</Typography>
          <TextField
            {...register("description")}
            error={Boolean(errors?.description?.message)}
          />
          <Typography variant="body2" color="error">
            {errors?.description?.message}
          </Typography>
        </Box>
        {typeof open === "object" && (
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioGroup onChange={onChange} onBlur={onBlur} value={value}>
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="completed"
                  control={<Radio />}
                  label="Completed"
                />
              </RadioGroup>
            )}
          />
        )}
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Dialog>
  );
};

export default AddTask;
