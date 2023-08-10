import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogDetail() {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate()
  const { id } = useParams();
  const fetchApi = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  const [input, setinput] = useState({});

  const handleChange = (e) => {
    setinput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputStyle = { fontSize: "1.2rem", color: "black", fontWeight: "bold" };

  useEffect(() => {
    fetchApi().then((data) => {
      setBlogs(data.user);
      setinput({
        title: data.user.title,
        description : data.user.description
      });
    });
  }, [id]);
  console.log(blogs);

  const editBlog = async() => {
    const res = await axios.patch(`http://localhost:5000/api/blogs/update/${id}`, {
      title : input.title,
      description : input.description
    })
    .catch(err => console.log(err))
  }

  const handleClick = (e) => {
    e.preventDefault();
    editBlog()
    navigate('/blogs')
  };
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
        
        <Button
          type="submit"
          onClick={handleClick}
          sx={{ borderRadius: 5 }}
          variant="contained"
        >
          Add Blog
        </Button>
      </Box>
    </div>
  );
}
