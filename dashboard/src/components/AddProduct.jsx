import React, { useContext, useState } from "react";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Modal, Select } from "antd";
import { ProductContext } from "../contexts/ProductContext";

const { Option } = Select;

const AddProduct = ({ openForm, setOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = useContext(ProductContext);

  const { base_url } = apiConfig;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${base_url}/products`,
        {
          name,
          description,
          price,
          image,
          category,
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
      setPrice("");
      setImage("");
      setCategory("");

      toast.success("Product created successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const onCancel = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("");
    setOpen(false);
  };

  return (
    <Modal
      open={openForm}
      onCancel={onCancel}
      title="Add Product"
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

        <div className="d-flex align-items-center">
          <Form.Item label="Price" style={{ width: "50%", marginRight:8 }}>
            <Input
              prefix="&#8358;"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Category" style={{ width: "50%" }}>
            <Select
              value={category}
              onChange={(value) => setCategory(value)}
              placeholder="Select a category"
            >
              {categories.map((category) => (
                <Option key={category.id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="Image URL">
          <Input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
