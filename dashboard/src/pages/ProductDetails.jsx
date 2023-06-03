import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import Meta from "../components/Meta";
import { BsChevronLeft } from "react-icons/bs";
import UpdateProduct from "../components/UpdateProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [open, setOpen] = useState(false);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/products/${id}`);
        setProduct(response.data.product);
        console.log(response.data.product);
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setImage(response.data.product.image);
        setIsSold(response.data.product.isSold);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const response = await axios.put(
        `${base_url}/products/${id}`,
        {
          name,
          description,
          price,
          image,
          isSold,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Reset the form fields
      setName(response.data.product.name);
      setDescription(response.data.product.description);
      setPrice(response.data.product.price);
      setImage(response.data.product.image);
      setIsSold(response.data.product.isSold);

      toast.success("Product Updated!"); // Display success toast notification
      setProduct({ ...product, name, description, price, image, isSold });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`); // Display error toast notification
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <>
      <Meta title={product.name} />
      <div className="d-flex align-items-center justify-content-between mb-3">
      <Button type="text" className="mb-2 p-0 pe-2">
        <Link to='/admin/products' className="text-decoration-none d-flex align-items-center" ><BsChevronLeft className="me-2" /> Go Back to Products</Link>
      </Button>
      {/* update product */}

      <Button
            type="primary"
            onClick={() => setOpen(true)}
            onCancel={() => setOpen(false)}
          >
            Edit Product
          </Button>

          <UpdateProduct
            openForm={open}
            onCancel={() => setOpen(false)}
            handleSubmit={handleSubmit}
            name={name}
            description={description}
            price={price}
            image={image}
            isSold={isSold}
            setName={setName}
            setDescription={setDescription}
            setPrice={setPrice}
            setImage={setImage}
            setIsSold={setIsSold}
          />

      </div>

      <div className="d-flex bg-white p-4">
        <div className="ps-4 pe-4" style={{ maxWidth: "50%", width: "100%" }}>
          <h3 className="mb-4">Product Details</h3>
          <img src={product.image} alt="img" className="w-50" />
          <p className="fw-bold">{product.name}</p>

          <p className="fw-bold">
            Price: <br /> <span className="">&#8358; {product.price}</span>{" "}
          </p>
          <p className="fw-bold">
            In Stock:{" "}
            {product.isSold === true ? (
              <span className="text-danger">Sold</span>
            ) : (
              <span className="green">Available</span>
            )}
          </p>

          {/* Additional product details can be displayed here */}
        </div>

        <div
          className="ps-4 pe-4 d-flex flex-column"
          style={{ maxWidth: "50%", width: "100%" }}
        >
          

          <p className="fw-bold mt-4">
            Description: <br />{" "}
            {/* <span className="fw-normal">{product.description}</span>{" "} */}
            {product.description
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, index) => (
                <p className="fw-normal" key={index}>
                  {line}
                </p>
              ))}
          </p>

          
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductDetails;
