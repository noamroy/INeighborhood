//IMPORTS
import React, { useState } from "react";
//CSS
import "./Header.scss";


export default function Header() {
  const [name, setName] = useState(localStorage.getItem('name'));


  return (
        <header>
            <a href="#" id="logo"></a>
            <span id="pageName"></span>
            <span id="operatorname">{name}</span>
        </header>
  );
}