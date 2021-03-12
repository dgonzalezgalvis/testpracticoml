import React from 'react';
import './items.scss';

class Items extends React.Component {

  constructor(props){
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount(){
    let {searchText} = this.props;
    if(searchText){
      this.findItems(searchText);
    }
  }

  findItems(searchText) {
    this.invokeSearchApi(searchText).then(results=>{
      this.setState({results})
    });
  }

  async invokeSearchApi(searchText) {  
    let call = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchText}`);
    if(call.ok){
      let results = await call.json();
      return results.results;
    }
  }

  render(){
    const {locale} = this.props;
    const {results} = this.state;
    return (
      <div className="items">
        {results && results.length > 0 && results.map((item, index)=>{
          return (<div key={`item${index}`} className="item">
            <div className="thumbnail">
              <img src={item.thumbnail} onClick={()=>this.props.selectItem(item)}></img>
            </div>
            <div className="description">
              <div className="price">$ {item.price}</div>
              <div>{item.title}</div>
              <div>{item.condition} - {item.sold_quantity}</div>
            </div>
            <div className="location">
              <div>{item.address.city_name}</div>
            </div>
          </div>)
        })};
        {results && results.length === 0 && locale.noResultsTxt}
      </div>
    );
  }
  
}

export default Items;
