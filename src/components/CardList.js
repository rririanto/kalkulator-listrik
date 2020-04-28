import React, { Component } from "react";
import { Card, Col, Button } from "antd";

class CardList extends Component {
  remove = () => {
    this.props.removeItems(this.props.id);
  };

  render() {
    const item = this.props;
    console.log(item);
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
