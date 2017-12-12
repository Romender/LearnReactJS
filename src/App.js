import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Product extends Component {

constructor(props) {
  super(props);
  this.state ={qty :0};
  this.props = props
}


  buyProduct(){
    this.setState({qty :this.state.qty +1});
    this.props.handleBuyProduct(this.props.price);
  }

  showProduct() {
    alert(`You have choosen ${this.props.name} mobile`);
  }


  render() {
    return (
      <div>
        <img src={logo} className="App-logo" />
        <p> {this.props.name} - ${this.props.price} </p>
        <button onClick={this.buyProduct.bind(this)}>buy</button>
        <button onClick={this.showProduct.bind(this)}>show</button>
        <h3> Quantity - {this.state.qty} item(s) </h3>
        <hr/>
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {total :0,
      catalog :[
        {id:1,name :"Andriod", price :199},
        {id:2,name :"iPhone", price :300},
        {id:3,name :"Nokia", price :65},
      ]
    };
  }

  addAmount(amount) {
    this.setState({total : this.state.total + amount})
  }

  addProduct(product) {
    console.log(product);
    this.setState({catalog :this.state.catalog.concat(product)});
  }

  render() {
    var component = this;
    var product = this.state.catalog.map(function(product){
      return (
        <Product key ={product.id} name={product.name} price={product.price}
          handleBuyProduct= {component.addAmount.bind(component)}
          />
      );
    });
    return (
      <div>
        <ProductForm handleSubmit={this.addProduct.bind(this)}/>
        {product}
        <Total total={this.state.total}/>
      </div>
    );
  }

}

class Total extends Component {

  constructor (props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <h3> Total Amount ${this.props.total} </h3>
      </div>
    );
  }
}

class ProductForm extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state ={ key : 4};

  }

  addProduct(){
    var product ={ id: this.state.key, name: this.refs.name.value , price : Number.parseFloat(this.refs.price.value)};
    this.props.handleSubmit(product);
    this.setState({key : this.state.key+1});
    this.refs.name.value="";
    this.refs.price.value="";
  }

  render() {
    return (
      <div>
        <br/>
          <input type="text" placeholder="ProductName"  pattern="[a-zA-Z]*"ref="name"/>
          <input type="text" placeholder="ProductPrice" pattern="[0-9]*" ref="price"/>
          <button onClick={this.addProduct.bind(this)}> Submit </button>
        <br/>
        <hr/>
      </div>
    );
  }

}


export default App;
