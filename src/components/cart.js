import React, {Component} from 'react';

class Cart extends Component {
  componentDidMount () {}

  render () {
    return (
      <section className="section">
        <h1>Your cart</h1>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th />
              <th className="has-text-centered">Title</th>
              <th />
              <th>Quantity</th>
              <th className="has-text-right">
                Unit Price
              </th>
              <th className="has-text-right">
                Total Price
              </th>
              <th />
            </tr>
          </thead>

          <tfoot>
            <tr className="is-justified-end">
              <th />
              <th />
              <th className="has-text-right">
                {this.props.caddy.reduce ((total, item) => {
                  console.log (total, item);

                  return total + item.book.price * item.quantity;
                }, 0)}
                &nbsp;
                <span>€</span>
              </th>
              <th className="spacer" />
            </tr>
          </tfoot>

          <tbody>
            {this.props.caddy.map ((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.book.cover} alt={item.book.title} />
                </td>
                <th className="book-title">{item.book.title}</th>
                <th>{item.quantity}</th>
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
