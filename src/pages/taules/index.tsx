import React,  { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { response } from 'express';

const Taules: React.FC = () => {
  const [numTaules, setNumTaules] = useState(0); // Estat per emmagatzemar la quantitat de taules

  useEffect(() => {
    fetch('127.0.0.1:5000/taules', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      const numTaules = data.numTaules;
      setNumTaules(numTaules);
    })
    .catch(error => {
      console.error("Error al obtenir el nombre de taules:", error);
    })
  }, []);
  

  //Event per afegir taules
  const handleAfegirTaula = () => { 
    setNumTaules(numTaules + 1);
    fetch('127.0.0.1:5000/taules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idRestaurant: 1,
        numTaula: numTaules,
        afegir: true,
      })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error("Error al afegir taula:", error);
    })
  };

  //Event per eliminar taules
  const handleEliminarTaula = () => {
    if (numTaules > 0) {
      setNumTaules(numTaules - 1);
    }
    fetch('127.0.0.1:5000/taules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idRestaurant: 1,
        numTaula: numTaules,
        afegir: false,
      })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error("Error al eliminar taula:", error);
    })
  };

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Taules en servei</h2>
        <div className="grid gap-4 sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {[...Array(numTaules)].map((_, index) => (
            <Link href={"/comandes?taula=" + (index + 1)} key={index}>
              <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
                <h3>Taula {index + 1}</h3>
              </article>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button onClick={handleAfegirTaula} className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Afegir taula <FontAwesomeIcon icon={faPlus}/>
          </button>
          <button onClick={handleEliminarTaula} className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Eliminar taula <FontAwesomeIcon icon={faMinus}/>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Taules;
