import React, {  useContext } from 'react'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import AppContext from './context'

export default function CartItem(props) {
    let context = useContext(AppContext)
    const item = context.products.find(p => p.id === parseInt(props.product));
    // for (const p of context.products){
    //     if (p.id === props.product) {
    //         item = p
    //         break
    //     }
    // }



    return(
        <Row>
            <Col md="2"><img alt='product' src={"/products/" + item.filename + "-1.png"} style={{width:'100px', height:'100px'}}/></Col>
            <Col md="2">{item.name}</Col>
            <Col md="2">{context.cart[item.id]}</Col>
            <Col md="2">{item.price}</Col>
            <Col md="2">{item.price*context.cart[item.id]}</Col>
            <Col md="2"><Button onClick={e=>{context.removeFromCart(item.id)}}>Remove</Button></Col>
        </Row>
    )
}
