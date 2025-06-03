const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Al141200',
  database: 'libraryapp'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Get all books
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting books:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a single book
app.get('/books/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error getting book:', err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(results[0]);
  });
});

// Add a new book
app.post('/books', (req, res) => {
  console.log('Received request to add book:', req.body);
  const { title, author, pages } = req.body;
  
  if (!title || !author) {
    console.error('Missing required fields:', { title, author, pages });
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const id = crypto.randomUUID();
  const sql = 'INSERT INTO books (id, title, author, pages, readornot) VALUES (?, ?, ?, ?, ?)';
  
  console.log('Executing SQL with values:', [id, title, author, pages, false]);
  
  db.query(sql, [id, title, author, pages, false], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Book added successfully:', { id, title, author, pages });
    res.status(201).json({ 
      id,
      title, 
      author, 
      pages,
      readornot: false 
    });
  });
});

// Update a book
app.put('/books/:id', (req, res) => {
  const { title, author, pages } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  const sql = 'UPDATE books SET title = ?, author = ?, pages = ? WHERE id = ?';
  db.query(sql, [title, author, pages, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ id: req.params.id, title, author, pages });
  });
});

// Update read status
app.patch('/books/:id/read', (req, res) => {
  const { readornot } = req.body;
  const sql = 'UPDATE books SET readornot = ? WHERE id = ?';
  db.query(sql, [readornot, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating read status:', err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ id: req.params.id, readornot });
  });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const sql = 'DELETE FROM books WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});