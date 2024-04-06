import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Personal: React.FC = () => {
  const [usuaris, setUsuaris] = useState<{ nom: string; cognom: string; rol: string; correu: string }[]>([
    { nom: 'Ferran', cognom: 'Casanovas', rol: 'Cuiner', correu: 'ferran@gmail.com' },
    { nom: 'Xavier', cognom: 'Massana', rol: 'Manager', correu: 'xavier@gmail.com' },
    { nom: 'Arnau', cognom: 'Parcerisa', rol: 'Cambrer', correu: 'arnau@gmail.com' },
    { nom: 'Queralt', cognom: 'del Águila', rol: 'Cambrer', correu: 'queralt@gmail.com' },
  ]);

  const afegirUsuari = () => {
    const nouUsuari = {
      nom: `Nom`,
      cognom: 'Cognom',
      rol: 'Rol',
      correu: 'correu@example.com',
    };
    setUsuaris([...usuaris, nouUsuari]);
  };

  const eliminarUsuari = (index: number) => {
    const nousUsuaris = [...usuaris];
    nousUsuaris.splice(index, 1);
    setUsuaris(nousUsuaris);
  };

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Llistat de Personal</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {usuaris.map((usuari, index) => (
            <div key={index} className="border-1 border-solid border-black border-md rounded-lg bg-vanilla text-center transition-colors duration-200 ease-in-out relative">
              <div className="grid grid-cols-1">
                <div className="p-3 overflow-hidden">
                  <h2 className="text-xl font-bold text-center">{usuari.nom} {usuari.cognom}</h2>
                </div>
                <div className="p-3 overflow-hidden">
                  <div className="text-left">
                    <p><strong>Rol:</strong> {usuari.rol}</p>
                    <p><strong>Correu:</strong> {usuari.correu}</p>
                  </div>
                </div>
                <div className="p-3 flex justify-center">
                  <button onClick={() => eliminarUsuari(index)} className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-1 px-2 rounded text-sm">
                    <FontAwesomeIcon icon={faMinus}/> Eliminar Usuari
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <button onClick={afegirUsuari} className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded">
            Afegir Usuari <FontAwesomeIcon icon={faPlus}/>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Personal;

