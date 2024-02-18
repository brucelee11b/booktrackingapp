import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Search from 'pages/Search/Search';
import * as BooksAPI from 'services/BooksAPI';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        setBooks(books);
      });
    });
  };

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home books={books} changeShelf={changeShelf} />} />

        <Route path='/search' element={<Search books={books} changeShelf={changeShelf} />} />
      </Routes>
    </div>
  );
}

export default App;
