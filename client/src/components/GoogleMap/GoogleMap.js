import React, { useState } from "react";
import './GoogleMap.scss';

function GoogleMap(props) {

    return (
        <iframe id="map" classnName="iframe-map" src={`https://maps.google.com/maps?q=${props.location}&t=&z=17&ie=UTF8&iwloc=&output=embed`} frameBorder="0" allowFullScreen></iframe>
    );
}

export default GoogleMap;
