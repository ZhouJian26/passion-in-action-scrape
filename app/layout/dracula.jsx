/**
 * Questo è il layout versione 1.0.0
 * devo importare la navbar e il footer qui
 */
import React from 'react'
import Navbar_c from './components/navbar'
import Footer from './components/footer'
const Layout = props => (
    <React.Fragment>
        <Navbar_c></Navbar_c>
        {props.children}
        <Footer></Footer>
    </React.Fragment>
);
export default Layout;