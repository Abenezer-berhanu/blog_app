import React, { useState } from "react";
import {useDispatch } from 'react-redux'
import {login } from '../store'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Auth() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleInput = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const signup = async(type) => {
    try {
      const res = await axios.post(`http://localhost:5000/${type || `login`}`, {
        name : value.name,
        email : value.email,
        password : value.password
      })
      if(!type) {
        const id = res.data.user._id
        localStorage.setItem("user_id", id)
      }
      if(res.status === 200 || res.statusText === "OK"){
        dispatch(login())
        navigate('/blogs')
      }
      if(res.status === 201 || res.statusText === "Created"){
        setIsSignup(!isSignup)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(!isSignup ? '' : 'signup')
  }
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
          {isSignup && <TextField placeholder="Name" value={value.name} name="name" onChange={handleInput}/>}
          <TextField type={"email"} placeholder="Email" value={value.email} name="email" onChange={handleInput}/>
          <TextField type={"password"} placeholder="Password" value={value.password} name="password" onChange={handleInput}/>
          {!isSignup && <Typography variant="p">please login</Typography>}
          <Button variant="contained" sx={{ borderRadius: 3 }} color="warning" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3 }}
            onClick={() => {
              setIsSignup(!isSignup);
            }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
