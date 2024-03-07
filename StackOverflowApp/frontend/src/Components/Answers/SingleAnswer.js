import React, { useState, useEffect } from "react";
import { Box, Button } from '@chakra-ui/react';
import NewAnswerModal from '../NewAnswerModal';
import axios from "axios";
import { SmallCloseIcon, EditIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

const SingleQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const location = useLocation();
    const [quesID, setQuesID] = useState();

    useEffect(() => {
        setQuesID(location.pathname.split('/')[3]);
        fetchMyQuestions();
        fetchMyAnswers();
    }, []);

    const fetchMyQuestions = async () => {

        try {
            const { data } = await axios.get(
                `http://localhost:5000/ques/${location.pathname.split('/')[3]}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log(data.body);
            if (data.body) setQuestions(data.body);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchMyAnswers = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/ans/ques/${location.pathname.split('/')[3]}`,
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
                console.log([...questions.filter((q) => q.id !== id)]);
                setQuestions(questions.filter((q) => q.qid !== id));
            }
            // console.log(data);
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
            <h4> Answer {quesID}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
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
                                <td> <Box display={"flex"} justifyContent={"space-around"}>
                                    <NewAnswerModal > <EditIcon _hover={{ color: "darkgrey" }} /> </NewAnswerModal>
                                    <SmallCloseIcon onClick={() => handleQuestionDelete(question.qid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} />
                                </Box></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h4> Comments for answer {quesID}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer) => (
                        <tr key={answer.aid}>
                            <td>{answer.description}</td>
                            <td >{processDate(answer.created)}</td>
                            <td>{processDate(answer.updated)}</td>
                            <td> <Box display={"flex"} justifyContent={"space-around"}> <EditIcon _hover={{ color: "darkgrey" }} /> <SmallCloseIcon onClick={() => handleAnswerDelete(answer.aid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} /></Box></td>
                        </tr>
                    ))}
                </tbody>

                <NewAnswerModal qid={quesID} >
                    <Button colorScheme='blue'>Answer</Button>
                </NewAnswerModal>

            </table>
        </div>






    );

};

export default SingleQuestion;
