// import Document, {Html, Head, Main, NextScript } from 'next/document';

// export default class CustomDocument extends Document {
//   static getInitialProps ({ renderPage }) {
//     const {
//       html,
//       head,
//       errorHtml,
//       chunks
//     } = renderPage();

//     return { html, head, errorHtml, chunks };
//   }

//   render() {
//     return (
//       <Html>
//         <Head>
//           <style dangerouslySetInnerHTML={{ __html: `
          
//             html, body {
//               padding: 0;
//               margin: 0;
//               height: 100%;
//             }
           
//           `}} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
import Document from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

