// import React from 'react'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import Rules from "./pages/rules"
// import NotFound from './pages/NotFound'

export default [
    {path: '/', component: Homepage},
    {path: '/starProducts', component: StarProducts},
    {path: '/bonus', component: Bonus},
    {path: '/details', component: Details},
    {path: '/lachineProduct', component: LachineProduct},
    {path: '/rules', component: Rules},
]