import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';

interface LoginPageProps {
  setUser: (user: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();

    const user = users.find((u: any) => u.email === values.email && u.password === values.password);
    if (user) {
      setUser(user.email);
      message.success('Login successful!');
      navigate('/dashboard');
    } else {
      message.error('Invalid email or password!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <Typography.Title level={3} className="text-center mb-4">
          Login
        </Typography.Title>
        <Form layout="vertical" onFinish={handleLogin}>
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
            Login
          </Button>
          <div className="text-center mt-4">
            Don't have an account?{' '}
            <Button type="link" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
