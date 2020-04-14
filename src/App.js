import React, { Component } from "react";
import "./App.css";
import FormSettings from "./components/FormSettings";
import CardList from "./components/CardList";
import FormItems from "./components/FormItems";
import Details from "./components/Details";
import { Layout, Menu, Row, Divider } from "antd";

const { Header, Content } = Layout;

class App extends Component {
  state = {
    dataItem: [],
    rates: 1467,
    result: {},
  };

  calculateRate = (props) => {
    if (props.length >= 1 && this.state.rates > 0) {
      const total = props.reduce(
        (prev, next) => prev + next.itemWatt * next.itemHour,
        0
      );
      const rates = this.state.rates;
      const kwh = total / 1000;
      const dailyKwh = kwh * 1;
      const monthlyKwh = parseInt(kwh * 30);
      const yearlyKwh = parseInt(kwh * 365);
      const dailyRate = parseInt(dailyKwh * rates);
      const monthlyRate = parseInt(monthlyKwh * rates);
      const yearlyRate = parseInt(yearlyKwh * rates);
      this.setState({
        result: {
          total,
          rates,
          kwh,
          dailyKwh,
          monthlyKwh,
          yearlyKwh,
          dailyRate,
          monthlyRate,
          yearlyRate,
        },
      });
    }
  };

  addNewProfile = (formData) => {
    this.setState((prevState) => ({
      dataItem: [...prevState.dataItem, formData],
    }));
    this.calculateRate(this.state.dataItem);
  };

  electricityRates = (props) => {
    this.setState({ 
      rates: props.rates }, 
      () => this.calculateRate(this.state.dataItem)
    )

  };

  removeItems = (index) => {
    const items = this.state.dataItem.filter((item) => item.id !== index);
    items.map((item, index) => (item.id = index));
    this.setState({ dataItem: items});
    this.setState({ result: {}});
    this.calculateRate(items);
  };

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
               <a target="_blank" rel="noopener noreferrer" href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="2">
               <a target="_blank" rel="noopener noreferrer" href="https://pln.co.id">Situs PLN</a>
            </Menu.Item>
            <Menu.Item key="3"><a target="_blank" rel="noopener noreferrer" href="https://github.com/jimmyromanticdevil/kalkulator-listrik">Github</a></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '24px 16px 0'}}>
          <div className="site-layout-content" style={{ padding: 24 }}>
            <FormSettings onSubmit={this.electricityRates} />
            <Divider dashed />
            <FormItems onSubmit={this.addNewProfile} />
          </div>
          <div className="site-card-wrapper">
            <Row gutter={[18, 24]}>
              {this.state.dataItem.map((item) => (
                <CardList
                  removeItems={this.removeItems}
                  key={item.id}
                  {...item}
                />
              ))}
            </Row>
          </div>
        </Content>
        <Content style={{ margin: '24px 16px 0'}}>
          <div className="site-layout-content" style={{ padding: 24 }}>
            <Details result={this.state.result} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;
