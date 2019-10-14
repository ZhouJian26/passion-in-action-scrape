/**
 * Questo è il layout versione 1.0.0
 * devo importare la navbar e il footer qui
 */
import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
const Layout = props => (
    <React.Fragment>
        <Navbar></Navbar>
        {props.children}
        <Footer></Footer>
    </React.Fragment>
);
export default Layout;