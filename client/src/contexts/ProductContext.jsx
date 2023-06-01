import React, {createContext, useState, useEffect} from 'react';
import apiConfig from '../utils/apiConfig';
import axios from 'axios'

export const ProductContext = createContext()

const ProductProvider =({children}) =>{
    const  [products, setProducts] = useState([])

    const {base_url} = apiConfig;

    useEffect(() => {
      console.log('ProductProvider mounted'); 
        const fetchProducts = async () => {
          console.log('Fetching products'); 
          try {
            const response = await axios.get(`${base_url}/products`);
            // console.log(response.data);
            setProducts(response.data.products);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();

        return () => {
          console.log('ProductProvider unmounted'); // Add console log for unmounting
        };
      }, []);

    return(
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider