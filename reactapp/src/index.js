import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import CommentBox from './app/CommentBox';
import registerServiceWorker from './registerServiceWorker';

// var comments = [
//         {"auther":"xiaobai", "data":"1分钟前", "text":"你好"},
//         {"auther":"xiaohong", "data":"2分钟前", "text":"你好"}
//     ];


// ReactDOM.render(<CommentBox data={comments}/>,
//     document.getElementById('root'));

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// import { Router , Route } from 'react-router';
// import { Link } from 'react-router-dom'

class APP extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <h1>test</h1>
                    <Link to="/" className="item">首页</Link>
                    <Link to="/tv" className="item1">电视</Link>
                </div>
                {this.props.children};
            </div>
        );
    }
}

class TV extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <h2>电视节目列表</h2>
                </div>
                {this.props.children};
            </div>
        );
    }
}

class Show extends React.Component{
    render(){
        return(
            <div>
                <h3>节目</h3>
            </div>
        );
    }
}

ReactDOM.render((
    <Router>
        <Route path="/" component={APP}>
            <Route path="/tv" component={TV}>
                <Route path="/shows/:id" component={Show}></Route>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));

registerServiceWorker();