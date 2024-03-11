import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from '@chakra-ui/react';
import CustomTable from "../CustomTable";
import CustomCreateModal from "../CustomCreateModal";
import { StackContext } from "../../context/StackContext";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const SingleQuestion = () => {
    const { questions, setQuestions, answers, setAnswers, comments, setComments, loggedInUser, setLoggedInUser } = useContext(StackContext);
    const location = useLocation();
    const [quesID, setQuesID] = useState();


    useEffect(() => {
        setQuesID(location.pathname.split('/')[3]);
        console.log(questions.filter(question => question.qid == quesID));
    }, []);

    return (
        <div className="container">
            <h4> Question {quesID}</h4>
            <CustomTable questions={questions.filter(question => question.qid == quesID)} />
            <h4> Answers for Question {quesID}</h4>
            <CustomTable answers={answers.filter(answer => answer.qid == quesID)} />
            <CustomCreateModal type={"Answer"} id={quesID} />
        </div>






    );

};

export default SingleQuestion;
