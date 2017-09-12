import React from 'react';

export default class CommentForm extends React.Component{

    handleSubmit(event){
        event.preventDefault();
        console.log('提交表单');

        var auther = this.refs.auther.value;
        var text = this.refs.text.value;

        console.log(auther, text);

        this.props.submitEvent({auther, text});
    }

    render(){
        return(
            <form className={"ui commentForm"} onSubmit={this.handleSubmit.bind(this)}>
                <div className={"field"}>
                    <input type={"text"} placeholder={"姓名"} ref="auther"/>
                </div>
                <div className={"field"}>
                    <input type={"text"} placeholder={"评论"} ref="text"/>
                </div>
                <button type={"submit"} className={"ui blue button"}>
                    添加评论
                </button>
            </form>
        )
    }
}