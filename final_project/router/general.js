const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // Send JSON response with formatted books data
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // Retrieve the isbn parameter from the request URL and send the corresponding book's details
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author === author);
  
  if (filtered_books.length > 0) {
    res.send(JSON.stringify(filtered_books,null,4));
  } else {
    res.send('Unable to find a book of this author.')
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_books = Object.values(books).filter((book) => book.title === title);
    
    if (filtered_books.length > 0) {
      res.send(JSON.stringify(filtered_books[0],null,4));
    } else {
      res.send('Unable to find a book with this title.')
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
