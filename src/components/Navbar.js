import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';


function Navbar({ connetToWallet, walletAddress, logoutOfMagic, isLoggedIn }) {
  return (
    <Layout.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/" style={{ color: 'white'}}>Logo</Link>
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
                <Button>
                  <Link to="/login">Login with Magic</Link>
                </Button>
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
