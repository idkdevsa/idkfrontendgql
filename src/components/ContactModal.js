import React, { useState } from "react";
import { Modal } from "antd";
import { Form, Input, InputNumber, Button } from "antd";

const ContactModal = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="link" ghost onClick={() => handleClick()}>
        Contact
      </Button>
      <Modal
        className="contact-modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <span>Contact me on </span>
          <a href="mailto:jason@idkdev.co.za">jason@idkdev.co.za</a>
        </div>

        {/**
         * TODO handle contact form submission
         */}

        {/* <Form name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={['user', 'company']} label="Company">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
      </Modal>
    </>
  );
};

export default ContactModal;
