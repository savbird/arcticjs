import React from 'react';
import { Row } from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import './App.scss';
import Top from './Top'
import Left from './Left'
import Center from './Center'
import Right from './Right'
import Bottom from './Bottom'
import {
  BrowserRouter as Router
} from "react-router-dom";


function App() {
  return(
      <Router>
        
        <Container fluid="true" className='p-0 min-vh-100 d-flex flex-column' >
        <Row className=' flex-grow-0 flex-shrink-0 shadow-sm' noGutters>
          <Col fluid="true" >
            <Top />
          </Col>
        </Row>
          <Row noGutters className='flex-grow-1'>
            <Col md="2" className='px-3 py-2 shadow' style={{backgoundColor:'#b3b3ff'}}>
              <Left />
            </Col>
            <Col md="8"  className='px-3 py-2 '>
              <Center />
            </Col>
            <Col md="2"  className='px-3 py-2 shadow' style={{backgoundColor:'#b3b3ff'}}>
              <Right />
            </Col>
          </Row>
          <Row noGutters className='flex-grow-1 py-2 shadow' style={{position:'relative', bottom:0}}>
            <Col fluid="true">
              <Bottom />
            </Col>
          </Row>
        </Container>
          
      </Router>     
    )

}

export default App;
