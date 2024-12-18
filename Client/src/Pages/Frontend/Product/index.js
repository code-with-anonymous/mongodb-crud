import React from 'react'
import AddProduct from './Addproduct'
import ProductTable from './Table'

export default function ProductIndex() {
  return (
    <div style={{background:" #f8f9fa"}}>
     <AddProduct/>
     <ProductTable/>
    </div>
  )
}
