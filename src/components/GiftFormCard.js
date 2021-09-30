import React, { useState } from 'react';
import { Spin, Row, Col, Form, Input, Button } from 'antd';

import { SERVERLINK } from '../config';
 
const msgList = [
  "Just for you",
  "Thank you",
  "Congratulations"
]
function GiftFormCard({ occasionNum, walletAddress, giftTokenBlockchain }) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const data = await giftTokenBlockchain.methods
        .sendTokenToSomeone(window.web3.utils.toWei(values.amount.toString(), 'Ether'))
        .send({ from: walletAddress });
      console.log(data);
      const res = await fetch(SERVERLINK + '/api/gift/sendemail', {
        method: 'POST',
        body: JSON.stringify({
          email: values.recipient,
          recipientName: values.recipientName,
          message: values.message,
          name: values.name,
          fromEmail: values.fromEmail,
          header: msgList[occasionNum - 1],
          redeemId: data.events.GiftTokenSent.returnValues.redeemId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(res);
      setLoading(false);
    } catch(error){
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="recipient"
              label="Recipient Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="recipientName"
              label="Recipient Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Gift Amount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="name"
              label="Your Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="fromEmail"
              label="Your Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="message"
              label="Gift Message"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={17} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default GiftFormCard;
