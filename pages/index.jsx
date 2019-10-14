/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */
//import "../sass/main.scss";

import React from 'react'
import Layout from "../app/layout/dracula"
//import CourseList from "../app/indexComponents/courseList"

const Index = () => (
  <Layout>
    <p>Hello Next.js</p>
  </Layout>
);
export default Index;
