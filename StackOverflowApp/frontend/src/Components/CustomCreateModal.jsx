import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	Input,
	useToast,
	Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext } from "react";
import { StackContext } from "../context/StackContext";

const CustomCreateModal = ({ type }) => {
	const {
		questions,
		setQuestions,
		answers,
		setAnswers,
		comments,
		setComments,
		loggedInUser,
		setLoggedInUser,
	} = useContext(StackContext);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [title, setTitle] = useState("sampleTitle");
	const [description, setDescription] = useState("sampleDesc");

	const toast = useToast();

	// const { user, tasks, setTasks } = TaskState();

	const handleSubmit = async () => {
		if (!description) {
			toast({
				title: `Please add ${type} title and description`,
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		try {
			const { data } = await axios.post(
				`http://localhost:5000/${
					type == "Question" ? "ques" : type == "Answer" ? "ans" : "comments"
				}`,
				{
					title: title,
					description: description,
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			if (data) {
				type == "Question"
					? setQuestions([...questions, data.body])
					: type == "Answer"
					? setAnswers([...answers, data.body])
					: setComments([...comments, data.body]);
			}
			onClose();
			toast({
				title: `New ${type} Created!`,
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
		} catch (error) {
			toast({
				title: `Failed to Create the ${type}!`,
				description: error.response.data,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
		}
	};

	return (
		<>
			<div style={{ display: "flex" }} onClick={onOpen}>
				<Button colorScheme="blue">New {type}</Button>
			</div>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="35px" display="flex" justifyContent="center">
						{`Create New ${type}`}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" flexDir="column" alignItems="center">
						{type == "Question" && (
							<FormControl>
								<Input
									placeholder={`${type} Title`}
									mb={1}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</FormControl>
						)}
						<FormControl>
							<Input
								placeholder={`${type} Description`}
								mb={1}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleSubmit} colorScheme="blue">
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CustomCreateModal;
