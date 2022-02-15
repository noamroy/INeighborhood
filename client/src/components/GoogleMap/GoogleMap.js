import React, { useState } from "react";
import './GoogleMap.scss';

function GoogleMap(props) {
    const [location, setLocation] = useState("shenkar%20college");
    const [url, setUrl] = useState(`https://maps.google.com/maps?q=shenkar%20college&t=&z=17&ie=UTF8&iwloc=&output=embed`);

    React.useEffect(() => {
        console.log(props.location)
        setLocation(props.location);
        setUrl(`https://maps.google.com/maps?q=${location}&t=&z=17&ie=UTF8&iwloc=&output=embed`)
    }, []);

    return (
        <section className="map">
            <div className="responsive-map mapdiv">
                <iframe id="map" classnName="iframe-map" src={url} frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </div>
        </section>
    );
}

export default GoogleMap;
