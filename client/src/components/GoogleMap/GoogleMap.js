import React, { useEffect, useState } from "react";
import "./GoogleMap.css"

function GoogleMap({coordonne}) {
  const [Source, setSource] = useState("");

  useEffect(() => {
    const lon = coordonne[0];
    const lat = coordonne[1];

    setSource(
      `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    );
  }, [coordonne]);

  return (
    <div className="mapGoogle">
      <iframe
        src={Source}     
        className="borderMapGoogle"   
        title="map"
      ></iframe>
    </div>
  );
}
export default GoogleMap;
