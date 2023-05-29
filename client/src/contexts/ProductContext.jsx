import React, {createContext, useState, useEffect} from 'react';
import apiConfig from '../utils/apiConfig';
import axios from 'axios'

export const ProductContext = createContext()

const ProductProvider =({children}) =>{
    const  [products, setProducts] = useState([])

    const {base_url} = apiConfig;

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${base_url}/products`);
            console.log(response.data);
            setProducts(response.data.products);
          } catch (error) {
            setError(error.response.data.error);
          }
        };
    
        fetchProducts();
      }, []);

    return(
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider