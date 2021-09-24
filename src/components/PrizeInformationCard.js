import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  DeleteOutlined,
  CopyOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';

function PrizeInformationCard() {
  return (
    <Row gutter={3} style={{ marginTop: '1rem' }}>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DeleteOutlined className="prize__icon" />
          <Card.Meta title="Nothing" description="Sorry, Try again" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DollarCircleOutlined className="prize__icon" />
          <Card.Meta title="5% Prize" description="5% of the prize pool" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DollarCircleOutlined className="prize__icon" />
          <Card.Meta title="10% Prize" description="10% of the prize pool" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DollarCircleOutlined className="prize__icon" />
          <Card.Meta title="15% Prize" description="15% of the prize pool" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <CopyOutlined className="prize__icon" />
          <Card.Meta title="5 Tickets" description="Free 5 Ticket Tokens" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <CopyOutlined className="prize__icon" />
          <Card.Meta title="10 Tickets" description="Free 10 Ticket Tokens" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DollarCircleOutlined className="prize__icon" />
          <Card.Meta title="25% Prize" description="25% of the prize pool" />
        </Card>
      </Col>
      <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
        <Card>
          <DollarCircleOutlined className="prize__icon" />
          <Card.Meta title="50% Prize" description="50% of the prize pool" />
        </Card>
      </Col>
    </Row>
  )
}

export default PrizeInformationCard;
