import React from 'react';
import './breadcrumb.scss';
import logo from '../../assets/logoml.png';
import { throwStatement } from '@babel/types';

class Breadcrumb extends React.Component {
  constructor(props){
    super(props);
    this.goToLink = this.goToLink.bind(this);
  }

  componentDidUpdate(){
  }

  goToLink(_searchText){
    if(_searchText){
      window.location.replace(`/items?search=${_searchText}`);
    }else{
      window.location.replace(`/`);
    }
  }

  render(){
    let {searchText, itemId} = this.props;
    return (
      <div className="breadcrumb">
        <div className="container">
          <span className="clickable" onClick={()=>this.goToLink()}>Inicio</span>
          {searchText && (<span>
            <span>{'>'}</span>
            <span className="clickable" onClick={()=>this.goToLink(searchText)}>{searchText}</span>
          </span>)}
          {itemId && (<span><span>{'>'}</span><span>{itemId}</span></span>)}
          <span></span>
        </div>
      </div>
    );
  }
  
}

export default Breadcrumb;
