import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { useParams, useNavigate } from "react-router-dom";


export default function ProductTable() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate(); 


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/readProduct")
      .then((res) => {
        console.log('Response:', res);
        setDocuments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (_id) => {
    console.log("Deleting product with ID:", _id); // Debugging log
    if (!_id) {
      console.error("Invalid product or missing _id");
      return;
    }
  
    axios
      .delete(`http://localhost:8000/api/deleteProduct/${_id}`) // Use DELETE method with dynamic URL
      .then((res) => {
        console.log("Deleted product:", _id);
        const updatedDocuments = documents.filter((doc) => doc._id !== _id);
        setDocuments(updatedDocuments);
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };
  
  
  

  const handleEdit = (user) => {
    navigate(`/products/editProduct/${user._id}`);
  };
  

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (image) => (
        <img 
          src={image} 
          alt="Product" 
          style={{ width: '60px', height: '70px', borderRadius: '4px' }} 
        />
      ),  
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`, // Format price
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <button 
          onClick={() => handleEdit(record)} 
          style={{ padding: '5px 10px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Edit
        </button>
      ),
    },

   {
  title: 'Delete',
  key: 'delete',
  render: (_, record) => {
    return (
      <button
        onClick={() => handleDelete(record._id)} // Use `_id` instead of `key`
        style={{
          padding: '5px 10px',
          backgroundColor: '#ff4d4f',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    );
  },
},

  ];
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h2 className='text-center my-3'>Product List</h2>
      <div className="table-responsive">
      <Table
        columns={columns}
        dataSource={documents.map((doc) => ({ ...doc, key: doc._id }))}
        loading={loading}
        bordered
        pagination={{ pageSize: 4 }}
      />
      </div>
    </div>
  );
}
