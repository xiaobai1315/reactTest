import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CommentBox from './app/comment';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CommentBox />,
    document.getElementById('root'));

registerServiceWorker();