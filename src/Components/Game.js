import React from 'react';

function Game(props) {
    const game = {
        index: props.index,
        id: props.id,
        image: props.image,
        name: props.name,
    };
  return (
    <div className="game">
        <p>{props.name}</p>
        <p>{props.id}</p>
        <img className='game_image' src={props.image.small_url} />
        <button
        type='submit'
        onClick={e => props.addToOwned(e, game)}
        >Add to Owned</button>
    </div>
  )
}

export default Game;