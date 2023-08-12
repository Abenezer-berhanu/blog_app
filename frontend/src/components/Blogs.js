import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [datas, setDatas] = useState();
  const navigator = useNavigate()
  const fetchApi = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blogs")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchApi().then((data) => setDatas(data.blogs));
  }, []);
  return <div>
    {datas && datas.map((data) => <Blog data={data} myKey={data._id}/>)}
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
                  No Blog Has Found
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
    </div>;
}
