import React, {useContext} from 'react';
import AppContext from './context'

function CartIcon() {
    let context = useContext(AppContext)
    console.log(context)
    let returnItems = toString(context.totalQty) + '<i class="fas fa-shopping-cart"></i>'
    return (
        returnItems
    )
    
}

export default CartIcon