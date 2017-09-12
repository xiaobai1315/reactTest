
import React from 'react';
import CommentNode from './CommentNode';

export default class CommentList extends React.Component{
    render(){

        let comments = this.props.data.map(comment =>{
            return (
                <CommentNode auther={comment.auther} data={comment.data}>
                    {comment.text}
                </CommentNode>
            );
        });

        return(
            <div className={"ui commentForm"}>
                {comments}
                {/*<CommentNode auther={comments}></CommentNode>*/}
            </div>
        )
    }
}