
import React from "react";

export default class CommentForm extends React.Component{
    render(){
        return(
            <form className={"ui commentForm"}>
                <div className={"field"}>
                    <input type={"text"} placeholder={"姓名"}/>
                </div>
                <div className={"field"}>
                    <input type={"text"} placeholder={"评论"}/>
                </div>
                <button type={"submit"} className={"ui blue button"}>
                    添加评论
                </button>
            </form>
        )
    }
}