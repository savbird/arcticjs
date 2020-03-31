import React, {useContext} from 'react'
import {Container, Row, Col, Button } from 'react-bootstrap'
import AppContext from './context'
import CartItem from './cartItem'
import {useHistory} from "react-router-dom"

function Cart() {
    let context = useContext(AppContext)
    let history = useHistory()
    return(
        <Container>
            <Row className='mb-3 font-weight-bold'>
                <Col md="4">Product</Col>
                <Col md="2">Quantity</Col>
                <Col md="2">Price</Col>
                <Col md="2">Total Price</Col>
                <Col md="2">Remove Items</Col>
            </Row>
            {Object.entries(context.cart).map(([pid, val]) =>{
                return (
                   <CartItem key={pid} product={pid}/>
                )
            })}
            <Button variant='success' onClick={e=>{
                        history.push("/checkout")
                        }}>Checkout</Button>
        </Container>
    )
} 

export default Cart