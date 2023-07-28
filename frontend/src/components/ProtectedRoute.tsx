import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component}: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken"); 
    const id = localStorage.getItem("userId");
    if (!token || !id) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;
