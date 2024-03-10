import React, { createContext, useState } from "react";

export const StackContext = createContext(null);
export const StackProvider = ({ children }) => {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [comments, setComments] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState();

	return (
		<StackContext.Provider
			value={{
				questions,
				setQuestions,
				answers,
				setAnswers,
				comments,
				setComments,
				loggedInUser,
				setLoggedInUser,
			}}
		>
			{children}
		</StackContext.Provider>
	);
};
