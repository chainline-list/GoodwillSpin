import React from 'react';
import { useHistory } from 'react-router';
import { Card, Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function Login({ loginWithMagic }) {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    await loginWithMagic(values.email);
    history.push('/');
  };

  return (
    <div className="site-card-border-less-wrapper" style={{ display: 'flex', justifyContent: 'center'}}>
      <Card title="Login with Magic" bordered={false} style={{ width: 400 }}>
        <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input  prefix={<MailOutlined />} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login;
