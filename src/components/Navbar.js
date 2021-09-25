import React from 'react';
import { Layout, Button } from 'antd';

function Navbar({ connetToWallet, walletAddress, loginWithMagic, logoutOfMagic, isLoggedIn }) {
  return (
    <Layout.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{ color: 'white'}}>Logo</h2>
        <div>
          {!walletAddress 
            ? <div>
                <Button
                  style={{ marginBottom: '7px'}}
                  type="primary"
                  onClick={connetToWallet}
                >
                  Connect to Wallet
                </Button>
                <Button onClick={loginWithMagic}>Login with Magic</Button>
              </div>
            : <Button
                style={{ marginBottom: '7px'}}
                type="primary"
              >
                {walletAddress.substring(0, 7) + '...' + walletAddress.substring(35, 42)}
              </Button>
          }
          {isLoggedIn && <Button onClick={logoutOfMagic}>Logout</Button>}
        </div>
      </div>
     
    </Layout.Header>
  )
}

export default Navbar;
