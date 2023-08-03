import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDom from 'react-dom'
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
ReactDom.render(
  <HashRouter>
  <App/>
  </HashRouter>,
  document.getElementById('root')
)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//   <h1>Hello World</h1>
//   <h2>I'm Shreyash Shinde</h2>
//   </>
//   // <React.StrictMode>
//   //   <App />
    
//   // </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
