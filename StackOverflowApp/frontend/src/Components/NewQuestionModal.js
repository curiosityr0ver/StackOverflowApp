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
import { useState } from "react";
// import { TaskState } from "../../context/TaskProvider";


const NewTaskModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("sampleTitle");
    const [description, setDescription] = useState("sampleDesc");
    const [taskDeadline, setTaskDeadline] = useState();
    const [type, setType] = useState("Question");
    const toast = useToast();


    // const { user, tasks, setTasks } = TaskState();



    const handleSubmit = async () => {
        console.log(localStorage.getItem("token"));
        if (!title || !description) {
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
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${user.token}`,
            //     },
            // };
            // console.log(taskDeadline);
            // const { data } = await axios.get(
            //     "http://localhost:5000/ans/my",
            //     { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            // );
            const { data } = await axios.post(
                "http://localhost:5000/ques",
                {
                    title: title,
                    description: description,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                // config
            );
            console.log(data);
            // setTasks([data, ...tasks]);
            onClose();
            toast({
                title: "New Question Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Question!",
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
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        display="flex"
                        justifyContent="center"
                    >
                        Create New {type}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder={`${type} Title`}
                                mb={3}
                                // value
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
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

export default NewTaskModal;
