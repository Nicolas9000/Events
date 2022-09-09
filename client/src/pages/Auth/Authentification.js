import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../components/Auth/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../context/Auth.context";
import Cookies from "universal-cookie";

import axios from "axios";

export default function Authentification() {
  const { Token, setToken, setProfilPicture } = AuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const getCookie = cookies.get("authentification");
    if (getCookie) {
      navigate("/");
    }
  }, [Token, navigate]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        setProfilPicture(res.user.photoURL);
        const data = {
          name: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
          token: res.user.stsTokenManager.refreshToken,
        };

        axios
          .post(process.env.REACT_APP_SERVER_URL + "api/user", data)
          .then((res) => {
            // console.log(res);
            setToken(res.data.token);
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}
