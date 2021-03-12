import React from 'react';
import './item.scss';

class Item extends React.Component {
  constructor(){
    super();
    this.state = {
      item: null,
      description: ''
    }
  }

  componentDidMount(){
    debugger;
    let {itemId} = this.props;
    if(itemId){
      this.findItem(itemId);
    }
  }

  // componentDidUpdate(){
  //   let {itemId} = this.props;
  //   if(itemId){
  //     this.findItem(itemId);
  //   }
  // }

  findItem(_itemId) {
    this.invokeGetItemApi(_itemId);
    this.invokeGetItemDescApi(_itemId);
  }

  async invokeGetItemApi(_itemId) {  
    let call = await fetch(`https://api.mercadolibre.com/items/${_itemId}`);
    if(call.ok){
      let results = await call.json();
      this.setState({item: results})
      // return results.results;
    }
  }


  async invokeGetItemDescApi(_itemId) {  
    let call = await fetch(`https://api.mercadolibre.com/items/${_itemId}/description`);
    if(call.ok){
      let results = await call.json();
      this.setState({description: results.plain_text});
      // return results.results;
    }
  }

  render(){
    const {locale} = this.props;
    const {item, description} = this.state;
    if(item){
      return (
        <div className="item">
          <div className="card">
            <div className="thumbnail">
              <img src={item.thumbnail}></img>
            </div>
            <div className="details">
            <div>{item.condition} - {item.sold_quantity} {locale.soldLabel}</div>
              <div>{item.title}</div>
              <div>${item.price}</div>
              <button>{locale.buyLabel}</button>
            </div>
          </div>
          <div className="description">
            <div className="title">{locale.descLabel}</div>
            {description}
          </div>
          
        </div>
      );
    } else return <div>item not found</div>
    
  }
  
}

export default Item;
