import React, { Component } from "react";
import { Form, InputNumber, Tooltip } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

class FormSettings extends Component {
  constructor() {
    super();
    this.state = {
      rates: 1450,
    };
  }

  handleSubmit = async (e) => {
    console.log("pass");
  };

  handleChange = (value) => {
    this.setState({ 
      rates: value }, 
      () => this.props.onSubmit(this.state)
    )

  };

  render() {
    return (
      <Form {...layout} onFinish={this.handleSubmit} size="middle">
        <Form.Item label="Tarif listrik Anda per-kWh">
          <InputNumber
            min={1}
            name="rates"
            value={this.state.rates}
            onChange={this.handleChange}
          />
          <span className="ant-form-text"> Rp/kWh</span>
          <Tooltip title="Info tentang jenis tarif listrik">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://id.wikipedia.org/wiki/Tarif_dasar_listrik#Tarif_Tenaga_Listrik_2017"
              style={{ margin: "0 8px" }}
            >
              Butuh Bantuan?
            </a>
          </Tooltip>
        </Form.Item>
      </Form>
    );
  }
}

export default FormSettings;
