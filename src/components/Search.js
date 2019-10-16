import React, {Component} from 'react';

class Search extends Component {
  handleInputChange = event => {
    this.props.onSearchChange (event.target.value);
  };

  render () {
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

export default Search;
