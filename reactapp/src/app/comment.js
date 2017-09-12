
import React from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList';

export default class CommentBox extends React.Component{
    render(){
        return(
            <div className="ui commentBox">
                <h1>评论</h1>
                <div className="ui devider"></div>
                <CommentList/>
                <CommentForm/>
            </div>
         )
    }
}
