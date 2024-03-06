import React, { useState } from 'react'
import Register from './Authentication/Register'
import Login from './Authentication/Login'


function Home(){
    const [btnclick, setbtnclick] = useState("");

  return (
    <div className="container">
      <button
        onClick={() => {
          setbtnclick("Register");
        }}
      >
        Register
      </button>
      <button
        onClick={() => {
          setbtnclick("Login");
        }}
      >
        Login
      </button>
      <div>
        {btnclick === "Register" ? <Register /> : null}
        {btnclick === "Login" ? <Login /> : null}
      </div>
    </div>
  );

}
export default Home;