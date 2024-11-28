import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [product, setFormData] = useState({
        title: '',
        price: '',
        discount: '',
        description: '',
        category: '',
        images: null
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files.map((file) => URL.createObjectURL(file))); // Set preview images
        setFormData({ ...product, images: files }); // Set selected files
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('discount', product.discount);
        formData.append('description', product.description);
        formData.append('category', product.category);

        // Append each image file individually
        if (product.images && product.images.length > 0) {
            product.images.forEach((image, index) => {
                formData.append(`images`, image); // Adjust key if backend expects something different
            });
        }

        try {
            const response = await axios.post('http://localhost:9000/api/admin/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.data.message,
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while adding the product.',
                icon: 'error',
            });
            console.error('Error:', error);
        }
    };

    const containerStyle = {
        width: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#2b2b3d',
        borderRadius: '10px',
        color: '#ffffff',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#4caf50',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontSize: '1rem',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        backgroundColor: '#404052',
        color: '#ffffff',
    };

    const textAreaStyle = {
        ...inputStyle,
        height: '100px',
        resize: 'none',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const previewContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '15px',
    };

    const previewImageStyle = {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title */}
                <label style={labelStyle}>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter product title"
                    value={product.title}
                    onChange={handleInputChange}
                    style={inputStyle}
                />

                {/* Price */}
                <label style={labelStyle}>Price</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Enter product price"
                    value={product.price}
                    onChange={handleInputChange}
                    style={inputStyle}
                />

                {/* Discount */}
                <label style={labelStyle}>Discount (%)</label>
                <input
                    type="number"
                    name="discount"
                    placeholder="Enter discount percentage"
                    value={product.discount}
                    onChange={handleInputChange}
                    style={inputStyle}
                />

                {/* Description */}
                <label style={labelStyle}>Description</label>
                <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={handleInputChange}
                    style={textAreaStyle}
                ></textarea>

                {/* Category */}
                <label style={labelStyle}>Category</label>
                <input
                    type="text"
                    name="category"
                    placeholder="Enter product category"
                    value={product.category}
                    onChange={handleInputChange}
                    style={inputStyle}
                />

                {/* Multiple Images */}
                <label style={labelStyle}>Upload Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{
                        marginBottom: '15px',
                        padding: '10px',
                        color: '#fff',
                        backgroundColor: '#404052',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1rem',
                    }}
                />

                {/* Preview Images */}
                <div style={previewContainerStyle}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Preview ${index}`} style={previewImageStyle} />
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" style={buttonStyle}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
