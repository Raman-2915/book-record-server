const { userModel, bookModel } = require("../models/index");
const issuedBook = require("../dtos/book-dto");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found!!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book with this ID Found",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await userModel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");

  //DTO Data Transfer Object
  const issuedBooks = users.map((each) => new IssuedBook(each));

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the Issued Books..",
    data: issuedBooks,
  });
};
exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data To Add a Book",
    });
  }
  await bookModel.create(data);
  const allBooks = await bookModel.find();

  return res.status(201).json({
    success: true,
    message: "Book Added Successfully ",
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await bookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated A Book By Their ID",
    data: updatedBook,
  });
};
