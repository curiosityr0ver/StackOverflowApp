const mysql = require("mysql2");
const pool = require("../../utils/db");
// const currentLogin = require('../../utils/currentLogin');
const { CustomError } = require("../../middleware/errorHandler");
const {
  fetchQuesQuery,
  fetchSingleQuesQuery,
  fetchMyQuesQuery,
  createQuesQuery,
  updateQuesQuery,
  deleteQuesQuery,
} = require("./quesQuery");
const response = require("../../utils/response");

const fetchQues = async (req, res, next) => {
  try {
    const { error, output } = await fetchQuesQuery();

    if (error) {
      throw new CustomError("Error fetching questions", 401);
    } else {
      response(200, "Questions retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchMyQues = async (req, res, next) => {
  const { userid } = req.user;
  try {
    const { error, output } = await fetchMyQuesQuery(userid);
    if (error) {
      throw new CustomError("Error fetching questions", 401);
    } else {
      response(200, "Questions retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchSingleQues = async (req, res, next) => {
  var id = req.params.id;
  try {
    const { error, output } = await fetchSingleQuesQuery(id);
    if (error || output.length == 0) {
      throw new CustomError("Error fetching the required question", 401);
    } else {
      response(200, "Question retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const createQues = async (req, res, next) => {
  const { userid } = req.user;
  const { title, description } = req.body;
  try {
    const { error, output } = await createQuesQuery(
      userid,
      title,
      description
    );
    console.log(output);
    if (error) {
      throw new CustomError("Error creating question", 401);
    } else {
      response(200, "Question created successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const updateQues = async (req, res, next) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const { error, output } = await updateQuesQuery(title, description, id);
    if (error) {
      throw new CustomError("Error updating question", 401);
    } else {
      response(200, "Question updated successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const deleteQues = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { error, output } = await deleteQuesQuery(id);
    if (error) {
      throw new CustomError("Error deleting question", 401);
    } else {
      response(200, "Question deleted successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchQues,
  fetchMyQues,
  fetchSingleQues,
  createQues,
  updateQues,
  deleteQues,
};
