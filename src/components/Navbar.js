import React from 'react';
import { Layout, Button } from 'antd';

function Navbar({ connetToWallet, walletAddress}) {
  return (
    <Layout.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{ color: 'white'}}>Logo</h2>
        <Button
          style={{ marginBottom: '7px'}}
          type="primary"
          onClick={connetToWallet}
        >
          {walletAddress ? walletAddress.substring(0, 7) + '...' + walletAddress.substring(35, 42) : "Connect"}
        </Button>
      </div>
     
    </Layout.Header>
  )
}

export default Navbar;
