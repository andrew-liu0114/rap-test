import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import { ILoginResult } from "./types";

import "./App.scss";

const RequireAuth = ({ children }: any) => {
  const data: string | null = localStorage.getItem("info");
  const userInfo: ILoginResult = data && JSON.parse(data);
  return userInfo && userInfo["user_token"] ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  const Redirct = ({ to }: { to: string }) => {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    }, []);
    return null;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route element={<Home />} />
        <Route path="/404" element={<NoMatch />} />
        <Route path="*" element={<Redirct to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
