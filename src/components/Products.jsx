import React from 'react'
import ProductList from './ProductList'

const Products = () => {
    let products=[
        {id:101,name:"product1",price:2000,image:"images/a.jpg",stock:10},
        {id:102,name:"product2",price:5000,image:"images/b.jpg",stock:20},
        {id:103,name:"product3",price:8000,image:"images/chair.jpg",stock:1},
        {id:104,name:"product4",price:9000,image:"images/c.jpeg",stock:100},
        {id:105,name:"product5",price:2000,image:"images/d.jpg",stock:12},
        {id:106,name:"product6",price:1000,image:"images/chair5.jpg",stock:1}
    ]
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Products
