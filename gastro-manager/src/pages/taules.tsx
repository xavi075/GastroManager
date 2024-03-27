import React from 'react';
import Layout from '../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Taules: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Taules en servei</h2>
        <div className="grid gap-4 sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 1</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 2</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 3</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 4</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 5</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 6</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 7</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 8</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 9</h3>
          </article>
          <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
            <h3>Taula 10</h3>
          </article>
        </div>
        <div className="mt-10 flex justify-center md:justify-end lg:justify-end">
          <button className="border-1 border-solid border-black border-md rounded-lg items-center bg-brown-800 text-brown-100 font-bold py-2 px-4 m-5 transition-colors duration-200 ease-in-out hover:bg-brown-700 hover:text-white">
            <FontAwesomeIcon icon={faPlus} className="m-3" />
          </button>
          <button className="border-1 border-solid border-black border-md rounded-lg items-center bg-blood_red-800 text-brown-100 font-bold py-2 px-4 m-5 transition-colors duration-200 ease-in-out hover:bg-blood_red-700 hover:text-white">
            <FontAwesomeIcon icon={faMinus} className="m-3" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Taules;
