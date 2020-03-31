import React, {  useContext }  from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import { Container, Col, Row, Card, Spinner, Button} from 'react-bootstrap' 
import Axios from 'axios'
import { Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppContext from './context'
import {useHistory} from "react-router-dom";

const stripePromise = loadStripe('pk_test_JxecGeMBD3CGZPu0fCLGBHze00ftmgsS1t')


function Checkout(props) {
    // we'll add Stripe's Elements component here later
    return (
        <Elements stripe={stripePromise}>
            <CheckoutController />
        </Elements>
    )
}
export default Checkout


const CheckoutController = props => {
    let context = useContext(AppContext)
    let history = useHistory()
    const total = context.getCartTotal()
    const stripe = useStripe()
    const elements = useElements();
    let stripeError = ''
    
    return (
        <Formik
            initialValues={{
                name: 'Conrad Fox',
                address1: '1234',
                address2: '5678',
                city: 'Provo',
                state: 'UT',
                zipcode: '84606',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if (!values.name) {
                    errors.name = 'You must enter a name'
                } 
                else if (!values.address1) {
                    errors.address1 = 'You must enter an address'
                }
                else if (!values.city) {
                    errors.city = 'You must enter a city'
                }
                else if (!values.state) {
                    errors.state = 'You must enter a state'
                }
                else if (!values.zipcode) {
                    errors.zipcode = 'You must enter a zipcode'
                }
                return errors
            }}
            onSubmit={async (values, actions) => {
                // calls axios.post returns client secret
                let resp = ''

                try {
                    resp = await Axios.post('http://localhost:8000/api/sale/', {
                        name: values.name, address1: values.address1, address2: values.address2, city: values.city, state: values.state, zipcode: values.zipcode, items: context.cart, total: context.getCartTotal()
                    })
                } catch(err) {
                    console.log(err)
                    //set state w/ error?
                }
                
                // calls stripe.confirmCardPayment
                const result = await stripe.confirmCardPayment(resp.data.payment_intent.client_secret, {
                    payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: values.name,},
                    },
                })
                if (result.error) {
                    stripeError = result.error.message;
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        context.clearCart()
                        history.push('/receipt')
                    }
                  }
                  
                  

            }}
        >{form => (
            <PaymentForm form={form} total={total} con={context} err={stripeError}/>
        )}</Formik>
    )
}


/**
 * The form layout/html.
 * This component needs finishing.
 */
const PaymentForm = props => (
    <Form>
        <Container>
            <p>{props.err}</p>
            <h3>Checkout</h3><br/>
                <Row>
                    <Col md='6'> 
                        <Card>
                        <Card.Header className='text-left font-weight-bold'>Shipping Information</Card.Header>
                            <Card.Body>
                                        <Input title="Name:" name="name" type="text" />
                                        <Input title="Street Address:" name="address1" type="text" />
                                        <Input title="Apt #:" name="address2" type="text" />
                                        <Input title="City:" name="city" type="text" />
                                        <Input title="State:" name="state" type="text" />
                                        <Input title="Zipcode:" name="zipcode" type="text" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className='text-left font-weight-bold'>Payment</Card.Header>
                            <Card.Body>
                                    <CardElement />
                            </Card.Body>
                        </Card>
                        <br/>Your card will be charged ${props.total}<br/><br/>
                        <Button type="submit" className='w-50 btn-success' block size={'md'} disabled={props.form.isSubmitting} >
                            Purchase 
                            {props.form.isSubmitting && <Spinner animation='border' variant='light' size='sm'/>}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled = {rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)