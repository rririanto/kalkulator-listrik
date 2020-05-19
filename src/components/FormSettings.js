import React, { Component } from "react";
import Form from "antd/es/form"; // for js
import InputNumber from "antd/es/input-number"; // for js
import "antd/es/form/style/css"; // for css
import "antd/es/input-number/style/css"; // for css

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

class FormSettings extends Component {
  state = {
    rates: 1467,
  };

  handleChange = (value) => {
    this.setState(
      {
        rates: value,
      },
      () => this.props.onSubmit(this.state)
    );
  };

  render() {
    return (
      <Form {...layout} size="middle">
        <Form.Item label="Tarif listrik Anda per-kWh">
          <InputNumber
            min={1}
            name="rates"
            value={this.state.rates}
            onChange={this.handleChange}
          />
          <span className="ant-form-text"> Rp/kWh</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://id.wikipedia.org/wiki/Tarif_dasar_listrik#Tarif_Tenaga_Listrik_2017"
            style={{ margin: "0 8px" }}
          >
            Butuh Bantuan?
          </a>
        </Form.Item>
      </Form>
    );
  }
}

export default FormSettings;
