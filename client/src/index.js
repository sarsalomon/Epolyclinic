import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserPolyclinic from './polyclinic/UserPolyclinic';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserPolyclinic()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

