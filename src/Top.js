import React, {useContext} from 'react';
import AppContext from './context'

import {Navbar}  from 'react-bootstrap'
import {Row}  from 'react-bootstrap'
import {Col}  from 'react-bootstrap'
import {Nav}  from 'react-bootstrap'
import {Dropdown}  from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";



function Top() {
    let context = useContext(AppContext)
    return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">
                <img
                    alt="NW Labs"
                    src='/narwhal.png'
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Arctic.com
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Row>
                            <Col>
                                <Link to="/">Home</Link>
                            </Col>
                            <Col>
                                <Link to="/about">About</Link>
                            </Col>
                            <Col>
                                <Link to="/help">Help</Link>
                            </Col>
                            <Col>
                                <Link to="/cart"><i className="fas fa-shopping-cart"> {context.totalQty}</i></Link>
                            </Col>
                        </Row>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Signed in as: Savannah
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Navbar.Collapse>
            </Navbar>

    )
}

export default Top