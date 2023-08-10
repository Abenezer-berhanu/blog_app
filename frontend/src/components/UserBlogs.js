 import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog';
 
 export default function UserBlogs() {
  const userId = localStorage.getItem('user_id')
  const [datas, setDatas] = useState();
  const fetchApi = async () => {
      const res = await axios(`http://localhost:5000/api/blogs/user/${userId}`)
      .catch((err)=>console.log(err))
      const data = await res.data
      return data
  };
  useEffect(() => {
    fetchApi().then(data => setDatas(data.blogs.blogs))
  }, []);
    return (
      <div>
      {datas && datas.map(data => <Blog data={data} auth={true}/>)}
     </div>
   )
 }
 