import React, { Component } from "react";
import "./App.css";
import FormSettings from "./components/FormSettings";
import TableList from "./components/TableList";
import CardList from "./components/CardList";
import FormItems from "./components/FormItems";
import Details from "./components/Details";
import HeaderMenu from "./components/Header";
import { Layout, Divider, Row } from "antd";
import { BrowserView, MobileView } from "react-device-detect";

const { Content } = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataItem: [],
      rates: 1467,
      result: {},
    };
  }

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
    delete result.baseDailyRate;
    delete result.rates;
    return {
      ...result,
      description,
      dailyMonthlyKwh,
      dailyMonthlyKwhRate,
    };
  };
  totalAllItem = (props) => {
    const total = props.reduce(
      (prev, next) => prev + next.itemWatt * next.itemHour,
      0
    );
    const result = this.calculateRate(total);
    const yearlyKwh = parseFloat(result.monthlyKwh * 12).toFixed(2);
    const yearlyRate = this.formatCurrency(result.baseDailyRate * 360);
    this.setState({
      result: {
        ...result,
        total,
        yearlyKwh,
        yearlyRate,
      },
    });
  };

  addNewItem = (formData) => {
    const newFormData = { ...formData, ...this.totalItem(formData) };
    console.log(newFormData);
    this.setState((prevState) => ({
      dataItem: [...prevState.dataItem, newFormData],
    }));
    this.totalAllItem(this.state.dataItem);
  };

  electricityRates = (props) => {
    this.setState(
      {
        rates: props.rates,
      },
      () => this.totalAllItem(this.state.dataItem)
    );
  };

  removeItems = (index) => {
    const items = this.state.dataItem.filter((item) => item.key !== index);
    items.map((item, index) => (item.key = index));
    this.setState({ dataItem: items, result: {} });
    this.totalAllItem(items);
  };

  render() {
    return (
      <Layout className="layout">
        <HeaderMenu />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-content" style={{ padding: 24 }}>
            <FormSettings onSubmit={this.electricityRates} />
            <Divider dashed />
            <FormItems onSubmit={this.addNewItem} />
          </div>
        </Content>
        <Content style={{ margin: "24px 16px 0" }}>
          <BrowserView>
            <TableList
              data={this.state.dataItem}
              removeItems={this.removeItems}
            />
          </BrowserView>
          <MobileView>
            <Row gutter={[18, 24]}>
              {this.state.dataItem.map((item) => (
                <CardList
                  removeItems={this.removeItems}
                  key={item.key}
                  {...item}
                />
              ))}
            </Row>
          </MobileView>
        </Content>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-content" style={{ padding: 24 }}>
            <Details result={this.state.result} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;
