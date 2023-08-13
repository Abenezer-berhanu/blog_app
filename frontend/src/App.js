import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Auth from "./components/Auth";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlogs from "./components/AddBlogs";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { login } from "./store";
import { useDispatch } from "react-redux";

function App() {
  const path = useLocation()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      dispatch(login());
    }
    console.log(path.pathname)
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Routes>
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {isLoggedIn && (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/myBlogs/add" element={<AddBlogs />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
