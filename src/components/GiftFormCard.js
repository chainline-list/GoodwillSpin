import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

function GiftFormCard() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
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
