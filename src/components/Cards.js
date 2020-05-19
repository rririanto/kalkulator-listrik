import React, { Component } from "react";
import CardItem from '../components/CardItem'

class Cards extends Component {
  render() {
    return this.props.data.map((item) => (
      <CardItem removeItems={this.props.removeItems} key={item.key} item={item} />
    ));
  }
}

export default Cards;
