import axios from "axios";
import "./Allques.css";
import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Allquestions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    // let mounted = true;

    fetchQuestions();
    return () => {
      // mounted = false;
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/ques");
      // if (mounted) {
      setQuestions(data.body);
      // }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  return (
    <div className="container">
      <h4 > <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png" style={{ width: "200px", height: "80px", objectFit: "contain" }} /></h4>
      <Box display={"flex"} p={"0% 25%"} justifyItems={"center"} justifyContent={"space-evenly"}>
        <Link to="/login">
          <Button colorScheme="red">Login</Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="blue">Register</Button>
        </Link>
      </Box>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.qid}>
              <td>{question.title}</td>
              <td>{question.description}</td>
              <td>{question.created}</td>
              <td>{question.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
