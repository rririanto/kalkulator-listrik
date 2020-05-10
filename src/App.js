import React, { Component } from "react";
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import HeaderMenu from './components/Header'
import "./App.css";
import { Layout } from "antd";

const HomePage = Loadable({
  loader: () => import('./pages/HomePage'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <HeaderMenu />
        <HomePage/>
      </Layout>
    );
  }
}

export default App;
