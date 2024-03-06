const {
  fetchUsersQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
} = require("./userQuery");
const response = require("../../utils/response");

const fetchUsers = async (req, res, next) => {
  try {
    const { error, output } = await fetchUsersQuery();
    if (error) {
      throw new CustomError("Error fetching users", 401);
    } else {
      response(200, "Users retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};

const fetchSingleUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error, output } = await fetchSingleUserQuery(id);
    if (error) {
      throw new CustomError("Error fetching user", 401);
    } else {
      response(200, "User details retrieved successfully", output, res);
    }
  } catch (error) {
    next(error);
  }
};


const createUser = async (req, res, next) => {
  const { userid, name } = req.body;
  try {
    const { error, output } = await createUserQuery(userid, name);
    if (error) {
      throw new CustomError("Error fetching user", 401);

    } else {
      response(200, "User created successfully", output, res);
    }
  } catch (error) {
    next(error);

  }
};


const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const { error, output } = await updateUserQuery(name, id);
    if (error) {
      throw new CustomError("Error updating user", 401);

    } else {
      response(200, "User updated successfully", output, res);

    }

  } catch (error) {
    next(error);

  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error, output } = await deleteUserQuery(id);
    if (error) {
      throw new CustomError("Error deleting user", 401);
    }
    else {
      response(200, "User deleted successfully", output, res);

    }
  } catch (error) {
    error(next);

  }
};

module.exports = {
  fetchUsers,
  fetchSingleUser,

  createUser,
  updateUser,
  deleteUser,
};
