import Layout from "../app/layout/test";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import "../sass/main.scss";
/**
 * Questa è una pagina che prende dati da API,
 * passa come parametro la roba presa come dati al componente come props
 */
const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p2/${show.id}`} href={`/post2?id=${show.id}&value=10`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
