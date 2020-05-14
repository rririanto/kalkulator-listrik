import React from "react";
import Layout from 'antd/es/layout/layout'; // for js
import Menu from 'antd/es/menu/'; // for js
import 'antd/es/layout/style/css'; // for css
import 'antd/es/menu/style/css'; // for css

const { Header } = Layout;

function HeaderMenu() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="/">
            Home
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a target="_blank" rel="noopener noreferrer" href="https://pln.co.id">
            Situs PLN
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jimmyromanticdevil/kalkulator-listrik"
          >
            Fork Github
          </a>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default HeaderMenu;
