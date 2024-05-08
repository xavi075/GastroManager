import React,  { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { response } from 'express';
import { useUser } from '@nextui-org/react';
import { getTaules, addTaula, deleteTaula } from "../../utils/api";
import { ITaula } from '@/utils/interfaces';
import { error } from 'console';

const Taules: React.FC = () => {
  const [taules, setTaules] = useState<ITaula[]>([]);

  useEffect(() => {
    getTaules("1")
    .then(response => {
        setTaules(response);
    })
    .catch((error) => {
      console.error('Error when get taules: ', error);
    });
  }, [])
  

  //Event per afegir taules
  const handleAfegirTaula = () => { 
    addTaula(1, taules.length + 1)
    .then(response => {
      setTaules(prevTaules => [...prevTaules, { id: response.id, idRestaurant: response.idRestaurant, numTaula: response.numTaula }]);
    })
    .catch((error) => {
      console.error('Error when add taules: ', error);
    });
  };

  //Event per eliminar taules
  const handleEliminarTaula = () => {
    if(taules.length > 0){
      deleteTaula(1, taules.length)
      .then(response => {
        setTaules(prevTaules => prevTaules.slice(0, -1)); // Elimina l'última taula de la llista
      })
      .catch((error) => {
        console.error('Error when delete taules: ', error);
      });
    }
  };

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Taules en servei</h2>
        <div className="grid gap-4 sm:grid-cols:1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {taules.map((taula) => (
            <Link href={`/comanda?idTaula=${taula.id}`} key={taula.id}>
              <article className="border-1 border-solid border-black border-md rounded-lg p-2.5 items-center bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
                <h3>Taula {taula.numTaula}</h3>
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
