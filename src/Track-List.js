import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faTimes} from '@fortawesome/fontawesome-free-solid';

export default ({ track, playing, onClick }) => (

    <div className="track-detail">

        <img src={track.album.images[0].url} className="images" alt={`${track.album.name} Cover Art`} onClick={onClick}/>
        <p className="play" onClick={onClick}>
            <FontAwesomeIcon icon={track.preview_url ? (playing ? faPause : faPlay) : faTimes} size="4x"/>
        </p>

        <div className="track-container">

            <div>
                <p className="title"> {track.name} </p>

            </div>

            <div>
                <a href={track.artists[0].external_urls.spotify} className="artist" target= '_blank'> {track.artists[0].name} </a>
                {' : '}
                <a href={track.album.external_urls.spotify} className="album" target= '_blank'> {track.album.name} </a>
            </div>

        </div>

    </div>
);

