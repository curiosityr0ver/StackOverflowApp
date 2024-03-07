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


const NewTaskModal = ({ qid, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [description, setDescription] = useState("sampleDesc");
    const [type, setType] = useState("Answer");
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
                "http://localhost:5000/ans",
                {
                    qid: qid,
                    description: description,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
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
                title: "Failed to Create the Answer!",
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
            <div style={{ display: "flex" }} onClick={onOpen}>{children}</div>
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
                    <ModalBody display="flex" flexDir="column" alignItems="center">
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
