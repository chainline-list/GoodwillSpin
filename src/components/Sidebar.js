import React from 'react';
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
        Spin & Win
      </Menu.Item>
      <Menu.Item key="2">
        Gift Goodwill
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar;
