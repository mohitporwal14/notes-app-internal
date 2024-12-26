import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (values: { email: string; password: string }) => {
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();

    if (users.find((user: any) => user.email === values.email)) {
      message.error('User already exists!');
    } else {
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('Signup successful!');
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <Typography.Title level={3} className="text-center mb-4">
          Signup
        </Typography.Title>
        <Form layout="vertical" onFinish={handleSignup}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
          <div className="text-center mt-4">
            Already have an account?{' '}
            <Button type="link" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
