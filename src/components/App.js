import React from 'react';
import {BookService} from '../services/BooksService';
import '../styles/all.scss';
import Book from './Book';
import Header from './Header';
import Search from './Search';

class App extends React.Component {
  service = BookService;

  state = {
    books: [],
    filteredBooks: [],
  };

  componentDidMount () {
    this.service
      .getData ()
      .then (data => this.setState ({books: data, filteredBooks: data}));
  }

  handleSearchChange (search) {
    this.setState ({
      ...this.state,
      filteredBooks: this.state.books.filter (book =>
        book.title.toLowerCase ().includes (search.toLowerCase ())
      ),
    });
  }

  render () {
    return (
      <React.Fragment>
        <Header title="HARRY POTTIER" />
        <div className="columns">
          {this.state.filteredBooks.map (item => (
            <Book book={item} key={item.isbn} />
          ))}
        </div>
        <Search onSearchChange={this.handleSearchChange.bind (this)} />
      </React.Fragment>
    );
  }
}

export default App;
