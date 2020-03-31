import React from 'react';
import {
    Switch,
    Route,    
} from "react-router-dom";
import About from './About'
import Help from './Help'
import Home from './Home'
import Cart from './cart'
import ProductDetails from './product-detail'
import Checkout from './checkout'
import Thanks from './thanks'


function Center() {
    
    return (
        
            <Switch>
                <Route path="/product/:id">
                    <ProductDetails />
                </Route>
                <Route path="/category/:name">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/help">
                    <Help />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/checkout">
                    <Checkout />
                </Route>
                <Route path="/receipt">
                    <Thanks />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
    )
}

export default Center