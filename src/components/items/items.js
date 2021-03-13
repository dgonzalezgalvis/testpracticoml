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
      console.log(results);
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
        <div className="container">
        {results && results.length > 0 && results.map((item, index)=>{
          return (<div key={`item${index}`} className="item">
            <div className="thumbnail">
              <img src={item.thumbnail} onClick={()=>this.props.selectItem(item)}></img>
            </div>
            <div className="description">
              <div className="price">$ {new Intl.NumberFormat("de-DE").format(item.price)}</div>
              <div className="title">{item.title}</div>
              <div>{item.condition} - {item.sold_quantity}</div>
            </div>
            <div className="location">
              <div>{item.address.city_name}</div>
            </div>
          </div>)
        })};
        {results && results.length === 0 && locale.noResultsTxt}
        </div>
        
      </div>
    );
  }
  
}

export default Items;
