import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    try {
      const res = await Api.post("/sign-up", data);
      if (res?.status) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="grid"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gridTemplateColumns="min(450px , 100%)"
    >
      <Box
        maxWidth="500px"
        boxShadow={1}
        bgcolor="#f1edec"
        p="1rem"
        borderRadius="5px"
      >
        <Typography textAlign="center" color="#787676" variant="h5">
          SignUp
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box minHeight="75px">
            <Typography variant="body2">Enter your name</Typography>
            <TextField
              {...register("name")}
              error={Boolean(errors?.name?.message)}
            />
            <Typography variant="body2" color="error">
              {errors?.name?.message}
            </Typography>
          </Box>
          <Box minHeight="75px">
            <Typography variant="body2">Enter your password</Typography>
            <TextField
              {...register("password")}
              error={Boolean(errors?.password?.message)}
            />
            <Typography variant="body2" color="error">
              {errors?.password?.message}
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ display: "block", m: "10px auto 0 auto" }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
