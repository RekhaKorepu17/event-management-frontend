import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

type FormData = {
  username: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit: registerUser,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {
    console.log("hello");
    try {
      const response = await axios.post("http://localhost:3001/users", data);
      console.log("Account created", response.status);
      if (response.status === 201) {
        window.alert("Account created succesfully");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        window.alert("Email already exists");
      }
      console.error("Error while creating account");
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: "2rem",
        maxWidth: "380px",
        margin: "6rem auto",
        borderRadius: 5,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlignLast: "center", fontFamily: "serif", paddingBottom: 2 }}
      >
        Register
      </Typography>
      <form onSubmit={registerUser(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              label="Username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Mobile Number"
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message:
                  "Invalid mobile number (must be 10 digits starting with 6-9)",
              },
            })}
            fullWidth
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
          <Box>
            <RadioGroup row defaultValue="User">
              <FormControlLabel
                value="Admin"
                control={<Radio />}
                label="Admin"
                {...register("role", { required: "Role is required" })}
              />
              <FormControlLabel
                value="User"
                control={<Radio />}
                label="User"
                {...register("role")}
              />
            </RadioGroup>
            {errors.role && (
              <Typography color="error" variant="body2">
                {errors.role.message}
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
      <p>
        Already have an account?
        <Button color="secondary" onClick={() => navigate("/")}>
          Login here
        </Button>
      </p>
    </Paper>
  );
};

export default RegisterForm;
