import Layout from "../app/layout/test";
import fetch from "isomorphic-unfetch";
/**
 * Fa il fetch data particolare richiesto, di norma un post è vuoto ed viene chiamato in necessita
 * e andrebbe popolato, e qui vi è il codice per la popolazione in chiamata usata in fetchData.jsx
 */
const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, "")}</p>
    <img src={props.show.image.medium} />
  </Layout>
);
/**
 * contex è il descrittore della situazione dell'url ovvero si hanno i valori passati in query string
 * li posso ottenere in contex.query poi altri valori di poco conto
 */
Post.getInitialProps = async function(context) {
  console.log(context);
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
