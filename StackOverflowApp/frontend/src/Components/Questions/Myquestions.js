import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from '@chakra-ui/react';
import NewQuestionModal from '../../Components/NewQuestionModal';
import axios from "axios";
import { SmallCloseIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import "./Allques.css";
import { Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { StackContext } from "../../context/StackContext";
import CustomTable from '../CustomTable';

const Myquestions = () => {
  const { questions, setQuestions, answers, setAnswers, loggedInUser, setLoggedInUser } = useContext(StackContext);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!loggedInUser) setLoggedInUser(localStorage.getItem("user"));
    // console.log(loggedInUser);
    // console.log(answers);
  }, [showAll]);


  const fetchAllAnswers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/ans");
      // console.log(data);
      if (data.body) setAnswers(data.body);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMyAnswers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/ans/my",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (data.body) setAnswers(data.body);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAnswerDelete = async (id) => {
    // return console.log(id);
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/ans/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (data) {
        setAnswers(questions.filter((a) => a.aid !== id));
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleQuestionDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/ques/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (data) {
        // console.log([...questions.filter((q) => q.id !== id)]);
        setQuestions(questions.filter((q) => q.qid !== id));
      }
      console.log(data);
    } catch (err) {
      console.log(err);
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
    <div style={{ minHeight: "100vh" }} className="container">
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mb='0'>
          {showAll ? "Show my questions and answers" : "Shows all questions and answers"}
        </FormLabel>
        <Switch id='email-alerts' onChange={(e) => setShowAll(!showAll)} />
      </FormControl>
      <h4>My Questions</h4>
      <CustomTable questions={showAll ? questions : questions.filter(question => question.userid == loggedInUser)} />
      <h4>My Answers</h4>
      <CustomTable answers={showAll ? answers : answers.filter(answer => answer.userid == loggedInUser)} />
      <NewQuestionModal >
        <Button colorScheme='blue'>New Question</Button>
      </NewQuestionModal>
    </div>
  );
};

export default Myquestions;
