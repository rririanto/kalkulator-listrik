import React, { Component } from "react";
import { Card, Col } from "antd";

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
            <button type="button" className="link-button" onClick={this.remove}>
              Hapus
            </button>
          }
        >
          Daya {item.itemWatt} Wh, bekerja selama {item.itemHour} jam per hari
        </Card>
      </Col>
    );
  }
}

export default CardList;
