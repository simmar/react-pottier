import React, {Component} from 'react';

class Search extends Component {
  handleInputChange = event => {
    this.props.onSearchChange (event.target.value);
  };

  render () {
    return (
      <form className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            placeholder="Search your books"
            onChange={this.handleInputChange}
          />
          <span class="icon is-small is-left"><i class="fas fa-search" /></span>
        </div>
      </form>
    );
  }
}

export default Search;
