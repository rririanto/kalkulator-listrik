import React, { Component } from "react";

import Form from "antd/es/form"; // for js
import Input from "antd/es/input/Input"; // for js
import InputNumber from "antd/es/input-number"; // for js
import Button from "antd/es/button/button"; // for js

import "antd/es/form/style/css"; // for css
import "antd/es/input/style/css"; // for css
import "antd/es/input-number/style/css"; // for css
import "antd/es/button/style/css"; // for css

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 10, offset: 8 },
  },
};

class FormItems extends Component {
  state = {
    key: 0,
    itemName: "",
    itemWatt: 1,
    itemHour: 1,
  };

  handleSubmit = (e) => {
    this.setState((prevState) => ({
      key: prevState.key + 1,
    }));
    this.props.onSubmit(this.state);
    this.setState({ itemName: "", itemWatt: 1, itemHour: 1 });
  };

  render() {
    return (
      <Form {...layout} onFinish={this.handleSubmit} size="middle">
        <Form.Item label="Nama Item">
          <Input
            name="itemName"
            value={this.state.itemName}
            onChange={(e) => this.setState({ itemName: e.target.value })}
            placeholder="misal. Kulkas"
          />
        </Form.Item>
        <Form.Item label="Daya / Konsumsi listrik">
          <InputNumber
            name="itemWatt"
            value={this.state.itemWatt}
            onChange={(value) => this.setState({ itemWatt: value })}
            placeholder=""
          />
          <span className="ant-form-text"> Watt</span>
        </Form.Item>
        <Form.Item label="Berapa jam per-hari mesin bekerja?">
          <InputNumber
            max={24}
            name="itemHour"
            value={this.state.itemHour}
            onChange={(value) => this.setState({ itemHour: value })}
            placeholder=""
          />
          <span className="ant-form-text"> Jam</span>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            + Tambah Item
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormItems;
