import Layout from "../app/layout/test";
import Link from "next/link";
/**
 * Questa è una pagina che va a creare altre pagine in modo dinamico
 * es. caso di generazione di una pagina per articolo, con questo modo è possibile generarla tramita
 * una querystring quindi tramite URL, questoè solo per la prima call, in caso di call in altri
 * articoli allora la renderizzazione sarebbe su client quindi ci sarebbe solo il fetch data.FIGO
 * as={`/p/${props.id}`} serve per avere una query string => URL pulita, ma questo implica una gestione
 * o meglio mappatura dell'Url parte server, in quanto funziona se si fa la call dalla pagina di origine
 * ma non se vi si accede tramite url, questo perche questo è solo un modo per MASCHERARE la query string
 *
 */
const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="home" title="Hello Next.js" />
        <PostLink id="learn" title="Learn Next.js is awesome" />
        <PostLink id="ec" title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
}
