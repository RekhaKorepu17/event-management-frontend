import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalContext/globalContext";

const LoginForm = () => {
  const{setUser} = useGlobalState()
  const {
    register,
    handleSubmit: userLogin,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user`, data
      );
      if (response.status === 200) {
        setUser(response.data.user);
        navigate('/dashboard');
        window.alert("Logged in");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("email", {
          type: "manual",
          message: "Email is not registered",
        });
      } else if (error.response && error.response.status === 401) {
        setError("password", { type: "manual", message: "Incorrect password" });
      } else {
        console.error("Error while logging in", error);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "5rem auto",
        fontFamily: "serif",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "serif", textAlign: "center" }}
      >
        Login
      </Typography>
      <form onSubmit={userLogin(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? (errors.email.message as string) : ""}
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            fullWidth
            error={!!errors.password}
            helperText={
              errors.password ? (errors.password.message as string) : ""
            }
          />
          <Button type="submit" variant="contained" fullWidth   sx={{backgroundColor: "rgba(31, 108, 123, 0.879)" }}>
            Login
          </Button>
        </Box>

        <p style={{ textAlign: "center", fontSize: 16 }}>
          Don't have an account?{" "}
          <button
            style={{
              background: "white",
              color: "rgba(31, 108, 123, 0.879)",
              border: 0,
              fontSize: 16,
            }}
            onClick={() => navigate("/register")}
          >
            Register here
          </button>
        </p>
      </form>
    </Paper>
  );
};

export default LoginForm;
