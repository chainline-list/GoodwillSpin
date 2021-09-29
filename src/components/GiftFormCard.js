import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
 
const msgList = [
  "Just for you",
  "Thank you",
  "Congratulations"
]
function GiftFormCard({ occasionNum, walletAddress, giftTokenBlockchain }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    const data = await giftTokenBlockchain.methods
      .sendTokenToSomeone(window.web3.utils.toWei(values.amount.toString(), 'Ether'))
      .send({ from: walletAddress });
    console.log(data);
    const res = await fetch('http://localhost:4000/api/gift/sendemail', {
      method: 'POST',
      body: JSON.stringify({
        email: values.recipient,
        message: values.message,
        from: values.from,
        header: msgList[occasionNum - 1],
        redeemId: data.events.GiftTokenSent.returnValues.redeemId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
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
              name="from"
              label="From"
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
              <Input.TextArea rows={9} />
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
    </div>
  )
}

export default GiftFormCard;
