import axios from "axios";
import "./Allques.css";
import { Box, Button } from '@chakra-ui/react';
import React, { useContext, useEffect } from "react";
import { StackContext } from "../../context/StackContext";
import { Link } from "react-router-dom";
import CustomTable from '../CustomTable';

function Allquestions() {
  const { questions, setQuestions } = useContext(StackContext);

  useEffect(() => {
    // let mounted = true;
    // console.log({ stackState });
    fetchQuestions();
    return () => {
      // mounted = false;
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/ques");
      setQuestions(data.body);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const processDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = new Date(date).toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return formattedDate + " • " + formattedTime;
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
  // return (
  //   <div className="container">
  //     <h4>Welcome to Questions Sections</h4>
  //     <Link to="/login">
  //       <button>Login</button>
  //     </Link>
  //     <Link to="/register">
  //       <button>Register</button>
  //     </Link>
  //     <ul>
  //       {questions.map((question) => (
  //         <li key={question.qid}>
  //           <h5>{question.title}</h5>
  //           <p>{question.description}</p>
  //           <p>Created: {question.created}</p>
  //           <p>Updated: {question.updated}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
export default Allquestions;
