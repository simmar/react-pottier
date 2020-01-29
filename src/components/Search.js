import React, {Component} from 'react';

class Search extends Component {
  handleInputChange = event => {
    this.props.onSearchChange (event.target.value);
  };

  render () {
    return (
      <form className="field columns">
        <div className="column control has-icons-left is-half ">
          <input
            className="input"
            type="text"
            placeholder="Search your books"
            onChange={this.handleInputChange}
          />
        </div>
      </form>
    );
  }
}

export default Search;
