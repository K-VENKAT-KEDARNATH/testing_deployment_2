import React,{Component} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Sidebar extends Component{
    render(){
        return(
            <nav>
                <u>
                    <li><a href="/movies">Movies</a></li>
                    <li><a href="/series">Series</a></li>
                </u>
            </nav>
        )
    }
}
export default Sidebar;