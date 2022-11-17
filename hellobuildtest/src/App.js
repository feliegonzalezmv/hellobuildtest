import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./components";
export default function App() {
  return (
    <div className="bg-slate-300 text-black h-screen flex text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}
