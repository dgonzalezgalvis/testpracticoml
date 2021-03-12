import React from 'react';
import './finder.scss';
import logo from '../../assets/logoml.png';
import { throwStatement } from '@babel/types';

class Finder extends React.Component {
  constructor(props){
    super(props);
    this.setSearchText = this.setSearchText.bind(this);
    this.search = this.search.bind(this);
    this.input = React.createRef();
    // this.state = {
    //   searchText: ''
    // };
  }

  // componentDidMount(){
  //   let {searchText} = this.props;
  //   if(searchText){
  //     this.setState({searchText});
  //   }
  // }

  componentDidUpdate(){
    // let {searchText} = this.props;
    // if(searchText){
    //   this.setState({searchText});
    // }
  }

  setSearchText(newValue){
    // this.setState({searchText:newValue});
  }

  search(){
    this.props.search(this.input.current.value);
  }

  render(){
    let {searchText} = this.props;
    return (
      <div className="finder">
        <img src={logo}></img>
        <input type="text"
          placeholder={this.props.locale.inputPlaceHolder}
          ref={this.input}
          defaultValue={searchText}
          ></input>
        <button 
          className="search"
          onClick={this.search}></button>
      </div>
    );
  }
  
}

export default Finder;
