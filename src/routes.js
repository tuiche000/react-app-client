// import React from 'react'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import Rules from "./pages/rules"
// import NotFound from './pages/NotFound'

export default [
    { path: '/', component: Homepage },
    { path: '/starProducts', component: StarProducts, notLayout: true },
    { path: '/bonus', component: Bonus, notLayout: true },
    { path: '/details', component: Details, notLayout: true },
    { path: '/lachineProduct', component: LachineProduct, notLayout: true },
    { path: '/rules', component: Rules },
]