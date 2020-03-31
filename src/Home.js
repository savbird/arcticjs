import React, {useContext} from 'react';
import './App.scss';
import ProductCard from './product-card'
import {
  useRouteMatch
} from "react-router-dom";
import {Container} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import AppContext from './context'

function Home() {
  let match = useRouteMatch()
  let c = match.params.name
  let context = useContext(AppContext)
  
  if (c == null) {
    return(
      <Container>
          <Row>
                {context.products.map(n => {
                  return (
                    <ProductCard product={n.id} key={n.id}/>
                  )
              })}
          </Row>
      </Container>
    )
  } else {
    return(
      <Container>
          <Row>
                {context.products.map(n => {
                  if (n.category.title === c){
                    return (
                      <ProductCard product={n.id} key={n.id}/>
                    )
                  } else {
                    return (null)
                  }
              })}
          </Row>
      </Container>
    )
  }
}

export default Home; 

