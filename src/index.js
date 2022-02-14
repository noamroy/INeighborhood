import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { BrowserRouter } from 'react-router-dom'; MISHA
//import ReactRouter from './Router/Router';
import reportWebVitals from './reportWebVitals';
//import LoginForm from './components/LoginForm/LoginForm'; MISHA
import App from './components/App/App';

ReactDOM.render(
    /*<BrowserRouter>
      <LoginPage />
    </BrowserRouter>,*/ //MISHA
    <StrictMode>
      <App />
    </StrictMode>,  //NOAM
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
