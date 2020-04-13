import React, { Component } from "react";
import { Card, Col } from "antd";

class CardList extends Component {
  remove = () => {
    this.props.removeItems(this.props.id);
  };

  render() {
    const item = this.props;
    return (
      <Col className="gutter-row" span={[18, 24]}>
        <Card
          title={item.itemName}
          bordered={false}
          extra={
            <button type="button" className="link-button" onClick={this.remove}>
              Hapus
            </button>
          }
        >
          {item.itemWatt} Watt, bekerja selama {item.itemHour} Jam
        </Card>
      </Col>
    );
  }
}

export default CardList;
