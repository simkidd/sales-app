import React from "react";
import { Form, Input, Modal, Radio } from "antd";

const UpdateProduct = ({
  openForm,
  onCancel,
  handleSubmit,
  name,
  description,
  price,
  image,
  isSold,
  setName,
  setDescription,
  setPrice,
  setImage,
  setIsSold,
}) => {
  return (
    <Modal
      open={openForm}
      onCancel={onCancel}
      title="Update Product"
      okText="Update"
      cancelText="Cancel"
      onOk={handleSubmit}
      style={{ top: 20 }}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            style={{ resize: "none" }}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            prefix="&#8358;"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Radio.Group
            value={isSold}
            onChange={(e) => setIsSold(e.target.value)}
          >
            <Radio value={true}>Sold</Radio>
            <Radio value={false}>Available</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProduct;
