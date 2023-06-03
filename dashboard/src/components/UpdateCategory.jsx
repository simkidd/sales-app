import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import apiConfig from "../utils/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateCategory = ({
  openForm,
  setOpenEdit,
  category,
  setCategory,
  name,
  description,
  setName,
  setDescription,
}) => {
  const { base_url } = apiConfig;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const response = await axios.put(
        `${base_url}/categories/${id}`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      console.log(response.data);

      setName(response.data.category.name);
      setDescription(response.data.category.description);

      toast.success("Category updated!");
      setOpenEdit(false);
      setCategory({ ...category, name, description });
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`); // Display error toast notification
    }
  };

  const onCancel = () => {
    setOpenEdit(false);
  };

  return (
    <Modal
      open={openForm}
      onCancel={onCancel}
      title="Update Category"
      okText="Save"
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
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
