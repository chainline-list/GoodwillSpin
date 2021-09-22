import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function PrizePoolCard({ donationTotal, poolPrize, awardedWon }) {
  return (
    <Card>
      <Row gutter={16}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Total Donations" value={`${donationTotal / 10 ** 18} One`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Total Pool Prize" value={`${poolPrize / 10 ** 18} One`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Total Winnings Awarded" value={`${awardedWon / 10 ** 18} One`} />
        </Col>
    </Row>
    </Card>
  )
}

export default PrizePoolCard;
