import React from 'react';
import {Link} from 'react-router-dom';

const Header = props => {
  return (
    <div className="has-text-centered">
      <h1>Want more</h1>
      {props.children}
      <Link to="/cart">
        Caddy (
        {props.caddy.reduce ((total, current) => total + current.quantity, 0)}
        )
      </Link>
    </div>
  );
};

Header.propTypes = {};

export default Header;
