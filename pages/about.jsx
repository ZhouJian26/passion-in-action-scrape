/**
 * Questa pagina react condivide lo stesso template con quello di index
 * Ovviamente si possono fare template mixate, quindi uno generale e altri particolari
 */
import Layout from "../app/layout/test";
export default function About() {
  return (
    <div>
      <Layout>
        <p>This is the about page</p>
      </Layout>
    </div>
  );
}
