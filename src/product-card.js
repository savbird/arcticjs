import React, {useContext} from 'react'
import {Card} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {
    Link,
  } from "react-router-dom"
import AppContext from './context'
  

function ProductCard(props) {
    let item = {}
    let context = useContext(AppContext)
    for (const p of context.products){
        if (p.id === props.product) {
            item = p
            break
        }
    }
    return (
        <Col md='3'>
            <Card md="3" className='mb-3' style={{ width: '12rem' }}>
            <Link to={"/product/" + item.id} className='float-right'style={{ position:'absolute', right:0}}><Button style={{ margin:'0.25rem'}}variant='secondary'>Details</Button></Link>
            <Card.Img variant="top" src={"/products/" + item.filename + "-1.png"}/>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{'$' + item.price}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        )
  }


export default ProductCard