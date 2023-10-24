import React from 'react'
import classes from './App.module.css'

import { Navigation } from "./navigation/Navigation.js"
import { DispenseCommodity } from './dispenseCommodity/DispenseCommodity'
import { UpdateCommodity } from './updateCommodity/UpdateCommodity'
import { useState } from "react";


function MyApp() {
    const [activePage, setActivePage] = useState("Browse")
    function activePageHandler(page) {
        setActivePage(page);
    }

    return (
        <div className={classes.container}>
            <div className={classes.left}>
            <Navigation
                activePage={activePage}
                activePageHandler={activePageHandler}
            />
            </div>
            <div className={classes.right}>
                {activePage === "DispenseCommodity" && <DispenseCommodity />}
                {activePage === "UpdateCommodity" && <UpdateCommodity />}
            </div>
        </div>
    ); 
}

export default MyApp
