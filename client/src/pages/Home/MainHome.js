import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Header from "../../components/Header/Header";
import { AuthContext } from "../../context/Auth.context";

export default function MainHome() {
  const { Token } = AuthContext();

  const navigate = useNavigate();

  const cookies = new Cookies();
  const getCookie = cookies.get("authentification");
  useEffect(() => {

    if (!getCookie) {
      navigate("/auth");
    }

  }, [Token, getCookie, navigate]);



  return (
    <>
      <Header />
      
      <Outlet />
    </>
  );
}
