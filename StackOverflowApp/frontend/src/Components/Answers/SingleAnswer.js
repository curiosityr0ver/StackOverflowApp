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

    const handleCommentDelete = async (id) => {
        // return console.log(id);
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/comments/${id}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleAnswerDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/ans/${id}`,
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
                    {answers.map((ans) => {
                        // console.log(processDate(question.created));
                        return (
                            <tr key={ans.qid}>
                                <td>{ans.title}</td>
                                <td>{ans.description}</td>
                                <td>{processDate(ans.created)}</td>
                                <td>{processDate(ans.updated)}</td>
                                <td> <Box display={"flex"} justifyContent={"space-around"}>
                                    <NewCommentModal > <EditIcon _hover={{ color: "darkgrey" }} /> </NewCommentModal>
                                    <SmallCloseIcon onClick={() => handleAnswerDelete(ans.qid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} />
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
                    {comments.map((cmt) => (
                        <tr key={cmt.cid}>
                            <td>{cmt.description}</td>
                            <td >{processDate(cmt.created)}</td>
                            <td>{processDate(cmt.updated)}</td>
                            <td> <Box display={"flex"} justifyContent={"space-around"}>
                                <EditIcon _hover={{ color: "darkgrey" }} />
                                <SmallCloseIcon onClick={() => handleCommentDelete(cmt.cid)} color={"white"} bg={"grey"} _hover={{ bg: "darkgrey" }} />
                            </Box></td>
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
