import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticlePage from "./pages/articleDetails/ArticlePage";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/reducers/user";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import Article from "./pages/article/Article";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import AdminComments from "./pages/admin/components/AdminComments";
import AdminPosts from "./pages/admin/components/AdminPosts";
import EditPost from "./pages/admin/components/EditPost";
import CreatePost from "./pages/admin/components/CreatePost";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("userInfo").replace(/['"]+/g, "");
      if (!token) return;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setUserInfo(res.data.user))
        })
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/article" element={<Article />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="comments" element={<AdminComments />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="posts/edit/:slug" element={<EditPost />} />
            <Route path="posts/create" element={<CreatePost />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
