import React, { Component } from 'react'

export default class Owned extends Component {
    constructor(){
        super()
        
        this.state = {
            gamesOwned: []
        }
    }

    render(props) {

        return (
            <div className='owned_games'>
                <div className="owned_game_list">
                    {this.props.ownedList.map((game, i) => console.log(game) || (
                        <div className='owned_list_items'>
                                <p>{game.name}</p>
                                <img
                                className="game_image"
                                src={game.image.small_url}
                                alt=""
                            />
                            <input 
                            className='change_name'
                            onChange={e => this.props.updateName(e)}
                            />
                            <button
                            className='name_update_btn'
                            onClick={() => this.props.nameChange(game.id)}
                            >
                                Update Name
                            </button>
                            <button
                                className='remove_from_owned'
                                type="submit"
                             onClick={e => this.props.removeOwned(game.id)} 
                            >
                                Remove from Owned
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}