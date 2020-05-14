import React, { Component } from "react";

import Card from 'antd/es/card'; // for js
import Col from 'antd/es/col'; // for js
import Button from 'antd/es/button/button'; // for js

import 'antd/es/card/style/css'; // for css
import 'antd/es/col/style/css'; // for css
import 'antd/es/button/style/css'; // for css


class CardList extends Component {
  remove = () => {
    this.props.removeItems(this.props.id);
  };

  render() {
    const item = this.props;
    return (
      <Col xs={24} sm={20} md={8} lg={8} xl={6}>
        <Card
          title={item.itemName}
          bordered={false}
          extra={
            <Button type="link" danger onClick={this.remove}>
              Hapus
            </Button>
          }
        >
          {item.description}
          <br />
          <b>kWh:</b> {item.dailyMonthlyKwh}
          <br />
          <b>Biaya kWh:</b> {item.dailyMonthlyKwhRate}
        </Card>
      </Col>
    );
  }
}

export default CardList;
