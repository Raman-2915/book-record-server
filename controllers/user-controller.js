const { userModel, bookModel } = require("../models/index");

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No user Found",
    });
  }
  res.status(200).json({
    success: true,
    data: users,
  });
};
exports.getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user Not Found!!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book with this ID Found",
    data: user,
  });
};

exports.addNewUser = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data To Add a User",
    });
  }
  await userModel.create(data);
  const allUsers = await userModel.find();

  return res.status(201).json({
    success: true,
    message: "User Added Successfully ",
    data: allUsers,
  });
};
