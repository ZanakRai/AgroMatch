import React from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./pages/Login.jsx";
import Content from "./pages/Content.jsx";
import Signup from "./pages/Signup.jsx"
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Logout from "./pages/Logout.jsx";
import ProtectedRouter from "./Router/ProtectedRouter.jsx";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
          } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} />
        <Route path="/content" element={<Content />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
