import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'

const ProductItem = ({product}) => {
  return (

    <Col xs={3} className='mb-3'>
    <Card>
        <Card.Img src={`/src/assets/${product.image}`} height='200px'  variant="top"/>
        <Card.Body>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
        </Card.Body>
    </Card>
</Col>
  )
}

export default ProductItem
