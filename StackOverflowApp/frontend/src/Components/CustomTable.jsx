import React, { useContext } from "react";
import CustomModal from "./CustomEditModal";
import { SmallCloseIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import axios from "axios";
import { StackContext } from "../context/StackContext";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

function CustomTable({ questions, answers, comments }) {
	const { setQuestions, setAnswers, loggedInUser, setLoggedInUser } =
		useContext(StackContext);
	const navigate = useNavigate();

	const handleQuestionDelete = async (id) => {
		try {
			const { data } = await axios.delete(`http://localhost:5000/ques/${id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});
			if (data) {
				// console.log([...questions.filter((q) => q.id !== id)]);
				setQuestions(questions.filter((q) => q.qid !== id));
			}
			setQuestions(questions.filter((q) => q.qid !== id));

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	if (questions)
		return (
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
					{questions.map(
						({ qid, userid, title, description, created, updated }) => (
							<tr key={qid}>
								<td>{title}</td>
								<td>{description}</td>
								<td>{processDate(created)}</td>
								<td>{processDate(updated)}</td>
								<td>
									{" "}
									<Box display={"flex"} justifyContent={"space-around"}>
										<CustomModal type={"Question"} id={qid}>
											<EditIcon _hover={{ color: "darkgrey" }} />{" "}
										</CustomModal>
										<SmallCloseIcon
											onClick={() => handleQuestionDelete(qid)}
											_disabled={loggedInUser == userid}
											color={"white"}
											bg={"grey"}
											_hover={{ bg: "darkgrey" }}
										/>
										<LinkIcon
											onClick={() => navigate(`../ques/single/${qid}`)}
											_disabled={loggedInUser == userid}
											_hover={{ color: "darkgrey" }}
										/>
									</Box>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		);
	else if (answers) {
		return (
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
					{answers.map(({ aid, description, created, updated }) => (
						<tr key={aid}>
							<td>{description}</td>
							<td>{processDate(created)}</td>
							<td>{processDate(updated)}</td>
						</tr>
					))}
					{/* <NewQuestionModal>
						<Button colorScheme="blue">Button</Button>
					</NewQuestionModal> */}
				</tbody>
			</table>
		);
	} else {
		return (
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
					{comments.map(({ cid, description, created, updated }) => (
						<tr key={cid}>
							<td>{description}</td>
							<td>{processDate(created)}</td>
							<td>{processDate(updated)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

const processDate = (date) => {
	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const formattedTime = new Date(date).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formattedDate + " • " + formattedTime;
};

export default CustomTable;
