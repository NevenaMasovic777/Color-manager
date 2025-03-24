import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CreateColor from "./pages/CreateColor/CreateColor";
import Homepage from "./pages/Homepage/Homepage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateColor />} />
      </Routes>
      <ToastContainer theme="colored" position="bottom-left" autoClose={3000} />
    </div>
  );
}

export default App;
