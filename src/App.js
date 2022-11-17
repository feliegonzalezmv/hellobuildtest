import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./components";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div className="bg-slate-300 text-black h-screen flex text-white">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
