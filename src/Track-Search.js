import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { searchForSongs } from './utils/spotifyApi';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/fontawesome-free-solid';

class Search extends Component {
  state = {load: false, error: null};
  Search_song = _.debounce(async q => {
    const { handleResults } = this.props;
      if (!q.length)
      {
          this.setState({
              load: false,
              error: null
          });
          handleResults([]);
      }
      else if (q.length >= 2)
      {
          const { tracks } = await searchForSongs(q, this.props.tk);
          this.setState({
              load: false,
              error: tracks.items.length > 0 ? null : 'No tracks found for this search'
          });
          handleResults(tracks.items);
      }
      else
      {
      this.setState({
        load: false,
        error: '2 or more character required'
      });
      handleResults([]);
      }
  }, 500);

  render = () => {
    const { load, error } = this.state;
    return (
      <div className="search">
        <FontAwesomeIcon icon={load ? faSpinner : faSearch} className="icon" spin={load}></FontAwesomeIcon>
        <input type="text" placeholder="Search Song" onChange={e => {this.setState({ load: true });this.Search_song(e.target.value);}}/>
        {error && <div className="error">{error}</div>}
        </div>
    );
  };
}
Search.propTypes = {
  tk: PropTypes.string.isRequired,
  handleResults: PropTypes.func.isRequired
};
export default Search;
