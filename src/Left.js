import React, { useContext } from 'react';
import {
    Link
  } from "react-router-dom";
import AppContext from './context'

function Left() {
    const context = useContext(AppContext)
    return (
        <div >
            <Link to="/">All Products (146)</Link><br />
            {context.categories.map(cat => {
              return (
                <Link key={cat.id} to={"/category/" + cat.title}>{cat.title} ({cat.count})<br/></Link>
              )
          })}
        </div>
    )
}


export default Left