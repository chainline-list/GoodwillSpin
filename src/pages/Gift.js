import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Avatar, List, InputNumber, Typography, Divider, Button  } from 'antd';
import {
  HeartOutlined,
  SmileOutlined,
  TrophyOutlined
} from '@ant-design/icons';

import GiftFormCard from '../components/GiftFormCard';

import icon1 from '../assets/2page_gift box.png'
import icon2 from '../assets/2page_wheel.png';
import icon3 from '../assets/2page_donate.png';
import icon4 from '../assets/2page_share.png';

const data = [
  {
    image: icon1,
    description: 'Gift Goodwill allows you to share the joy and raise awareness of charitable giving with your friends and families by sending them charity gift tokens.',
  },
  {
    image: icon2,
    description: 'You get a spin ticket for every $1 of gift tokens.  ',
  },
  {
    image: icon3,
    description: 'Each gift token is $1.  Recipients of charity gift tokens can donate the tokens to their preferred charities',
  },
  {
    image: icon4,
    description: 'Or recipients can re-gift the tokens to their friends and families.',
  },
];

function Gift() {
  const [oneBalance, setOneBalance] = useState(0);
  const [occasionNum, setOccasionNum] = useState(1);
  const [purchaseGiftTokensAmount, setPurchaseGiftTokensAmount] = useState(0);

  function setPurchaseGiftTokens(value) {
    setPurchaseGiftTokensAmount(value);
  }

  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
            <Statistic title="Your Available ONE tokens" value={`${oneBalance / 10 ** 18} One`} />
            <Statistic title="Your Gift tokens" value="0" />

            <Typography.Title level={2} style={{ marginBottom: '5px' }}>
              Purchase Gift Tokens
            </Typography.Title >
            <InputNumber value={purchaseGiftTokensAmount} onChange={setPurchaseGiftTokens} />
            <br />
            <br />
            <Button type="primary">Purchase</Button>
          </Col>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} style={{ width: '3rem', height: '3rem'}}/>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          </Col>
        </Row>
      </Card>
      <Divider orientation="left">Gift Goodwill</Divider>
      <Card>
        <h2>What's the Occasion?</h2>
        <Row gutter={16}>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 1 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(1)}
          >
            <HeartOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Just for you</p>
          </Col>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 2 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(2)}
          >
            <SmileOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Thank you</p>
          </Col>
          <Col
            className="gutter-col"
            sm={{ span: 12 }}
            md={{ span: 4 }}
            style={ occasionNum !== 3 && { color: '#d0d2d6'} }
            onClick={() => setOccasionNum(3)}
          >
            <TrophyOutlined className="gift__icon" />
            <p style={{ textAlign: 'center' }}>Congratulations</p>
          </Col>
        </Row>
        <GiftFormCard />
      </Card>
    </div>
  )
}

export default Gift;