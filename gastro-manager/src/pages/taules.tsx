import React from "react";
import Layout from "../components/Layout/Layout";

const Taules: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl">Taules</h2>
        <div className="grid gap-4 sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <article className="border-1 border-solid border-black border-md p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 1</h3>
          </article>
          <article className="border-1 border-solid border-black border-md p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 2</h3>
          </article>
          <article className="border-1 border-solid border-black border-md p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 3</h3>
          </article>
          <article className="border-1 border-solid border-black border-md p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 4</h3>
          </article>
          <article className="border-1 border-solid border-black border-md p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 5</h3>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default Taules;
