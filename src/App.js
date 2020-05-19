import React, { Component } from "react";
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import HeaderMenu from './components/layout/Header'
import Layout from 'antd/es/layout/layout'; // for js
import 'antd/es/layout/style/css'; // for css
import "./App.css";

const HomePage = Loadable({
  loader: () => import('./pages/HomePage' /* webpackChunkName: "homepage" */),
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
