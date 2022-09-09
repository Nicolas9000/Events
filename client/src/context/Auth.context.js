import { useState, useEffect, createContext, useContext } from "react";

import axios from "axios";
import Cookies from "universal-cookie";

const BaliseAuth = createContext();
export const AuthContext = () => useContext(BaliseAuth);

export default function FunctionAuthContext(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [ProfilPicture, setProfilPicture] = useState("");
  const [Token, setToken] = useState("");
  const [Description, setDescription] = useState("")

  const fethUserData = async () => {
    const cookies = new Cookies();

    const getCookie = cookies.get("authentification");


    if (getCookie) {
      await axios
        .get(process.env.REACT_APP_SERVER_URL + "api/user", {
          headers: {
            Authorization: `Bearer ${getCookie}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setName(res.data.name);
          setProfilPicture(res.data.avatar);
          if(res.data.description){
            setDescription(res.data.description)
          }
        })
        .catch((err) => {

          console.log(err);

        });
    }
  };

  useEffect(() => {
    const cookie = new Cookies();
    const getCookie = cookie.get("authentification");
    if (getCookie) {
      // console.log(getCookie)
      setToken(getCookie);
    }
  }, []);

  useEffect(() => {
    fethUserData();
  }, [Token]);

  useEffect(() => {
    const cookies = new Cookies();
    if (Token) {
      cookies.set("authentification", Token, { path: "/" });
    }
  }, [Token]);


  const value = {
    Name,
    Email,
    ProfilPicture,
    Token,
    setName,
    setEmail,
    setProfilPicture,
    setToken,
    Description,
    setDescription
  };

  return (
    <BaliseAuth.Provider value={value}>{props.children}</BaliseAuth.Provider>
  );
}
