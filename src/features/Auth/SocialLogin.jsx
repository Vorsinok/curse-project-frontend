import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SocialLogin() {
  const nav = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const token = p.get("token");
    if (token) {
      loginWithToken(token);
      nav("/");
    } else {
      nav("/login");
    }
  }, [loginWithToken, nav]);

  return <div className="p-6">Signing in...</div>;
}
