import React from 'react';

export default class CommentNode extends React.Component{
    render(){
        return(
            <div className={'ui comment node'}>
                <div className={'content'}>
                    <span className={'auther'}>{this.props.auther}</span>
                </div>
                <div className={'metadata'}>
                    <span className={'data'}>{this.props.data}</span>
                </div>
                <div className={'text'}>{this.props.children}</div>
            </div>
        )
    }
}