import React, { useState } from "react";

function GoogleMap() {
    const [location, setLocation] = useState("shenkar%20college");
    const [url, setUrl] = useState(`https://maps.google.com/maps?q=${location}&t=&z=17&ie=UTF8&iwloc=&output=embed`);

    return (
        <section className="map">
            <div className="responsive-map mapdiv">
                <iframe id="map" src={{location}} frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </div>
        </section>
    );
}

export default GoogleMap;
