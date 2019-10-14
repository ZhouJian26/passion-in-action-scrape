# Next JS Template + NOW deploy or Static Export

# Configurare il nome del progetto su NOW deploy

Andare nel file **now.json** e cambiare campo nome

# Comandi npm run:

- `dev-undinamic`, per lanciare in **dev mode** un server di nextjs per una app **non dotata** di link a pagine con il **clear dell'url**
- `dev-dinaminc`, per lanciare in dev mode un server di nextjs per una app **dotata** di link a pagine con il **clear dell'url**
- `start-undinamic`,per lanciare in **prod mode** un server di nextjs per una app **non dotata** di link a pagine con il **clear dell'url**
- `start-dinamic`, per lanciare in **prod mode** un server di nextjs per una app **dotata** di link a pagine con il **clear dell'url**
- `build`, per creare la build dell'app
- `build-deploy`, per creare una build in **./out** per il deploy in **modalità statico**, non ho delle processazioni da parte del server a meno della mappatura URL. **NOTA** ogni indirizzo/sottopagina il cui url è dinamico va mappato singolarmente con una funzione che crea del varie exportPathMap nel file next.config.js, le pagine singole vanno anch'esse mappare perchè non sarebbero raggiungibili dall'url ma solo dai link tra pagine.
- `now dev`, per lanciare una simulazione del deploy
- `now`, per deploytare l'app su ZEIT

## NOTA per npm run start-dinamic/undinamic

Bisogna fare prima la built quindi

```
    > npm run build
    e poi uno dei comandi
    > npm run start-***
```

La differenza è solo che una usa un codice server per fare l'host mentre l'altra è integrata in nextjs

# CASO DEPLOY SITO CON URL-CLEARED

Basta fare il setup nel now.json del routing

## Directory

- `STATIC` è la cartella dove metto la roba statica da cui poi chiamo dai vari file (es. immagini);
- `PAGES` è la cartella dove metto le varie pagine del sito;
- `SASS` è la cartella dove metto il codice sass;
- `APP` è la cartella dove metto i componenti e layout
- `BACKEND` è la cartella dove metto codice server(di processazione dati)

## API

### NextJS

- **Iniettare codice nell'head** di una pagina (utile per la description e il title)

```javascript
import Head from "next/head";
const Index = () => (
  <div>
    <Head>
      <title>HomePage</title>
    </Head>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
```

- Collegamento con altre pagine della piattaforma, una sorta di **Lazy Load**  
  **Nota funzionamento link server e client fetch** se vi si accede alla pagina dal sito quindi tramite utilizzo del link, le chiamate di data fetch si fanno in cliente, mentre se si accede direttamente con l'url dalla barra di ricerca il fetch si fa a lato server.  
  **Nota importante:** affinchè l'API Link abbia effetto il componente all'interno deve supportare l'evento onClick.

```javascript
import Link from "next/link";
const Index = () => (
  <div>
    <Link href="/components/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
```

- **Pagine Dinamiche** (es. card wabsite)  
  si fa utilizzo dell'API withRouter che permette di prendere i dati dall'url generato per andare in questa pagina, che viene creata in modo dinamico nel client con il js.

```javascript
// esempio codice della card website
import { withRouter } from "next/router";
import Layout from "../src/components/MyLayout.js";
const Content = withRouter(props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
));

const Page = props => (
  <Layout>
    <Content />
  </Layout>
);

export default Page;
```

```javascript
// esempio codice del blog da cui vuole accedere a queste card website
import Layout from "../src/components/MyLayout.js";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
}
```

- **Clear URL**  
  si fa la solita query string url ma prima si usa un **as** per mascherare il vero url in modo di averlo più pulito  
  **Nota importante:** l'url così generato se viene usato direttamente per accedere al sito da errore 404, in quanto è solo un fake url

```javascript
<Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
  <a>{props.title}</a>
</Link>
```

### ReactJS & NextJS

- **Layout** es. card o navbar ...

```javascript
// components/MyLayout.js

import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.content}
  </div>
);

export default Layout;
```

```javascript
// pages/index.js

import Layout from "../components/MyLayout.js";

const indexPageContent = <p>Hello Next.js</p>;

export default function Index() {
  return <Layout content={indexPageContent} />;
}
```

### Fetch Data

**getInitialProps** viene lanciato inizialmente sul server, se facciamo reload della pagina da client, mentre viene lanciata dal client in modo forzato se ri-accediamo alla pagina tramite link o indietro o avanti. E' un modo per fare un get di dati da server :).

```javascript
import Layout from "../src/components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
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
```

## Usage on Inline Image Injection

### In un componente o in una pagina

Il path fa riferimento dal componente/pagina al fine da importare e non più rispetto alla dist della build

- Modo 1

```html
export default () =>
<div>
  <img src={require('./my-image.jpg')} />
</div>
```

- Modo 2

```html
export default () =>
<div>
  <img src={require('./my-image.jpg')} />
</div>
```
