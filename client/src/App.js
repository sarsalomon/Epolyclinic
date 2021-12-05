import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const App = observer( ()=>{ 
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    check().then(data => {
        user.setUserInfo(data.id)
        user.setUserRole(data.role)
        user.setUserFish(data.fish)
        user.setUser(true)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading){
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      {user.isAuth?
        <NavBar/>
      :
        <div/>
      }
      <AppRouter/>
      {user.isAuth?
        <Footer/>
      :
        <div/>
      }
    </BrowserRouter>
  );
})

export default App;
