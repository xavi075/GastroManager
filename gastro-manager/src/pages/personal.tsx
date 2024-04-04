import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Personal: React.FC = () => {
  const [usuaris, setUsuaris] = useState<{ nom: string; cognom: string; rol: string; correu: string }[]>([
    { nom: 'John', cognom: 'Doe', rol: 'Developer', correu: 'john.doe@example.com' },
    { nom: 'Jane', cognom: 'Smith', rol: 'Designer', correu: 'jane.smith@example.com' },
    { nom: 'Alice', cognom: 'Johnson', rol: 'Manager', correu: 'alice.johnon@example.com' },
    { nom: 'Bob', cognom: 'Williams', rol: 'Analyst', correu: 'bob.williams@example.com' },
    { nom: 'Chris', cognom: 'Brown', rol: 'Tester', correu: 'chris.brown@example.com' },
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

  const eliminarUsuari = () => {
    if (usuaris.length > 0) {
      const nousUsuaris = usuaris.slice(0, -1);
      setUsuaris(nousUsuaris);
    }
  };

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Personal</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {usuaris.map((usuari, index) => (
            <div key={index} className="border-1 border-solid border-black border-md rounded-lg p-5 bg-vanilla text-center transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
              <h2 className="text-2xl font-bold text-center mb-3">{usuari.nom} {usuari.cognom}</h2>
              <div className="text-left">
                <p><strong>Rol:</strong> {usuari.rol}</p>
                <p><strong>Correu:</strong> {usuari.correu}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <button onClick={afegirUsuari} className="flex items-center bg-brown-800 text-brown-100 font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-brown-700 hover:text-white">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Afegir Usuari
          </button>
          <button onClick={eliminarUsuari} className="flex items-center bg-blood_red-800 text-brown-100 font-bold py-2 px-4 ml-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-blood_red-700 hover:text-white">
            <FontAwesomeIcon icon={faMinus} className="mr-2" />
            Eliminar Usuari
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Personal;