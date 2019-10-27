/**
 * Questo è il layout versione 1.0.0
 * devo importare la navbar e il footer qui
 */
import React from "react";
import Head from "next/head";
import Navbar_c from "./components/navbar";
import Footer from "./components/footer";
const Layout = props => (
  <React.Fragment>
    <Head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </Head>
    <Navbar_c></Navbar_c>
    {props.children}
    <Footer></Footer>
  </React.Fragment>
);
export default Layout;
