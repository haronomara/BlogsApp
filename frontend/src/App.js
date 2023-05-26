import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";



function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <div>
      <React.Fragment>
        <header>
          <Header/>
        </header>
        <main>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myblogs" element={<UserBlogs />} />
            <Route path="/myblogs:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            
          </Routes>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
