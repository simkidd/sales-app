import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemListing = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        console.log(response.data)
        setItems(response.data.items);
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
    <div>
      <h2>Item Listing</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li style={{background:"darkgray", color:"#000"}} key={item._id}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <img src={item?.image} alt="" />
              <p>{item.isSold === false ? "": "sold"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListing;
