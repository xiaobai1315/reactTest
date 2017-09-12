import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import $  from 'jquery';

export default class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[]};
        this.getComments();
        // setInterval(() => this.getComments(), 5000);
    }
    //
    getComments(){
        // $.ajax({
        //     url:this.props.url,
        //     dataType:'json',
        //     cache:false,
        //     success:comments=>{
        //         this.setState({data:comments});
        //     },
        //     error:(xhr, status, error)=>{
        //         console.log(error);
        //     }
        // })
        this.setState({data:this.props.data});
    }

    //提交按钮的回调函数
    onSubmitComment(comment){
        console.log(comment);

        var currentComments = this.state.data;
        var newComments = currentComments.concat(comment);

        this.setState({data:newComments});
    }

    render() {
        return(
            <div className="ui commentBox">
                <h1>评论</h1>
                <div className="ui devider"></div>
                <CommentList data={this.props.data}/>
                <CommentForm submitEvent={this.onSubmitComment}/>
            </div>
        )
    }
}