/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */
import "../sass/main.scss";
import Layout from "../app/layout/test";
const Index = () => (
  <div>
    <Layout>
      <p>Hello Next.js</p>
    </Layout>
  </div>
);

export default Index;
