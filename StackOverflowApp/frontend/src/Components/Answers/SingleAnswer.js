import React, { useState, useEffect } from "react";
import { Box, Button } from '@chakra-ui/react';
import NewCommentModal from '../NewCommentModal';
import axios from "axios";
import { SmallCloseIcon, EditIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

const SingleQuestion = () => {
    const [answers, setAnswers] = useState([]);
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const [ansID, setAnsID] = useState();

    useEffect(() => {
        setAnsID(location.pathname.split('/')[3]);
        fetchMyAnswer();
        fetchMyAnswers();
    }, []);

    const fetchMyAnswer = async () => {

        try {
            const { data } = await axios.get(
                `http://localhost:5000/ans/${location.pathname.split('/')[3]}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log(data.body);
            if (data.body) setAnswers(data.body);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchMyAnswers = async () => {
        try {
            const { data } = await axios.get(
                // `http://localhost:5000/comment/ans/${location.pathname.split('/')[3]}`,
                `http://localhost:5000/comments/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (data.body) setComments(data.body);
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
                console.log([...answers.filter((q) => q.id !== id)]);
                setAnswers(answers.filter((q) => q.qid !== id));
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
            <h4> Answer {ansID}</h4>
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
                    {answers.map((question) => {
                        // console.log(processDate(question.created));
                        return (
                            <tr key={question.qid}>
                                <td>{question.title}</td>
                                <td>{question.description}</td>
                                <td>{processDate(question.created)}</td>
                                <td>{processDate(question.updated)}</td>
                                <td> <Box display={"flex"} justifyContent={"space-around"}>
                                    <NewCommentModal > <EditIcon _hover={{ color: "darkgrey" }} /> </NewCommentModal>
                                    <SmallCloseIcon onClick={() => handleQuestionDelete(question.qid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} />
                                </Box></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h4> Comments for answer {ansID}</h4>
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
                    {comments.map((answer) => (
                        <tr key={answer.aid}>
                            <td>{answer.description}</td>
                            <td >{processDate(answer.created)}</td>
                            <td>{processDate(answer.updated)}</td>
                            <td> <Box display={"flex"} justifyContent={"space-around"}> <EditIcon _hover={{ color: "darkgrey" }} /> <SmallCloseIcon onClick={() => handleAnswerDelete(answer.aid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} /></Box></td>
                        </tr>
                    ))}
                </tbody>

                <NewCommentModal aid={ansID} >
                    <Button colorScheme='blue'>Comment</Button>
                </NewCommentModal>

            </table>
        </div>






    );

};

export default SingleQuestion;
