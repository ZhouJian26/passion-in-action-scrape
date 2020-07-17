/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */

import Head from "next/head";
import React from "react";
import Layout from "../components/layout/dracula";
import CourseListApp from "../components/index/courseListApp";

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
