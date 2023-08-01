import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Sorter } from "js_example";
import * as React from "react";

export default function Home() {
  let client1 = [3, 2, 1];
  let server1 = [9, 8, 7];
  let client2 = ['c', 'b', 'a'];
  let server2 = ['z', 'y', 'x'];

  // client-side
  React.useEffect(() => {
    Sorter.initialize().then((sorter) => {
      let cres1 = sorter.quicksort(client1);
      alert(`Quick sorted array: ${JSON.stringify(cres1)}`);
      let cres2 = sorter.mergesort(client2);
      alert(`Merge sorted array: ${JSON.stringify(cres2)}`);
    });
  }, []);

  // Server-side:
  // This required fetching it remotely to work, for some reason.
  // Otherwise, it complained of "not found"
  let wasmUrl = "https://cdn.jsdelivr.net/npm/wasm_quicksort_example@0.0.2/dist/wasm_quicksort_example_bg.wasm";
  Sorter.initialize({wasm: wasmUrl}).then((sorter) => {
    let sres1 = sorter.quicksort(server1);
    console.log(`Quick sorted array: ${JSON.stringify(sres1)}`);
    let sres2 = sorter.mergesort(server2);
    console.log(`Merge sorted array: ${JSON.stringify(sres2)}`);
  });


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
