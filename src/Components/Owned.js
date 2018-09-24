import React, { Component } from 'react'

export default class Owned extends Component {

    render(props) {
        return (
            <div className='owned_games'>
                <ul className="owned_game_list">
                    {this.props.ownedList.map((game, i) => (
                        <div className='owned_list_items'>
                                {game.name}
                                <img
                                className="game_image"
                                src={game.image.small_url}
                                alt=""
                            />
                            <button
                                className='remove_from_owned'
                                type="submit"
                            // onClick={this.props.removeOwned()} 
                            >
                                Remove from Owned
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}