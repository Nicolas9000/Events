import { useEffect, useState } from "react";

import "./UserProfile.css";
import axios from "axios";

import { AuthContext } from "../../context/Auth.context";
import { Link } from "react-router-dom";

import NoImage from "../../assets/NoImage.png";

export default function UserProfile() {
  const { Token, Name, ProfilPicture, Description, setDescription } =
    AuthContext();

  const [Event, setEvent] = useState("");

  const fetchUserEvent = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "api/event/user/event", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.length !== 0) {
          setEvent(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Token) {
      fetchUserEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token]);

  const UpdateUser = (e) => {
    e.preventDefault();

    console.log(Description);
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + "api/user/description",
        {
          description: Description,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="bodyUser">
      <div className="profilUser">
        <div>
          <img src={ProfilPicture} referrerPolicy="no-referrer" alt="avatar" />
        </div>
        <div>
          <p>{Name}</p>
          <form onSubmit={UpdateUser}>
            <div>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={Description ? Description : ""}
                placeholder={
                  Description
                    ? "Modifier votre description"
                    : "Ajoutez une description"
                }
              />
            </div>
            <div>
              {Description ? (
                <button>Modifier votre description</button>
              ) : (
                <button>Ajouter une description</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {Event ? (
        <div>
          <h1>Liste des sorties</h1>

          {Event.map((event, key) => {
            return (
              <div key={key} className="eventUserListe">
                {event.photo ? (
                  <img
                    src={event.photo}
                    alt={event.event}
                    className="imageUserEvent"
                  />
                ) : (
                  <img src={NoImage} alt="noImage" className="imageUserEvent" />
                )}
                <p>{event.event}</p>
                <Link to={"/eventSortie/" + event._id}>En savoir +</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="eventUser">
          <h1>Aucune sortie enregistré</h1>
        </div>
      )}
    </div>
  );
}
