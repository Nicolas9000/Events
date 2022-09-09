import React from "react";
import { AuthContext } from "../../context/Auth.context";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../components/Auth/Firebase";
import Cookies from "universal-cookie";
import axios from "axios";

import logo from "../../assets/logo.png";
import ProfilSvg from "../../assets/profile-user.svg";
import LogoutSvg from "../../assets/logout.svg";
import "./Header.css";

export default function Header() {
  const { Token, setToken } = AuthContext();

  const cookies = new Cookies();
  const navigate = useNavigate();

  const signOutWithGoogle = () => {
    signOut(auth)
      .then(() => {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "api/user/logout", {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            console.log(res)

            cookies.remove("authentification");
            setToken("");
            navigate("/auth");
          });
        console.log("sign out success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="header-right">
        <Link to="/user">
          <img
            className="svg"
            src={ProfilSvg}
            referrerPolicy="no-referrer"
            alt="avatar"
          />
        </Link>

        <img
          className="svg"
          src={LogoutSvg}
          onClick={signOutWithGoogle}
          alt="deconnexion"
        />
      </div>
    </div>
  );
}
