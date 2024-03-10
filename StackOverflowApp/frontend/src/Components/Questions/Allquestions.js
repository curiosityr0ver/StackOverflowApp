import axios from "axios";
import "./Allques.css";
import { Box, Button } from '@chakra-ui/react';
import React, { useContext, useEffect } from "react";
import { StackContext } from "../../context/StackContext";
import { Link } from "react-router-dom";
import CustomTable from '../CustomTable';
import { fetchResources } from "../../config/APIcalls";

function Allquestions() {
  const { questions, setQuestions, answers, setAnswers, comments, setComments } = useContext(StackContext);

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
    fetchComments();
    // setQuestions(data);
  }, []);


  const fetchQuestions = async () => {
    const data = await fetchResources("ques");
    setQuestions(data);
  };
  const fetchAnswers = async () => {
    const data = await fetchResources("ans");
    setAnswers(data);
  };
  const fetchComments = async () => {
    const data = await fetchResources("comments");
    setComments(data);
  };

  return (
    <div className="container">
      <Box w={"100%"} display={"flex"} alignItems={"center"} justifyItems={"center"} justifyContent={"space-evenly"}>
        <h4 > <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png" style={{ width: "200px", height: "80px", objectFit: "contain" }} /></h4>
        <Link to="/login">
          <Button colorScheme="red">Login</Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="blue">Register</Button>
        </Link>
      </Box>
      {questions && <CustomTable questions={questions} />}
    </div>
  );
}
export default Allquestions;
