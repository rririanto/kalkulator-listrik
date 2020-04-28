import React, { Component } from "react";

import { Table, Button } from "antd";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Item",
        dataIndex: "description",
        sorter: (a, b) => a.itemName.length - b.itemName.length,
      },
      {
        title: "kWh",
        dataIndex: "dailyMonthlyKwh",
        sorter: (a, b) => a.dailyMonthlyKwh - b.dailyMonthlyKwh,
      },
      {
        title: "Biaya kWh",
        dataIndex: "dailyMonthlyKwhRate",
        sorter: (a, b) => a.dailyMonthlyKwhRate - b.dailyMonthlyKwhRate,
      },
      {
        title: "Aksi",
        key: "action",
        render: (text, record) => (
          <span>
            <Button type="link" danger
              onClick={(e) => {
                this.onDelete(record.key, e);
              }}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ];
  }

  onDelete = (key, e) => {
    e.preventDefault();
    this.props.removeItems(key);
  };

  render() {
    return (
      <Table
        pagination={{ position: ["bottomCenter"] }}
        columns={this.columns}
        dataSource={this.props.data}
      />
    );
  }
}

export default TableList;
