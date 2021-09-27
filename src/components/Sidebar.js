import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

function Sidebar() {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <Menu.Item key="1">
        <Link to="/">
          Spin & Win
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/gift">
          Gift Goodwill
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar;
