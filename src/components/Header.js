import React from 'react';

const Header = props => {
  return (
    <Header className="has-text-centered">
      <h1>Want more</h1>
      {props.children}
    </Header>
  );
};

Header.propTypes = {};

export default Header;
