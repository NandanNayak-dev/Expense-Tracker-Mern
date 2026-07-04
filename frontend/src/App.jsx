import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div>
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("User")) {
    return props.children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export default App;
