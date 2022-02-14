import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ReactRouter from './Router/Router';
import reportWebVitals from './reportWebVitals';
import LoginPage from './components/LoginPage/LoginPage';
import LoginForm from './components/LoginForm/LoginForm'

ReactDOM.render(
    <BrowserRouter>
      <ReactRouter />
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();