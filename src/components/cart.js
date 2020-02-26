import React, {Component} from 'react';
import {BookService} from '../services/BooksService';

class Cart extends Component {
  componentDidMount () {}

  getTotal () {
    let total = 0;
    this.props.caddy.map (item => {
      total = total + item.book.price * item.quantity;
    });
    this.getBestOffers ();
    return total;
  }

  // get back all isbn in the caddy and join them
  getBestOffers () {
    let isbns = this.props.caddy.map (item => item.book.isbn);
    isbns = isbns.join (',');

    let bestOffers = BookService.getDataOffers (isbns);
    console.log ('BO', bestOffers);
  }

  render () {
    return (
      <section className="section">
        <h1>Your cart</h1>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>
                <abbr title="Product">Product</abbr>
              </th>
              <th>
                <abbr title="title">title</abbr>
              </th>
              <th className="has-text-centered">
                <abbr title="Quantity">Quantity</abbr>
              </th>
              <th className="has-text-centered">
                <abbr title="Price">Unit Price</abbr>
              </th>
              <th className="has-text-centered">
                <abbr title="Total Price">Total Price</abbr>
              </th>
              <th />
            </tr>
          </thead>

          <tfoot>
            <tr>
              <th />
              <th />
              <th />
              <th className="has-text-centered">
                Total

                {this.getTotal ()}
              </th>
              <th className="has-text-centered">€</th>
              <th className="has-text-centered" />
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th className="has-text-centered">
                Reduction
              </th>
              <th className="has-text-centered">€</th>
              <th className="has-text-centered" />
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th className="has-text-centered">
                Total before reduction
              </th>
              <th className="has-text-centered">€</th>
              <th className="has-text-centered" />
            </tr>
          </tfoot>

          <tbody>
            {this.props.caddy.map ((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.book.cover} alt={item.book.title} />
                </td>
                <th className="book-title">{item.book.title}</th>
                <td className="has-text-center">{item.quantity}</td>
                <td>{item.book.price} <span>€</span></td>
                <td>
                  {item.book.price * item.quantity}
                  <span>€</span>
                </td>
                <td>
                  <button onClick={() => this.props.onDelete (item)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </section>
    );
  }
}

export default Cart;
