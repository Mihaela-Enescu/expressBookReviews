const express = require('express');
let books = require("./booksdb.js");
let axios = require('axios');
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

// Get the book list available in the shop using async/await with Axios
public_users.get('/books', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // Retrieve the isbn parameter from the request URL and send the corresponding book's details
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });


// Get book details based on ISBN using async-await with Axios
public_users.get('/books/isbn/:isbn', async function (req, res) {
  try {
    // Retrieve the ISBN parameter from the request URL
    const isbn = req.params.isbn;

    // Use Axios to fetch book details from an external API or internal source
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);

    // Send the book details in the response
    res.send(response.data);
  } catch (error) {
    // Handle errors such as invalid ISBN or network issues
    res.status(500).send({ error: "Failed to fetch book details." });
  }
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

// Get book details based on author using async-await with Axios
public_users.get('/books/author/:author', async function (req, res) {
    try {
      const author = req.params.author;
  
      // Make request to local working endpoint
      const response = await axios.get(`http://localhost:5000/author/${author}`);
  
      // Return the result from the internal API
      res.send(response.data);
    } catch (error) {
      console.error("Axios error:", error.message);
      res.status(500).send({ error: "Failed to fetch books by author." });
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

// Get book details based on title using async-await with Axios
public_users.get('/books/title/:title', async function (req, res) {
    try {
      const title = req.params.title;
  
      // Use Axios to make GET request to local route
      const response = await axios.get(`http://localhost:5000/title/${title}`);
  
      // Return response from local route
      res.send(response.data);
    } catch (error) {
      console.error("Axios error:", error.message);
      res.status(500).send({ error: "Failed to fetch book by title." });
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
