import { Outlet, Route,  Routes } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

const PrivateRoute = ({ value }) => {
  const { user } = useAuthContext();
  if (!value) {
    if (!user)
      return (
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      );
    else
      return (
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      );
  }
  else {
    if (!user) 
        return <Outlet />;
    return (
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    );
  }
};

export default PrivateRoute;
