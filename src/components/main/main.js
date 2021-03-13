import React from 'react';
import './main.scss';
import locales from '../../common/locales/es.json';
import Finder from '../finder/finder';
import Items from '../items/items';
import Item from '../item/item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";

class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      searchText:'',
      itemSelected: null
    }
    this.search = this.search.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextParam =  urlParams.get('search');
    if(searchTextParam){
      this.setState({searchText: searchTextParam});
    } else if(window.location.pathname.indexOf('/items/')===0){
      const itemId = window.location.pathname.split('/').pop();
      this.setState({itemSelected: itemId});
    }
  }

  search(searchText) {
    if(searchText){
      this.setState({searchText, itemSelected: null});
      window.location.replace(`/items?search=${searchText}`);
    }
  }

  selectItem(_itemSelected){
    this.setState({itemSelected: _itemSelected.id});
    window.location.replace(`/items/${_itemSelected.id}`);
  }

  render(){
    const {itemSelected, searchText} = this.state;
    return (
      <Router>
        <div className="main">
          <Finder locale={locales.app.finder}
              searchText={searchText}
              search={this.search}></Finder>
          <Breadcrumb searchText={searchText} itemId={itemSelected}></Breadcrumb>
          {searchText && (<Items searchText={searchText} locale={locales.app.items}  selectItem={this.selectItem}></Items>)}
          {itemSelected && (<Item locale={locales.app.item} itemId={itemSelected}></Item>)}   
      </div>
      
      </Router>
    );
  }
  
}

export default Main;
