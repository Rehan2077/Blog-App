import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticlePage from "./pages/articleDetails/ArticlePage";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
