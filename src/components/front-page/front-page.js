import React, { Component } from 'react';
// import '../stylesheets/dashboard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './sidebar';

export default class Front_page extends Component{
    render(){
        return(
            <div>
                <h1>Hi mamas</h1>
                <Sidebar/>

            </div>
        )
    }
}
// export default Front_page;