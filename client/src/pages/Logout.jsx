import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth";

export const Logout = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();
  useEffect(() => {
    logOutUser();
  }, [logOutUser]);

  return navigate("/");
};
