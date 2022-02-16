//IMPORTS
import React, { useState } from "react";
//CSS
import "./Header.scss";
//FUNCTION
export default function Header(props) {
  const [name, setName] = useState(localStorage.getItem('name'));
  return (
    <header className="headerClass">
      <a href="#" id="logo"></a>
      <span id="pageName">{props.pageName}</span>
      <span id="operatorname">{name}</span>
    </header>
  );
}