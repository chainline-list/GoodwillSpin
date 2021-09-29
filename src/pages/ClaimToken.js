import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'antd';

function ClaimToken({ walletAddress, giftTokenBlockchain }) {
  const { redeedid } = useParams();

  const [giftTokenBalance, setGiftTokenBalance] = useState(0);

  useEffect(() => {
    const getGiftTokenBalance = async () => {
      const amount = await giftTokenBlockchain.methods
        .giftTokenAmountList(redeedid)
        .call();
      setGiftTokenBalance(amount);
    }

    if(giftTokenBlockchain) getGiftTokenBalance();
  }, [giftTokenBlockchain, redeedid])

  const claimToken = async () => {
    const data = await giftTokenBlockchain.methods
      .redeemToken(redeedid)
      .send({ from: walletAddress });
    console.log(data);
  }

  return (
    <div className="site-card-border-less-wrapper" style={{ display: 'flex', justifyContent: 'center'}}>
      <Card title="Claim your gift tokens" bordered={false} style={{ width: 400 }}>
        {giftTokenBlockchain
          ? <div>
              <p>{giftTokenBalance / 10 ** 18} Gift Token</p>
              <Button type="primary" onClick={claimToken}>Claim Token</Button>
            </div>
          : <p>Connect to your wallet or login with Magic</p>
        }
      </Card>
    </div>
  )
}

export default ClaimToken;
