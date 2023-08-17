import React from 'react';
import { Button, Checkbox, Form, Input, Select, Row, DatePicker } from 'antd';
const { Option } = Select;

// const onFinish = (values) => {
//   console.log('Success:', values);
// };

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function RegisterForm({ handleRegisterSubmit }) {
  return <>
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
        rules={[{ required: true, message: 'Yêu cầu nhập tên người dùng!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Yêu cầu nhập mật khẩu!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Tên"
        name="firstName"
        rules={[{ required: true, message: 'Yêu cầu nhập tên!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Họ"
        name="lastName"
        rules={[{ required: true, message: 'Yêu cầu nhập họ!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="dob"
        rules={[{ required: true, message: 'Yêu cầu nhập ngày sinh' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="authority" label="Loại tài khoản" rules={[{ required: true, message: "Yêu cầu chọn loại tài khoản" }]}>
        <Select
          placeholder="Tạo tài khoản Admin, Giáo viên hoặc Học sinh"
          //   onChange={onGenderChange}
          allowClear
        >
          <Option value="TEACHER">Giáo viên</Option>
          <Option value="STUDENT">Học sinh</Option>
          <Option value="ADMIN">Admin</Option>
        </Select>
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Row>
    </Form>
  </>
}



export default RegisterForm;