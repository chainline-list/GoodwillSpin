import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Card, Button } from 'antd';

import { SERVERLINK } from '../config';

function ClaimToken({ walletAddress, giftTokenBlockchain }) {
  const { redeedid } = useParams();

  const [giftTokenBalance, setGiftTokenBalance] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGiftTokenBalance = async () => {
      const amount = await giftTokenBlockchain.methods
        .giftTokenAmountList(redeedid)
        .call();
      setGiftTokenBalance(amount);
    }

    if(giftTokenBlockchain) getGiftTokenBalance();
  }, [giftTokenBlockchain, redeedid])

  // const claimToken = async () => {
  //   const data = await giftTokenBlockchain.methods
  //     .redeemToken(redeedid)
  //     .send({ from: walletAddress });
  //   console.log(data);
  // }

  const claimToken = async () => {
    try {
      setLoading(true);
      const res = await fetch(SERVERLINK + '/api/gift/claim', {
        method: 'POST',
        body: JSON.stringify({
          redeemId: redeedid,
          toAddress: walletAddress
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setTransactionHash(data.transactionHash);
      setGiftTokenBalance(0);
      setLoading(false);
    } catch(error){
      setLoading(false);
    }
  }

  return (
    <div className="site-card-border-less-wrapper" style={{ display: 'flex', justifyContent: 'center'}}>
      <Spin spinning={loading}>
        <Card title="Claim your gift tokens" bordered={false} style={{ width: 400 }}>
          {giftTokenBlockchain
            ? <div>
                <p>{giftTokenBalance / 10 ** 18} Gift Token</p>
                <Button type="primary" onClick={claimToken}>Claim Token</Button>
              </div>
            : <p>Connect to your wallet or login with Magic</p>
          }
          {transactionHash && <p>Success, {transactionHash}</p>}
        </Card>
      </Spin>
    </div>
  )
}

export default ClaimToken;
