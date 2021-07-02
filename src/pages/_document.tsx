import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.ico`} />
          <meta name="theme-color" content="#ff0000" />
          <meta name="description" content="Web site created using create-react-app" />
          <link rel="apple-touch-icon" href={`${process.env.PUBLIC_URL}/apple-touch-icon.png`} />
          <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>
        
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument      
