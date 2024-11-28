import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
    let [products, setProducts] = useState([])
    let { loginUser } = useContext(mainContext)

    let getAllProducts = async () => {
        let response = await axios.get('http://localhost:9000/api/admin/products')

        setProducts(response.data.products)
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    let AddToCartHandler = async (productId) => {
        let response = await axios.post('http://localhost:9000/api/admin/cart', { userId: loginUser._id, productId })
        Swal.fire('Success', response.data.message, 'success')

    }

    return (
        <div className='home'>
            <div className="wrapper">
                {
                    products.map((product, index) => {
                        return <div className="product">
                            <img src={product.images[0]} alt="" />
                            <h2>{product.title}</h2>
                            <h3><del>₹{product.price}</del> <span>₹{(product.price / 100) * (100 - product.discount)}</span></h3>
                            <p>{product.description}</p>
                            <button onClick={() => AddToCartHandler(product._id)}>Add To Cart</button>
                        </div>
                    })
                }
            </div>
        </div >
    );
};

export default Home;
