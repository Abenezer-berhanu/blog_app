import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
/////////////////////////////////////////////////////////////
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserBlogs() {
  const userId = localStorage.getItem("user_id");
  const [datas, setDatas] = useState();
 
  const navigator = useNavigate()
  const fetchApi = async () => {
    const res = await axios(
      `http://localhost:5000/api/blogs/user/${userId}`
    ).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
 
  useEffect(() => {
    fetchApi().then((data) => setDatas(data.blogs.blogs));
  }, []);
  
  return (
    <div>
      {datas &&
        datas.map((data) => <Blog data={data} auth={true} myKey={data._id} />)}
      {!datas ||
        (datas.length < 1 && (
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography component="div" variant="h5">
                  You didn't post any blog Yet
                </Typography>
                <Button variant="contained" sx={{ marginTop: "1rem" }}
                onClick={()=>{navigator('/myBlogs/add')}}
                >
                  Add Blog
                </Button>
              </CardContent>
            </Box>
          </Card>
        ))}
    </div>
  );
}
