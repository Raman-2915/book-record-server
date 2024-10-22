const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

const { userModel, bookModel } = require("../models/index");

router.get("/", getAllBooks);
/*router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});     */

router.get("/issued", getAllIssuedBooks);
// router.get("/issued", (req, res) => {
//   const userWithTheIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });
//   const issuedBooks = [];
//   userWithTheIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);

//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
//   });
//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Book Have Been Issued Yet",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Users with the Issued Books..",
//     data: issuedBooks,
//   });
// });

router.get("/:id", getSingleBookById);
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   //console.log(req.params);
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book Not Found!!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Book with this ID Found",
//     data: book,
//   });
// });

router.post("/", addNewBook);
// router.post("/", (req, res) => {
//   const { data } = req.body;

//   if (!data) {
//     return res.status(400).json({
//       success: false,
//       message: "No Data To Add A Book",
//     });
//   }
//   const book = books.find((each) => each.id === data.id);
//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "ID Already Exists !!",
//     });
//   }
//   const allBooks = { ...books, data };
//   return res.status(201).json({
//     success: true,
//     message: "Added Book Succesfully",
//     data: allBooks,
//   });
// });

router.put("/:id", updateBookById);
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const book = [books.find((each) => each.id === id)];
//   if (!book) {
//     return res.status(400).json({
//       success: false,
//       message: "Book Not Found For This ID !!",
//     });
//   }
//   const updateData = book.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: " Updated a Book By Their ID !!",
//     data: updateData,
//   });
// });

module.exports = router;
