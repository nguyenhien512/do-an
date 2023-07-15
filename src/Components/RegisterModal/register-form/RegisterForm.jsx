import React from 'react';
import { Button, Checkbox, Form, Input ,Select} from 'antd';
const { Option } = Select;

// const onFinish = (values) => {
//   console.log('Success:', values);
// };

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function RegisterForm({handleRegisterSubmit}){
    return<>
    <Form
    name="basic"
    // labelCol={{ span: 8 }}
    // wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={handleRegisterSubmit}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="First name"
      name="firstName"
      rules={[{ required: true, message: 'Please input your first name!' }]}
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      label="Last name"
      name="lastName"
      rules={[{ required: true, message: 'Please input your last name!' }]}
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item name="authority" label="role" rules={[{ required: true }]}>
        <Select
          placeholder="You are teacher or student ?"
        //   onChange={onGenderChange}
          allowClear
        >
          <Option value="TEACHER">teacher</Option>
          <Option value="STUDENT">student</Option>
        </Select>
      </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
}



export default RegisterForm;