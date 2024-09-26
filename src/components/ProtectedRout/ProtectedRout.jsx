import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("token") == null) {
    toast.error("You need to sign in first!");
    return <Navigate to="/SignIn" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
