import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListOfMovies from './list_of_movies';

export default class addMovie extends Component{
    addMovie(){
        
    }
    render(){
        return(
            <div>
                <form>
                    <label>Movie Name: <input type="text"></input></label>
                    <label>Suggested by: <input type="text"></input></label>
                    <label>Link: <input type="text"></input></label>
                    <label>Review: <input type="text"></input></label>
                </form>
                <button onClick={}>Add</button>
            </div>
        )
    }
}