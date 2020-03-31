import React, { useState, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import AppContext from './context'



function ProductDetails() {
    let {id} = useParams()
    
    let context = useContext(AppContext)
    const p = context.products.find(item => item.id === parseInt(id));
    
    let history = useHistory();

    const [num, setImg] = useState('-1');
    
    
    if (!p) {
        return (<div>Item not found.</div>)
    } else {
        return (
            <div>
                <Row>
                    <Col>
                        <h1>{p.name}</h1>
                        <h3>{'$' + p.price}</h3>
                        <p>{p.description}</p>
                    </Col>
                    <Col>
                        <img alt='product on display' src={"/products/" + p.filename + num + ".png"} style={{width:'300px', height:'300px'}}/><br/>
                        <img onMouseEnter={() => setImg('-1')} alt='product' className='mr-1 mt-1'style={{width:'30px', height:'30px'}} src={"/products/" + p.filename + "-1.png"} />
                        <img onMouseEnter={() => setImg('-2')} alt='black and white product' className='mr-1 mt-1' style={{width:'30px', height:'30px'}} src={"/products/" + p.filename + "-2.png"} />
                        <img onMouseEnter={() => setImg('-3')} alt='cartoon product 'className='mr-1 mt-1' style={{width:'30px', height:'30px'}} src={"/products/" + p.filename + "-3.png"} />
                        <img onMouseEnter={() => setImg('-4')} alt='inverted product' className='mr-1 mt-1' style={{width:'30px', height:'30px'}} src={"/products/" + p.filename + "-4.png"} />
                    </Col>
                </Row>
                <Row className='m-1'>
                    <Button onClick={e=>{
                        context.addToCart(p.id)
                        history.push("/cart")
                        }}>Purchase</Button>
                </Row>
            </div>
        )
        
    }
    
}



export default ProductDetails