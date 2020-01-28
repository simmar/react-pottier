import React from 'react';
import Book from './Book';

const BookList = props => {
  return (
    <div className="columns">
      {props.books.map (book => (
        <Book
          book={book}
          key={book.isbn}
          onCaddyAdded={book => props.onCaddyAdded (book)}
        />
      ))}
    </div>
  );
};

BookList.defaultProps = {
  books: [],
};

export default BookList;
