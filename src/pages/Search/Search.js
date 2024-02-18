import { Link } from 'react-router-dom';
import * as BooksAPI from 'services/BooksAPI';
import Book from 'components/Book';
import { useState } from 'react';

const Search = ({ books, changeShelf }) => {
  const [query, setQuery] = useState('');
  const [matchedBooks, setMatchedBooks] = useState([]);

  const updateQuery = (query) => {
    let trimmedQuery = query.replace(/^\s+/, '');

    setQuery(trimmedQuery);
    fetchMatchedBooks(query);
  };

  const fetchMatchedBooks = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then((matchedBooks) => {
        if (matchedBooks.error) {
          setMatchedBooks([]);
        } else {
          setMatchedBooks(matchedBooks);
        }
      });
    } else {
      setMatchedBooks([]);
    }
  };
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>

        <div className='search-books-input-wrapper'>
          <input type='text' placeholder='Search by title or author' value={query} onChange={(e) => updateQuery(e.target.value)} />
        </div>
      </div>

      <div className='search-books-results'>
        <ol className='books-grid'>
          {matchedBooks.map((matchedBook) => {
            let shelf = 'none';

            books.forEach((book) => {
              if (book.id !== matchedBook.id) {
                matchedBook.shelf = 'none';
              } else {
                shelf = book.shelf;
              }
            });

            return (
              <li key={matchedBook.id}>
                <Book book={matchedBook} changeShelf={changeShelf} currentShelf={shelf} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Search;
