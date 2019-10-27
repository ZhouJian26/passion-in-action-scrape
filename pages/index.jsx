/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */

import "../sass/main.scss";
import React from "react";
import Layout from "../app/layout/dracula";
import CourseListApp from "../app/indexComponents/courseListApp";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => (
  <Layout>
    <CourseListApp></CourseListApp>
  </Layout>
);
export default Index;
