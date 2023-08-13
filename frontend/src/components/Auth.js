import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Auth() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [isTypingPassword, setTypingPassword] = useState(false);
  const [passwordVisible, setIsVisible] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [isInputEmpty, setInputEmpty] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeRequest = () => {
    setIsSignup(!isSignup);
    setInputEmpty(false);
    setTypingPassword(false);
    setIsVisible(false);
    setInvalidEmail("");
    setInvalidPassword("");
  };

  const signup = async (type) => {
    setInvalidEmail("");
    setInvalidPassword("");
    if (!type) {
      if (!value.email || !value.password) {
        setInputEmpty(true);
      }
    }
    if (type) {
      if (!value.name || !value.email || !value.password) {
        setInputEmpty(true);
      }
    }
    try {
      const res = await axios.post(`http://localhost:5000/${type || `login`}`, {
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (!type) {
        const id = res.data.user._id;
        localStorage.setItem("user_id", id);
      }
      if (res.status === 200 || res.statusText === "OK") {
        dispatch(login());
        navigate("/blogs");
      }
      if (res.status === 201 || res.statusText === "Created") {
        setIsSignup(!isSignup);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        console.log("email error");
        setInvalidEmail(error.response.data.message);
      }
      if (error.response.status === 400) {
        console.log("password error");
        setInvalidPassword(error.response.data.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(!isSignup ? "" : "signup");
  };
  return (
    <div>
      <form>
        <Box
          width="30%"
          display="flex"
          gap="1rem"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={3}
        >
          <Typography variant="h4">{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && (
            <TextField
              placeholder="Name"
              value={value.name}
              name="name"
              onChange={handleInput}
            />
          )}
          <TextField
            type={"email"}
            placeholder="Email"
            value={value.email}
            name="email"
            onChange={handleInput}
          />
          <Box sx={{ position: "relative" }}>
            <TextField
              type={!passwordVisible ? "password" : "Name"}
              placeholder="Password"
              value={value.password}
              name="password"
              onChange={handleInput}
              onClick={() => {
                setTypingPassword(true);
              }}
            />
            <Box sx={{ position: "absolute", right: "0", top: "15%" }}>
              {passwordVisible && (
                <IconButton
                  onClick={() => {
                    setIsVisible(!passwordVisible);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              )}
              {!passwordVisible && (
                <IconButton
                  onClick={() => {
                    setIsVisible(!passwordVisible);
                  }}
                >
                  <VisibilityOffIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box>
            {isInputEmpty && <Typography>All fields are required</Typography>}
          </Box>
          {!isSignup && (
            <Box sx={{ color: "red" }}>
              {invalidEmail && <Typography>{invalidEmail}</Typography>}
              {invalidPassword && <Typography>{invalidPassword}</Typography>}
            </Box>
          )}
          {isTypingPassword && (
            <Box>
              <nav>
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    textAlign: "center",
                    margin: ".5em",
                  }}
                >
                  password must be
                </Typography>
                <ul>
                  <li>
                    <Typography sx={{ fontSize: ".8rem" }}>
                      min 8 char long{" "}
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ fontSize: ".8rem" }}>
                      At least one uppercase
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ fontSize: ".8rem" }}>
                      At least one lower case
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ fontSize: ".8rem" }}>
                      At least one special character
                    </Typography>
                  </li>
                </ul>
              </nav>
            </Box>
          )}
          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            color="warning"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button sx={{ borderRadius: 3 }} onClick={changeRequest}>
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
