import Head from "next/head";

const Layout = ({children, title, description, responsive = false, canonical}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {responsive
          ? <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          : <meta name="viewport" content="width=1024, initial-scale=0.3" />
        }
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        { canonical ? <link rel="canonical" href={canonical} /> : null}
      </Head>

      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
