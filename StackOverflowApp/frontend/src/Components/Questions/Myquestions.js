import React, { useState, useEffect } from "react";
import { Box, Button } from '@chakra-ui/react';
import NewQuestionModal from '../../Components/NewQuestionModal';
import axios from "axios";
import "./Allques.css";
const Myquestions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    fetchMyQuestions();
    fetchAllAnswers();
  }, []);

  const fetchMyQuestions = async () => {
    console.log(localStorage.getItem("token"));

    try {
      const { data } = await axios.get(
        "http://localhost:5000/ques/my",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (data.body) setQuestions(data.body);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllQuestions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/ques");
      // console.log(data);
      if (data.body) setQuestions(data.body);
    } catch (err) {
      console.log(err);
    }
  };
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
      <h4>My Questions</h4>
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
          {questions.map((question) => {
            // console.log(processDate(question.created));
            return (
              <tr key={question.qid}>
                <td>{question.title}</td>
                <td>{question.description}</td>
                <td>{processDate(question.created)}</td>
                <td>{processDate(question.updated)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>My Answers</h4>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <tr key={answer.aid}>
              <td>{answer.description}</td>
              <td >{processDate(answer.created)}</td>
              <td>{processDate(answer.updated)}</td>
            </tr>
          ))}
        </tbody>

        <NewQuestionModal >
          <Button colorScheme='blue'>Button</Button>
        </NewQuestionModal>

      </table>
    </div>






  );

};

export default Myquestions;
