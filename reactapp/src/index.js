import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CommentBox from './app/CommentBox';
import registerServiceWorker from './registerServiceWorker';

var comments = [
        {"auther":"xiaobai", "data":"1分钟前", "text":"你好"},
        {"auther":"xiaohong", "data":"2分钟前", "text":"你好"}
    ];


ReactDOM.render(<CommentBox data={comments}/>,
    document.getElementById('root'));

registerServiceWorker();