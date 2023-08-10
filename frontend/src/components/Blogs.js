import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

export default function Blogs() {
  const [datas, setDatas] = useState();
  const fetchApi = async () => {
    
      const res = await axios.get("http://localhost:5000/api/blogs")
      .catch((err)=>console.log(err))
      const data = await res.data
      return data
  };
  useEffect(() => {
    fetchApi().then(data => setDatas(data.blogs));
  }, []);
  return (
    <div>
      {datas && datas.map(data => <Blog data={data}/>)}
    </div>
  );
}
