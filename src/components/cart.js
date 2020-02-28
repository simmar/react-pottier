import React, {Component} from 'react';
import {BookService} from '../services/BooksService';

class Cart extends Component {
  state = {
    total: 0,
    bestOffer: 0,
  };

  componentDidMount () {
    this.getTotal ();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.caddy.length !== this.props.caddy.length) {
      this.getTotal ();
    }
  }

  getTotal () {
    let totalPrice = 0;

    this.props.caddy.map (item => {
      totalPrice += item.book.price * item.quantity;
    });
    this.setState ({total: totalPrice}, () => this.getBestOffers);
    this.getBestOffers ();
  }

  // get back all isbn in the caddy and join them
  getBestOffers () {
    if (this.props.caddy.length === 0) {
      this.setState ({bestOffer: 0});
      return;
    }
    let isbns = this.props.caddy.map (item => item.book.isbn);
    isbns = isbns.join (',');

    BookService.getDataOffers (isbns).then (offers => {
      // let offersData = offers.map (offer => offer.type);

      let reductions = offers.map (offer => {
        switch (offer.type) {
          case 'percentage': {
            return this.state.total * (offer.value / 100);
          }
          case 'minus': {
            return offer.value;
          }
          case 'slice': {
            const nbSlice = Math.floor (this.state.total / offer.sliceValue);
            return nbSlice * offer.value;
          }
          default:
            console.log ('false');
        }
      });

      reductions.sort (function (a, b) {
        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      });

      this.setState ({bestOffer: reductions[0]});
    });
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
              </th>
              <th className="has-text-centered">
                {this.state.total + ' €'}
              </th>
              <th className="has-text-centered" />
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th className="has-text-centered">
                Reduction
              </th>
              <th className="has-text-centered">
                {this.state.bestOffer + '  €'}
              </th>
              <th className="has-text-centered" />
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th className="has-text-centered">
                Total after reduction
              </th>
              <th className="has-text-centered">
                {this.state.total - this.state.bestOffer + ' €'}
              </th>
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
