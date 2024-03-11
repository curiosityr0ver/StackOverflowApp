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

const CustomModal = ({ id, type, children }) => {
	const qid = id;
	const aid = id;
	const cid = id;
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
	const [title, setTitle] = useState(
		questions.filter((question) => question.qid == qid)[0].title
	);
	const [description, setDescription] = useState(
		questions.filter((question) => question.qid == qid)[0].description
	);

	const toast = useToast();
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
			const { data } = await axios.put(
				`http://localhost:5000/${
					type === "Question"
						? `ques/${id}`
						: type === "Answer"
						? `ans/${id}`
						: `comments/${id}`
				}`,
				{
					title: title,
					description: description,
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			onClose();
			toast({
				title: `${type} Modified!`,
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
		} catch (error) {
			toast({
				title: `Failed to modify the ${type}!`,
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
				{children}
			</div>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="35px" display="flex" justifyContent="center">
						{(qid || aid || cid) && `Update ${type} ${qid || aid || cid}`}
						{!qid && !aid && !cid && `Create New ${type}`}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" flexDir="column" alignItems="center">
						{qid && (
							<FormControl>
								<Input
									placeholder={`${type} Title`}
									defaultValue={title}
									mb={1}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</FormControl>
						)}
						<FormControl>
							<Input
								placeholder={`${type} Description`}
								defaultValue={description}
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

export default CustomModal;
