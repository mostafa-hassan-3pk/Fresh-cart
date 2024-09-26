import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const GoBackRout = ({ children }) => {
  if (localStorage.getItem("token")) {
    toast.success("You are already logged in!");
    return <Navigate to="/Home" />;
  }
  return <>{children}</>;
};

export default GoBackRout;
