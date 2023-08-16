import { Route } from "react-router-dom";
import React from "react"
import Home from "../pages/Home.js";
import Countries from "../pages/Countries.js";

export default function Routes(){
    return(
        <>
            <Route exact path="/" component={Home}/>
            <Route path="/countries" component={Countries}/>
        </>
    )
}