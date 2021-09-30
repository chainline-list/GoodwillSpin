import React, { useState } from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { Spin, Form, Input, Button, Select } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function DonationFormCard({ buyToken, oneBalance, oneToUSDBalance, wheelBlockchain }) {
  const [form] = Form.useForm();

  const [usd, setUSD] = useState("0");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    await buyToken(values.donationAmount);
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const getValue = async (e) => {
    const usdValue = await wheelBlockchain.methods
        .getThePrice()
        .call();

        console.log(usdValue)

    let totalUSDValue = (usdValue * e.target.value) / 10 ** 8;
    totalUSDValue = Number.parseFloat(totalUSDValue).toFixed(2);
    setUSD(totalUSDValue);
  }

  return (
    <Spin spinning={loading}>
      <Card>
        <Typography.Title style={{ marginTop: '0', marginBottom: '.5rem'}}>
          Donate to Win
        </Typography.Title>
        
        <Row gutter={16}>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
            <p style={{ marginBottom: '1rem'}}>For every Ten (Harmony ONE) Tokens donated to charities, you receive one ticket to spin the wheel of goodwill.</p>
            <Statistic title="Your Available ONE tokens" value={`${oneBalance / 10 ** 18} One ($${oneToUSDBalance})`} />
          </Col>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 16 }}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
              <Form.Item
                name="charityList"
                label="Charity List"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select Chartiy (Drop down list)"
                  allowClear
                >
                  <Select.Option value="0x83eb0e2e36da037d4a2f9145a2544252421d52d0">Red Cross</Select.Option>
                  <Select.Option value="0x41026a0c3880e0c6d19b0cdbb421f587f3029f40">Pet Shelter</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="donationAmount"
                label="Donation Amount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input onChange={getValue} addonAfter={`$${usd}`} placeholder="One" />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Donate
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default DonationFormCard;
