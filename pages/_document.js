import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  injectSW() {
    return {
      __html: `
          if ('serviceWorker' in navigator)
          {window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js",{scope: '/'});
          })}
        `
    };
  }
  render() {
    return (
      <Html lang="it">
        <Head>
          <script dangerouslySetInnerHTML={this.injectSW()} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
