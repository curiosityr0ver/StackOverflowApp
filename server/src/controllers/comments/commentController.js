const response = require("../../utils/response");
const {
  fetchCommentsQuery,
  fetchSingleCommentQuery,
  createCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
} = require("./commentQuery");
const CustomError = require("../../middleware/errorHandler");

const fetchComments = async (req, res, next) => {
  try {
    const { error, output } = await fetchCommentsQuery();
    if (error) {
      throw new CustomError("Error fetching comments", 401);
    } else {
      response(200, "Comments retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchSingleComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error, output } = await fetchSingleCommentQuery(id);
    if (error) {
      throw new CustomError("Error fetching single comment", 401);
    } else {
      response(200, "Comment retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};
const createComment = async (req, res, next) => {
  const { aid, description } = req.body;
  const { userid } = req.user;
  try {
    const { error, output } = await createCommentQuery(
      userid,
      aid,
      description
    );
    if (error) {
      throw new CustomError("Error creating comment", 401);
    } else {

      response(200, "Comment created successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  const id = req.params.id;
  const description = req.body.description;
  try {
    const { error, output } = await updateCommentQuery(description, id);
    if (error) {
      throw new CustomError("Error updating comment", 401);
    } else {
      response(200, "Comment updated successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  // return console.log(id);
  try {
    const { error, output } = await deleteCommentQuery(id);
    if (error) {
      throw new CustomError("Error deleting comment", 401);
    } else {
      response(200, "Comment deleted successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchComments,
  fetchSingleComment,
  createComment,
  updateComment,
  deleteComment,
};


