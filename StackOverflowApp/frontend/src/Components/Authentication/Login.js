import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
// import "../AtomComponents/styles.css"
import "../AtomComponent/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StackContext } from "../../context/StackContext";

function Login() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(StackContext);

  useEffect(() => {
    console.log(loggedInUser);
  }, []);



  const handleEmailChange = (e) => {
    setUserid(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    // e.preventDefault()
    try {
      let { data } = await axios.post(
        "http://localhost:5000/auth/login",

        { userid, password },

        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      // console.log(data);
      // return;
      if (data.statuscode === 200) {
        localStorage.setItem("token", data.body);
        localStorage.setItem("user", userid);
        setLoggedInUser(userid);
        navigate("/ques/myquestions");
      } else {
        window.alert("Incorrect username or password");
      }
    } catch (error) { }
  };
  return (
    <div className="container">
      <p className="title">Login Form</p>
      <form className="application" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="userid"
          placeholder="Enter Userid"
          value={userid}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type={"submit"} />
      </form>
    </div>
  );
}
export default Login;
