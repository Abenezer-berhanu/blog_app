import {Routes , Route} from 'react-router-dom'
import Header from "./components/Header";
import Blogs from './components/Blogs';
import Auth from './components/Auth';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlogs from './components/AddBlogs';



function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/myBlogs' element={<UserBlogs/>}/>
        <Route path='/myBlogs/:id' element={<BlogDetail/>}/>
        <Route path='/myBlogs/add' element={<AddBlogs/>}/>
      </Routes>
    </div>
  );
}

export default App;
