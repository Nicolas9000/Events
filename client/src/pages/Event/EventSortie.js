import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import GoogleMap from "../../components/GoogleMap/GoogleMap";

export default function EventSortie() {
  const [Coordonne, setCoordonne] = useState("");

  const params = useParams();

  const fecthSortieEvent = async () => {
    console.log(process.env.REACT_APP_SERVER_URL + "api/event/"  + params.id)
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "api/event/" + params.id)
      .then((res) => {
        // console.log(res.data.data);
        setCoordonne(res.data.data.coordonne);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fecthSortieEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return <div>{Coordonne ? <GoogleMap coordonne={Coordonne} /> : null}</div>;
}
