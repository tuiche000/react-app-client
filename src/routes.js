// import React from 'react'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import Rules from "./pages/rules"
import Entrance from './pages/entrance'

export default [
    { path: '/', component: Entrance ,notLayout: true},
    { path: '/homepage', component: Homepage },
    { path: '/starProducts', component: StarProducts, },
    { path: '/bonus', component: Bonus, notLayout: true },
    { path: '/details', component: Details, notLayout: true },
    { path: '/lachineProduct', component: LachineProduct, notLayout: true },
    { path: '/rules', component: Rules },
]