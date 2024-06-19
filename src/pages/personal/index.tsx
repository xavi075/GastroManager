import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'; // Importem useRouter per gestionar la navegació
import { IUsuari } from '@/utils/interfaces';
import { getPersonal, deleteUsuari } from '@/utils/api';


const Personal: React.FC = () => {
  const router = useRouter(); // Inicialitzem useRouter

  const idRestaurant: number = 1;
  const [usuaris, setUsuaris] = useState<IUsuari[]>([]);
  const [actualitzarUsuaris, setActualitzarUsuaris] = useState(false);

  const afegirUsuari = () => {
     router.push('/AfegirUsuari');
  };

  const eliminarUsuari = (id: number) => {
    console.log(id)
    deleteUsuari(id)
      .then(() => {
        setActualitzarUsuaris(true)
      })
      .catch((error) => console.error('Error when delete usuari:', error));
  }

  useEffect(() => {
    if(idRestaurant || actualitzarUsuaris) {
      getPersonal(idRestaurant)
      .then(response => {
        setUsuaris(response)
        setActualitzarUsuaris(false)
      })
      .catch((error) => {
        console.error('Error when get usuaris: ', error);
      });
    }
  }, [idRestaurant, actualitzarUsuaris])

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Llistat de Personal</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {usuaris.map((usuari, index) => (
            <div key={index} className="border-1 border-solid border-black border-md rounded-lg bg-vanilla text-center transition-colors duration-200 ease-in-out relative">
              <div className="grid grid-cols-1">
                <div className="p-3 overflow-hidden">
                  <h2 className="text-xl font-bold text-center">{usuari.nom}</h2>
                </div>
                <div className="p-3 overflow-hidden">
                  <div className="text-left">
                    <p><strong>Rol:</strong> {usuari.rol.nomRol}</p>
                    <p><strong>Email:</strong> {usuari.email}</p>
                  </div>
                </div>
                {usuari.rol.nomRol != 'Administrador' && (
                  <div className="p-3 flex justify-center">
                  <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-1 px-2 rounded text-sm" onClick={() => eliminarUsuari(usuari.id)}>
                    Eliminar Usuari <FontAwesomeIcon icon={faMinus}/>
                  </button>
                </div>
                )}
                
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
