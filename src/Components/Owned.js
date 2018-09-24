import React, { Component } from 'react'

export default class Owned extends Component {

    render(props) {
        return (
            <div className='owned_games'>
                <ul className="owned_game_list">
                    {this.props.ownedList.map((game, i) => (
                        <li
                            key={i}>
                            <img className="game_image" src={game.image.small_url} alt="" />
                            {game.name}
                            <button
                                type="submit"
                                // onClick={this.props.removeOwned()} 
                                >
                                Remove from Owned
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}