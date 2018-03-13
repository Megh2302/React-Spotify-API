import React, { Component, Fragment } from 'react';
import Track from './Track-List';
import Search from './Track-Search';
import { Auth } from './utils/spotifyApi';

class App extends Component {
  state = { results: [], current_track: null };

  setAuth = async cb => {
    const { access_token, expires_in } = await Auth();
    console.log('New Auth Token Generated:', access_token);
    this.setState({ access_token, expires_in }, cb);
  };

  componentDidMount = async () => {
    await this.setAuth(() => {
      setInterval(
        async () => await this.setAuth(null),
        this.state.expires_in * 1000
      );
    });
  };

  update = results => {
    this.setState({ results, current_track: null }, () =>
      this.refs.audio_tag.pause()
    );
  };

  playTrack = current_track => {
    if (current_track === this.state.current_track) {
      this.setState({ current_track: null }, () => this.refs.audio_tag.pause());
    } else {
      this.setState({ current_track }, () => this.refs.audio_tag.play());
    }
  };

  render = () => {
    const { access_token, results, current_track } = this.state;
    return (
      <Fragment>

        <div className="search-container">
          <h1> Search Your Favorite Song/Artist!!! </h1>
          {access_token && (
              <Search tk={access_token} handleResults={this.update}></Search>
          )}
        </div>
        <div className="list">
          {results.map((e, a) => (
            <Track onClick={() => e.preview_url && this.playTrack(e.preview_url)} key={a} playing={e.preview_url && e.preview_url === this.state.current_track} track={e}></Track>
          ))}
        </div>
        <audio ref="audio_tag" src={current_track} onEnded={() => this.setState({ current_track: null })}></audio>
      </Fragment>
    );
  };
}
export default App;
