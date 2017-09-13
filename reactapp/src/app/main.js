import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link} from 'react-router';

class APP extends React.Component{
    render(){
        return(
            <div>
                <div>

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
                <div>电视节目列表</div>
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