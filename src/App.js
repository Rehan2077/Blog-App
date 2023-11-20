import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ArticlePage from './pages/articleDetails/ArticlePage'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/article' element={<ArticlePage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 