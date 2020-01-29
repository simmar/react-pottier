import React from 'react';
import {Link} from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            HARRY POTTIER
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/cart" className="button is-primary">
              Caddy (
              {props.caddy.reduce (
                (total, current) => total + current.quantity,
                0
              )}
              )
            </Link>
          </div>
        </div>

      </nav>
    </header>
  );
};

Header.propTypes = {};

export default Header;
