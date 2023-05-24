import React, { useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";

const ItemListing = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        console.log(response.data)
        setItems(response.data.products);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{width:'100%'}}>
      <h2>Item Listing</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul style={{padding:0, display:'grid', gridTemplateColumns: `repeat(4, 1fr)`, gap:40}}>
          {items.map((item) => (
            <li style={{background:"darkgray", listStyle:'none'}} key={item._id}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>Price: {item.price} NGN</p>
              <img src={item?.image} alt="" />
              <p>{item.isSold === false ? "Available": "sold"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListing;
