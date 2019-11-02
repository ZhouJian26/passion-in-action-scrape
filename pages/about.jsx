import Head from "next/head";
import React from "react";
import Layout from "../app/layout/dracula";
import AboutApp from "../app/aboutApp/aboutApp";

const Index = () => (
  <React.Fragment>
    <Head>
      <title>About - Alternative Passion</title>
      <meta
        name="description"
        content="Descrizione progetto AlternativePassion"
      />
    </Head>
    <Layout>
      <AboutApp></AboutApp>
    </Layout>
  </React.Fragment>
);
export default Index;
