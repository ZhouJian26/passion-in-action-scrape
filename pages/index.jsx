/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */

//import "../sass/main.scss";
import Head from "next/head";
import React from "react";
import Layout from "../app/layout/dracula";
import CourseListApp from "../app/indexComponents/courseListApp";
//import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Alternative Passion</title>
      <meta
        name="description"
        content="AlternativePassion un sito creato per puro hobby."
      />
    </Head>
    <Layout>
      <CourseListApp></CourseListApp>
    </Layout>
  </React.Fragment>
);
export default Index;
