import React from "react";
import { Routes, Route } from "react-router-dom";
import Myquestions from "../Components/Questions/Myquestions";
import Allquestions from "../Components/Questions/Allquestions";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Myanswers from "../Components/Answers/Myanswers";

const Index = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Allquestions />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/ques/myquestions" element={<Myquestions />} />
      <Route path="/ans" element={<Myanswers/>} />
    </Routes>
  );
};

export default Index;
