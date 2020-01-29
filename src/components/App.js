import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {BookService} from '../services/BooksService';
import '../styles/all.scss';
import BookList from './BookList';
import Cart from './cart';
import Header from './Header';
import Search from './Search';

class App extends React.Component {
  service = BookService;

  state = {
    books: [],
    filteredBooks: [],
    caddy: [],
  };

  componentDidMount () {
    this.service
      .getData ()
      .then (data => this.setState ({books: data, filteredBooks: data}));

    if (localStorage.getItem ('henri-potier-caddy')) {
      this.setState ({
        ...this.state,
        caddy: JSON.parse (localStorage.getItem ('henri-potier-caddy')),
      });
    }
  }

  handleSearchChange (search) {
    this.setState ({
      ...this.state,
      filteredBooks: this.state.books.filter (book =>
        book.title.toLowerCase ().includes (search.toLowerCase ())
      ),
    });
  }

  saveStateToLocalStorage () {
    localStorage.setItem (
      'henri-potier-caddy',
      JSON.stringify (this.state.caddy)
    );
  }

  render () {
    return (
      <React.Fragment>

        <Router>
          <div className="container">
            <Header
              className="navbar has-background-black-ter"
              caddy={this.state.caddy}
            />
            <div className="section">
              <Switch>
                <Route path="/Cart">
                  <Cart
                    caddy={this.state.caddy}
                    offers={this.state.offers}
                    onDelete={item => {
                      this.setState (
                        {
                          ...this.state,
                          caddy: this.state.caddy.filter (
                            caddyItem => caddyItem !== item
                          ),
                        },
                        this.saveStateToLocalStorage
                      );
                    }}
                  />
                </Route>

                <Route path="/">
                  <Search
                    onSearchChange={this.handleSearchChange.bind (this)}
                  />
                  <BookList
                    books={this.state.filteredBooks}
                    onSearchChange={this.handleSearchChange.bind (this)}
                    onCaddyAdded={book => {
                      let bookExists = this.state.caddy.find (
                        item => item.book.isbn === book.isbn
                      );

                      if (bookExists) {
                        bookExists.quantity++;

                        this.setState (
                          {
                            ...this.state,
                            caddy: [...this.state.caddy],
                          },
                          () => {
                            console.log (this.state);
                            this.saveStateToLocalStorage ();
                          }
                        );
                      } else {
                        this.setState (
                          {
                            ...this.state,
                            caddy: [...this.state.caddy, {book, quantity: 1}],
                          },
                          this.saveStateToLocalStorage
                        );
                      }
                    }}
                  />
                </Route>

              </Switch>
            </div>

          </div>
        </Router>

      </React.Fragment>
    );
  }
}

export default App;
