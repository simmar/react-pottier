import React from 'react';

const Book = props => {
  return (
    <div className="column">
      <div>{props.book.title}</div>
      <img src={props.book.cover} alt={props.book.title} />
      <div>{props.book.price} €</div>
    </div>
  );
};

Book.defaultProps = {
  book: null,
};

export default Book;
