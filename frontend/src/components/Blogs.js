import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Blog from './Blog'

export default function Blogs() {
  const [data , setData] = useState()
  const fetchApi = async() => {
    const res = await axios.get('http://localhost:5000/api/blogs')
    setData(res.data.blogs)
   
  }
  useEffect(()=>{
    fetchApi()
  },[])
  return (
    <div>
<Blog/>
    </div>
  )
}
