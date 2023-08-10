import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Blog({ data, auth }) {
  const date = data.createdAt.split("T")[0];
  const [isUser, setIsUser] = useState(auth);
  const id = localStorage.getItem("user_id");
  const blog_id = data._id;

  const navigate = useNavigate();

  const authorization = () => {
    if (data.user._id === id) {
      setIsUser(true);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  const handleEdit = async () => {
    navigate(`/myBlogs/${blog_id}`);
  };

  const handleDelete = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blogs/${blog_id}`)
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <Card
      key={data._id}
      sx={{
        width: "40%",
        margin: "1em auto",
        padding: "10px",
        boxShadow: "0px 0px 10px #ccc",
        ":hover": {
          boxShadow: "0px 0px 20px #ccc",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.user.name}
          </Avatar>
        }
        title={data.user.name}
        subheader={date}
      />
      {isUser && (
        <Box sx={{ width: "fit-content", marginLeft: "auto" }}>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardMedia
        component="img"
        height="194"
        image={data.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
