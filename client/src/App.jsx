import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth components/Login";
import Register from "./components/auth components/Register";
import Home from "./components/views components/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/views components/Navbar";
function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
