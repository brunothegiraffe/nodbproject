import React, { Component } from 'react'

export default class Owned extends Component {

    render(props) {
        return (
            <div>
                <ul className="owned_game_list">
                    {this.props.ownedList.map((game, i) => (
                        <li
                            key={i}>
                            <img className="game_image" src={game.image.small_url} alt="" />
                            {game.name}
                            <br />
                            <button
                                type="submit"
                                // onClick={} 
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