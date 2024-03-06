import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

function Register() {
  const [userid, setuserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:3000/users/create",
      data: {
        userid,
        name,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log("Response:", res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <p className="title">Register User</p>
      <form className="application" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userid}
          onChange={(e) => {
            setuserId(e.target.value);
          }}
          placeholder="EnteruserId"
        />
        <input
          type="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Create Password"
        />
        <button type="submit" value="Register">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
