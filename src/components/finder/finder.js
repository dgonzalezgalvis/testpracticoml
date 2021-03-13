import React from 'react';
import './finder.scss';
import logo from '../../assets/logoml.png';
import { throwStatement } from '@babel/types';

class Finder extends React.Component {
  constructor(props){
    super(props);
    this.goToLink = this.goToLink.bind(this);
    this.search = this.search.bind(this);
    this.input = React.createRef();
  }

  goToLink(){
    window.location.replace(`/`);
  }


  search(){
    this.props.search(this.input.current.value);
  }

  render(){
    let {searchText} = this.props;
    return (
      <div className="finder">
        <div className="container">
          <img src={logo} onClick={this.goToLink}></img>
          <div className="input-holder">
            <input type="text"
              placeholder={this.props.locale.inputPlaceHolder}
              ref={this.input}
              defaultValue={searchText}
              ></input>
            <button 
              className="search"
              onClick={this.search}></button>
          </div>
          
        </div>
        
      </div>
    );
  }
  
}

export default Finder;
