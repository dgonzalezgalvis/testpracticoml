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

  findItem(_itemId) {
    this.invokeGetItemApi(_itemId);
    this.invokeGetItemDescApi(_itemId);
  }

  async invokeGetItemApi(_itemId) {  
    let call = await fetch(`https://api.mercadolibre.com/items/${_itemId}`);
    if(call.ok){
      let results = await call.json();
      this.setState({item: results})
    }
  }


  async invokeGetItemDescApi(_itemId) {  
    let call = await fetch(`https://api.mercadolibre.com/items/${_itemId}/description`);
    if(call.ok){
      let results = await call.json();
      this.setState({description: results.plain_text});
    }
  }

  render(){
    const {locale} = this.props;
    const {item, description} = this.state;
    if(item){
      return (
        <div className="item">
          <div className="container">
            <div className="column-left">
              <div className="thumbnail">
                <img src={item.thumbnail}></img>
              </div>
              <div className="description">
                <div className="title">{locale.descLabel}</div>
                {description}
              </div>
            </div>
            <div className="column-right">
              <div className="first-line">{item.condition} - {item.sold_quantity} {locale.soldLabel}</div>
              <div className="title">{item.title}</div>
              <div className="price">${item.price}</div>
              <button>{locale.buyLabel}</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="item">
          <div className="container">
            {locale.itemNotFoundText}
          </div>
        </div>
      );
    }
    
  }
  
}

export default Item;
