import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Sidebar from '../front-page/sidebar';
import { backend_url } from '../../constants/constant';
// import addMovie from './addMovie';

export default class ListOfMovies extends Component{
    constructor(props){
        super(props);
        this.state={
            movies:[]
        }
    }
    getAllMovies(){
        var list;
        axios.get(backend_url+"/v1/movies").then((res)=>{
            try{
            list=JSON.stringify(res.data.rows);
            console.log("backend returned"+JSON.stringify(list));
            this.setState({movies:list});
            document.getElementById("text_here").innerHTML='list is '+list+JSON.stringify(list);
            this.table_body();
            }
            catch(err){
                document.getElementById("text_here").innerHTML='got error and err is '+err+' backend sent '+res.data;
            }
        });
    }
    componentDidMount(){
        this.getAllMovies();
    }
    addMovieToList=()=>{
        var list=this.state.movies;
        var movie_name;
        var suggested_by,link,review;
        try {
            movie_name=document.getElementById("movie_name").value;
        } catch (error) {
            movie_name=''
        }
        try {
            suggested_by=document.getElementById("suggested_by").value;
        } catch (error) {
            suggested_by=''
        }
        try {
            link=document.getElementById("link").value;
        } catch (error) {
            link=''
        }
        try {
            review=document.getElementById("review").value;
        } catch (error) {
            review=''
        }
        // var suggested_by=document.getElementById("suggested_by").value;
        // var link=document.getElementById("link").value;
        // var review=document.getElementById("review").value;
        var link_to_add;
        if(link.length==0){
            link_to_add="No Link"
        }
        else{
            link_to_add=link;
        }
        var movie={
            "movie_name":movie_name,
            "suggested_by":suggested_by,
            "votes":0,
            "link":link_to_add,
            "review":review
        };
        axios.post(backend_url+"/v1/movie",{movie}).then((res)=>{
            console.log(list);
            this.getAllMovies();
            return;
        })
        
    }
    
    table_body(){
        // var trs=[];
        var movies=this.state.movies;
        var link;
        
        console.log(movies);
        if(movies.length==0){
            return(<tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    
                    <td>-</td>
                    <td>-</td>
            </tr>);
        }
        return movies.map((movie,index)=>{
            if(movie.link=='No Link'){
                link=movie.link;
            }
            else{
                link=<a href={movie.link}>link</a>
            }
            return(
                <tr>
                    <td>{movie.movie_name}</td>
                    <td>{movie.suggested_by}</td>
                    <td>{movie.votes}</td>
                    <td><button>Upvote</button><button>Downvote</button></td>
                    
                    <td>{link}</td>
                    <td>{movie.review}</td>
                </tr>
            )
        })
    }
    render(){
        // var link=<a href="www.google.com">link</a>;
        // var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":<a href="www.google.com">link</a>,"review":"gg"}]
        return(
            <div>
                <Sidebar/>
                <h2>List of movies</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Movie</th>
                        <th>Suggested By</th>
                        <th>Votes</th>
                        <th>upvote/downvote</th>
                        <th>Link</th>
                        <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.table_body()}
                    </tbody>
                </table>
                <div id="text_here"></div>
                <br></br><br></br>
                <h3>Add movies here</h3>
                <form>
                    <label>Movie Name: <input type="text" id="movie_name"></input></label><br></br><br></br>
                    <label>Suggested by: <input type="text" id="suggested_by"></input></label><br></br><br></br>
                    <label>Link: <input type="text" id="link"></input></label><br></br><br></br>
                    <label>Review: <input type="text" id="review"></input></label><br></br>
                </form>
                <br></br>
                <button onClick={this.addMovieToList}>Add</button>
                <br></br><br></br>
            </div>
        )
    }
}