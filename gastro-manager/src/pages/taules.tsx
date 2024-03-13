import React from 'react';
import Layout from '../components/layout';

const Taules: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col">
        <h2 className="text-xl">Taules</h2>
        <article className="border-1 border-solid border-black border-md p-2.5 mb-4 flex flex-col bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
          <h3>Taula 1</h3>
        </article>
        <article className="border-1 border-solid border-black border-md p-2.5 mb-4 flex flex-col bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
          <h3>Taula 2</h3>
        </article>
        <article className="border-1 border-solid border-black border-md p-2.5 mb-4 flex flex-col bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
          <h3>Taula 3</h3>
        </article>
      </section>
    </Layout>
  );
};

export default Taules;
