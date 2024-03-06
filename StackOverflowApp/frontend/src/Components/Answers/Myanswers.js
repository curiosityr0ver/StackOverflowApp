import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Allques.css"
import "../Questions/Allques.css"
const Myanswers = () => {
  const [ans, setAns] = useState([]);
  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/ans/myanswers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setAns(response.data.data.body);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h4>Answers</h4>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {ans.map((answers) => (
            <tr key={answers.aid}>
              <td>{answers.description}</td>
              <td>{answers.created}</td>
              <td>{answers.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Myanswers;
