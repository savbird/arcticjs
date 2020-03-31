import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import {produce} from 'immer' //import

/** The context provider for our app */
export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            getCartTotal: this.getCartTotal,
            clearCart: this.clearCart,
        }
        this.state = { 
            categories: [],
            products: [],
            cart: {}, //product id mapped to quantity
            totalQty: 0,
        }
    }


    render() {
        if (!this.state){
            return(<div>Loading...</div>)
        } else {
            //console.log(this.state.categories)
            return (
                <AppContext.Provider  value={{...this.state, ...this.actions}}>
                    <App />
                </AppContext.Provider>
            )
        }
        
    }


    clearCart = () => {
        this.setState(state => produce(state, draft => {
            Object.entries(draft.cart).forEach(([pid, qty]) => {
                this.removeFromCart(pid)
            } )
        }))
        return this.cart
    }

    getCartTotal = () => {
        let cartTotal = 0.0

        Object.entries(this.state.cart).forEach(([pid, qty]) =>{
            const item = this.state.products.find(p => p.id === parseInt(pid));
            cartTotal += parseFloat(item.price)*parseFloat(qty)
        })
        
        return cartTotal
    }

    addToCart = (pid) => {
        //get current quantity
        //set new cart
        //const qty = this.state.cart[pid] //can do this bc youre reading the value
        //have to use this.setState() to set the new state +1
        this.setState(state => produce(state, draft => {
            if(!draft.cart[pid]) {
                draft.cart[pid] = 1
                draft.totalQty++
            } else {
                let qty = draft.cart[pid]
                draft.cart[pid] = qty + 1
                draft.totalQty++
            }
            
        }))
        //console.log(this.cart)
    }

    removeFromCart = (pid) => {
        this.setState(state => produce(state, draft => {
            let qty = draft.cart[pid]
            delete draft.cart[pid]
            draft.totalQty = draft.totalQty - qty
        }))
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/category/')
        //console.log(resp.data)

        const resp2 = await axios.get('http://localhost:8000/api/product/')
        //console.log(resp2.data)

        this.setState({
            ...this.state, 
            categories: resp.data.map(cat => ({
                ...cat,
                count: resp2.data.filter(prod => prod.category.title === cat.title).length
            })), 
            products: resp2.data})
        //console.log(this.state.categories)
    }

}