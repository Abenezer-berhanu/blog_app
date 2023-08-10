import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function AddBlogs() {
  const [input, setinput] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setinput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async(e) => {
    e.preventDefault();
    
    const res = await axios.post('http://localhost:5000/api/blogs/add', {
      title : input.title,
      description : input.description,
      image : input.imageURL,
      user : localStorage.getItem('user_id')
    }).catch(err => console.log(err))
    const data = await res.data
  };

  

  const inputStyle = { fontSize: "1.2rem", color: "black", fontWeight: "bold" };
  return (
    <div>
      <Box
        border={3}
        borderColor="green"
        borderRadius={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        display="flex"
        flexDirection="column"
        gap="1em"
        width="60%"
      >
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          POST Your Blogs
        </Typography>
        <InputLabel>Title</InputLabel>
        <TextField
          name="title"
          value={input.title}
          onChange={handleChange}
          sx={inputStyle}
        />
        <InputLabel>description</InputLabel>
        <TextField
          name="description"
          value={input.description}
          onChange={handleChange}
          sx={inputStyle}
        />
        <InputLabel>ImageURL</InputLabel>
        <TextField
          name="imageURL"
          value={input.imageURL}
          onChange={handleChange}
          sx={inputStyle}
        />
        <Button type="submit" onClick={handleClick} sx={{borderRadius : 5}} variant="contained" >
          Add Blog
        </Button>
      </Box>
    </div>
  );
}
