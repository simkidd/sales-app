import React, { useContext, useState } from "react";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Modal } from "antd";

const CreateCategory = ({openForm, setOpen}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { base_url } = apiConfig;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${base_url}/categories`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Handle the response from the server

      // Reset the form fields
      setName("");
      setDescription("");

      toast.success("Category created successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={openForm}
      onCancel={onCancel}
      title="Create a Category"
      okText="Create"
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

export default CreateCategory;
