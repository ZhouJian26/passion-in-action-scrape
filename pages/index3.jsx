import Layout from "../app/layout/test3";

/**
 * Esempio altro modo per creare e usare layout
 */
const indexPageContent = <p>Hello Next.js</p>;

export default function Index() {
  return <Layout content={indexPageContent} />;
}
