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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/v1/users/profile")
      .then((res) => dispatch(setUserInfo(res.data.user)))
      .catch((err) => console.log(err.message))
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
          <Route path="/updateprofile" element={<UpdateProfile/>} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
