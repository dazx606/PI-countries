import { Route } from "react-router-dom";
import React from "react"
import Home from "../pages/Home.js";

export default function Routes(){
    return(
        <>
            <Route exact path="/home" component={Home}/>
        </>
    )
}