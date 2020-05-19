import React, { Component } from "react";
import FormSettings from "../components/FormSettings";
import FormItems from "../components/FormItems";

import Layout from "antd/es/layout/layout"; // for js
import Divider from "antd/es/divider/"; // for js
import Row from "antd/es/row/"; // for js
import "antd/es/layout/style/css"; // for css
import "antd/es/divider/style/css"; // for css
import "antd/es/row/style/css"; // for css

import Loadable from "react-loadable";
import Loading from "../components/Loading";

import { BrowserView, MobileView } from "react-device-detect";

const { Content } = Layout;

const TableList = Loadable({
  loader: () =>
    import("../components/TableList" /* webpackChunkName: "table-list" */),
  loading: Loading,
});

const Cards = Loadable({
  loader: () =>
    import("../components/Cards" /* webpackChunkName: "card-list" */),
  loading: Loading,
});

const Details = Loadable({
  loader: () =>
    import("../components/Details" /* webpackChunkName: "details" */),
  loading: Loading,
});

class HomePage extends Component {
  state = {
    dataItem: [],
    rates: 1467,
    result: {},
    showComponents: false,
  };

  formatCurrency = (props) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(parseFloat(props).toFixed(2));

  calculateRate = (total) => {
    const rates = this.formatCurrency(this.state.rates);
    const kwh = total / 1000;
    const dailyKwh = kwh * 1;
    const monthlyKwh = parseFloat(dailyKwh * 30).toFixed(2);
    const baseDailyRate = parseFloat(dailyKwh * this.state.rates).toFixed(2);
    const dailyRate = this.formatCurrency(baseDailyRate);
    const monthlyRate = this.formatCurrency(baseDailyRate * 30);
    return {
      rates,
      kwh,
      dailyKwh,
      monthlyKwh,
      baseDailyRate,
      dailyRate,
      monthlyRate,
    };
  };

  totalItem = (item) => {
    const { itemName, itemWatt, itemHour } = item;
    const total = itemWatt * itemHour;
    const description = `${itemName} (${itemWatt} Watt x ${itemHour} jam/hari = ${total} Wh)`;
    const result = this.calculateRate(total);
    const dailyMonthlyKwh = `${result.dailyKwh} kWh/hari = ${result.monthlyKwh} kWh/bulan`;
    const dailyMonthlyKwhRate = `${result.dailyRate}/hari = ${result.monthlyRate}/bulan`;
    const { baseDailyRate, rates, ...newResultObj } = result;
    return {
      ...newResultObj,
      description,
      dailyMonthlyKwh,
      dailyMonthlyKwhRate,
    };
  };
  totalAllItem = () => {
    const total = this.state.dataItem.reduce(
      (prev, next) => prev + next.itemWatt * next.itemHour,
      0
    );

    const result = this.calculateRate(total);
    const yearlyKwh = parseFloat(result.monthlyKwh * 12).toFixed(2);
    const yearlyRate = this.formatCurrency(result.baseDailyRate * 360);
    this.setState({
      result: {
        ...this.state.result,
        ...result,
        total,
        yearlyKwh,
        yearlyRate,
      },
    });
  };

  addNewItem = (formData) => {
    this.setState({ showBar: true });
    const newFormData = { ...formData, ...this.totalItem(formData) };
    this.setState((prevState) => ({
      dataItem: [...prevState.dataItem, newFormData],
    }));
    this.totalAllItem();
  };

  electricityRates = (props) => {
    this.setState(
      {
        rates: props.rates,
      },
      () => this.totalAllItem()
    );
  };

  removeItems = (key) => {
    this.setState({
      dataItem: [...this.state.dataItem.filter((item) => item.key !== key)],
      result: {},
    });
  };

  render() {
    const { dataItem, result } = this.state;
    return (
      <>
        <Content>
          <div className="site-layout-content" style={{ margin: "20px" }}>
            <FormSettings onSubmit={this.electricityRates} />
            <Divider dashed />
            <FormItems onSubmit={this.addNewItem} />
          </div>
        </Content>
        {this.state.showBar && (
          <>
            <Content style={{ margin: "24px 16px 0" }}>
              <BrowserView>
                <TableList data={dataItem} removeItems={this.removeItems} />
              </BrowserView>
              <MobileView>
                <Row gutter={[18, 24]}>
                  <Cards removeItems={this.removeItems} data={dataItem} />
                </Row>
              </MobileView>
            </Content>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="site-layout-content" style={{ padding: 24 }}>
                <Details result={result} />
              </div>
            </Content>
          </>
        )}
      </>
    );
  }
}

export default HomePage;
