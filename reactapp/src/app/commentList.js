
import React from 'react';
import CommentNode from './commentNode';

export default class CommentList extends React.Component{
    render(){
        return(
            <div className={"ui commentForm"}>
                <CommentNode auther={'xiaobai'} data={'1分钟'}>你好</CommentNode>
                <CommentNode auther={'xiaohong'} data={'2分钟'}>你好</CommentNode>
            </div>
        )
    }
}