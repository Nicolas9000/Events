import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoImage from "../../assets/NoImage.png";
import { AuthContext } from "../../context/Auth.context";

import "./EventDetail.css";

export default function EventDetail() {
  const params = useParams();

  const { Token } = AuthContext();

  const [EventDetail, setEventDetail] = useState("");

  const [Event, setEvent] = useState("");
  const [Coordonne, setCoordonne] = useState("")
  const [Photo, setPhoto] = useState("")

  const fetchEventDetail = async () => {
    axios
      .get(
        "https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records/" +
          params.record_id
      )
      .then((res) => {
        console.log(res.data.record.fields);
        setEventDetail(res.data.record.fields);
        setEvent(res.data.record.fields.title);
        setCoordonne(res.data.record.fields.latlon)
        setPhoto(res.data.record.fields.image)

      });
  };

  console.log(Photo)

  useEffect(() => {
    fetchEventDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.record_id]);

  const organisationSortie = async () => {
    await axios
      .post(
        process.env.REACT_APP_SERVER_URL + "api/event",
        { event: Event, coordonne: Coordonne, photo: Photo },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {EventDetail ? (
        <div className="bodyDetail">
          <h1>{EventDetail.title}</h1>
          <div className="topDetail">
            <div>
              {EventDetail.image ? (
                <img
                  className="imageEvent"
                  src={EventDetail.image}
                  alt={EventDetail.title}
                />
              ) : (
                <img className="imageEvent" src={NoImage} alt="no_image" />
              )}
            </div>

            <div>
              <p>{EventDetail.date_start + " / " + EventDetail.date_end}</p>
              <p>Adresse : {EventDetail.address} </p>
              <p>Ville : {EventDetail.city}</p>
              <p>Département : {EventDetail.department}</p>
              <button onClick={organisationSortie}>Organiser une sortie</button>
            </div>
          </div>
          <div className="bot">
            <h1>Description event</h1>
            {EventDetail.free_text ? (
              <p>{EventDetail.free_text}</p>
            ) : (
              <p>{EventDetail.description}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
