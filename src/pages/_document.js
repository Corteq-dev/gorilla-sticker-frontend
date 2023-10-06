import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="light">
      <Head>
        <meta name="author" content="Template" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Description template" />
        <link rel="canonical" href="/" />
        <link rel="alternate" href="/" hrefLang="en" />
        <meta name="theme-color" content="#121212" />
        <link rel="apple-touch-icon" href="favicon.ico"></link>

        <meta property="og:title" content="Corteq" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Description template" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
