import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../api";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/reducer";
import { Link as RouterLink } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
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
      const res = await Api.post("/sign-in", data);
      if (res?.status) {
        dispatch(login(res));
        navigate("/");
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
          SignIn
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
            Log in
          </Button>
        </form>
        <Link component={RouterLink} to="/sign-up">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;
