const response = require("../../utils/response");
const {
  fetchAnsQuery,
  fetchSingleAnsQuery,
  fetchSingleQuesAnsQuery,
  fetchMyAnsQuery,
  createAnsQuery,
  updateAnsQuery,
  deleteAnsQuery,
} = require("./ansQuery");

const fetchAns = async (req, res, next) => {
  try {
    const { error, output } = await fetchAnsQuery();
    if (error) {
      throw new CustomError("Error fetching answers", 401);
    } else {
      response(200, "Answers retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};
const fetchMyAns = async (req, res, next) => {
  const { userid } = req.user;
  try {
    const { error, output } = await fetchMyAnsQuery(userid);
    if (error) {
      throw new CustomError("Error fetching answers", 401);
    } else {
      response(200, "Answers retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchSingleAns = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error, output } = await fetchSingleAnsQuery(id);
    if (error || output.length == 0) {
      throw new CustomError("Error fetching single answers", 401);
    } else {
      response(200, "Answer retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchSingleQuesAns = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error, output } = await fetchSingleQuesAnsQuery(id);
    if (error || output.length == 0) {
      throw new CustomError("Error fetching single answers", 401);
    } else {
      response(200, "Answer retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const createAns = async (req, res, next) => {
  const { qid, description } = req.body;
  const { userid } = req.user;
  console.log("Hereeeee");
  // return console.log(userid, qid, description);

  try {
    const { error, output } = await createAnsQuery(
      userid,
      qid,
      description
    );
    if (error) {
      throw new CustomError("Error creating answers", 401);
    } else {
      response(200, "Answer created successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const updateAns = async (req, res, next) => {
  const id = req.params.id;
  const description = req.body.description;
  try {
    const { error, output } = await updateAnsQuery(description, id);
    if (error) {
      throw new CustomError("Error updating answers", 401);
    } else {
      response(200, "Answer updated successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const deleteAns = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { error, output } = await deleteAnsQuery(id);
    if (error) {
      throw new CustomError("Error deleting answer", 401);
    } else {
      response(200, "Answer deleted successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchAns, fetchSingleAns, fetchSingleQuesAns, fetchMyAns, createAns, updateAns, deleteAns };
