import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutUs from "./pages/aboutus/AboutUs";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminComments from "./pages/admin/components/AdminComments";
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import AdminPosts from "./pages/admin/components/AdminPosts";
import CreatePost from "./pages/admin/components/CreatePost";
import EditPost from "./pages/admin/components/EditPost";
import Article from "./pages/article/Article";
import ArticlePage from "./pages/articleDetails/ArticlePage";
import ContactUs from "./pages/contactus/ContactUs";
import FAQ from "./pages/faq/FAQ";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import Register from "./pages/register/Register";
import { setUserInfo } from "./store/reducers/user";

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
          dispatch(setUserInfo(res.data.user));
        });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
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
