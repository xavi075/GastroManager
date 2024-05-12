import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faEuroSign, faSquarePlus, faSquareMinus, faFloppyDisk, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { IComanda, ILiniaComanda, ILiniaMenu } from '@/utils/interfaces';
import { getComanda, getLiniesComanda, getLiniesMenu, updateQtyLiniaComanda, deleteLiniaComanda, deleteLiniaMenu, updateComanda } from '@/utils/api';
import { get } from 'http';
import { response } from 'express';
import { Console, error } from 'console';

const comandaActual: React.FC = () => {
  const router = useRouter();
  const idTaula: string = router.asPath.split('=')[1];
  
  const [comanda, setComanda] = useState<IComanda[]>([]);
  const [comandaCarregada, setComandaCarregada] = useState(false);
  const [liniesModificades, setliniesModificades] = useState(false);
  const [liniesComanda, setLiniesComanda] = useState<ILiniaComanda[]>([]);
  const [liniesMenu, setLiniesMenu] = useState<ILiniaMenu[]>([]);

  // const [quantitatActual, setQuantitat] = useState([1,1,1,1]); // Estat per emmagatzemar la quantitat d'un plat

  const modificarQuantitat = (idLiniaComanda: number, novaQuantitat: number) => {
    if(idLiniaComanda && novaQuantitat){
      updateQtyLiniaComanda(idLiniaComanda, novaQuantitat)
      .then(response => {
        setliniesModificades(true);
      })
      .catch((error) => {
        console.error('Error when update qty linia comanda: ', error);
      });
    }
  };

  const eliminarLiniaComanda = (idLiniaComanda: number) => {
    if(idLiniaComanda){
      deleteLiniaComanda(idLiniaComanda)
      .then(response => {
        setliniesModificades(true);
      })
      .catch((error) => {
        console.error('Error when delete linia comanda: ', error);
      });
    }
  };

  const eliminarLiniaMenu = (idLiniaMenu: number) => {
    if(idLiniaMenu){
      deleteLiniaMenu(idLiniaMenu)
      .then(response => {
        setliniesModificades(true);
      })
      .catch((error) => {
        console.error('Error when delete linia menu: ', error);
      });
    }
  };

  const pagarComanda = (idComanda: number) => {
    if(idComanda){
      updateComanda(idComanda)
      .then(response => {
        setliniesModificades(true);
      })
      .catch((error) => {
        console.error('Error when update comanda: ', error);
      });
    }
  };

  useEffect(() => {
    if(idTaula){
      getComanda(String(idTaula))
      .then(response => {
        setComanda(response)
        setComandaCarregada(true);
      })
      .catch((error) => {
        console.error('Error when get comanda: ', error);
      });
    }
  }, [liniesModificades])

  useEffect(() => {
    if(comandaCarregada && comanda){
      getLiniesComanda(String(comanda[0].id))
      .then(response => {
        setLiniesComanda(response)
        setComandaCarregada(false)
        setliniesModificades(false)
      })
      .catch((error) => {
        console.error('Error when get linies comanda: ', error);
      });
    }
  }, [comandaCarregada, liniesModificades])

  useEffect(() => {
    if(comandaCarregada && comanda){
      getLiniesMenu(String(comanda[0].id))
      .then(response => {
        setLiniesMenu(response)
        setComandaCarregada(false)
      })
      .catch((error) => {
        console.error('Error when get linies menu: ', error);
      });
    }
  }, [comandaCarregada])

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Comanda activa de la taula {comanda[0]?.taula.numTaula}</h2>
          <div className="m-5 flex justify-center">
            <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
              Afegir plat <FontAwesomeIcon icon={faPlus}/>
            </button>
            <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
              Afegir menú <FontAwesomeIcon icon={faPlus}/>
            </button>
          </div>
          <section className="border-2 border-solid border-black border-md rounded-lg p-2.5 bg-vanilla-700 mb-8 overflow-x-auto">
            
            <h3 className="p-2 text-center font-semibold break-all">Comanda {comanda[0]?.id}</h3>

            {liniesComanda && liniesComanda.map((liniaComanda, index) => {
              return (
                <article key={liniaComanda.id} className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
                <article className="p-2 text-center col-span-1 md:col-span-3 break-all">{liniaComanda.plat.nom}</article>
                <article className="p-2 text-center col-span-1">
                  <button onClick={() => modificarQuantitat(liniaComanda.id, Number(liniaComanda.quantitat - 1))} className="quantity-modifier-btn mr-5">
                    <FontAwesomeIcon icon={faSquareMinus} style={{color: "red"}} size='xl'/>
                  </button>
                  {liniaComanda.quantitat}
                  <button onClick={() => modificarQuantitat(liniaComanda.id, Number(liniaComanda.quantitat + 1))} className="quantity-modifier-btn ml-5">
                    <FontAwesomeIcon icon={faSquarePlus} style={{color: "green"}} size='xl'/>
                  </button>
                </article>
                <article className="p-2 text-center col-span-1">{liniaComanda.preuTotal}€</article>
                <article className="p-2 text-center col-span-1">
                  <button onClick={() => eliminarLiniaComanda(liniaComanda.id)}>
                    <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                  </button>
                </article>
              </article>
              );
              })}

            {liniesMenu && liniesMenu.map((liniaMenu, index) => {
              return (
                <article key={liniaMenu.id} className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
                <article className="p-2 text-center col-span-1 md:col-span-3 break-all">{liniaMenu.menu.nom}</article>
                <article className="p-2 text-center col-span-1">1</article>
                <article className="p-2 text-center col-span-1">{liniaMenu.menu.preu}€</article>
                <article className="p-2 text-center col-span-1">
                  <button onClick={() => eliminarLiniaMenu(liniaMenu.id)}>
                    <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                  </button>
                </article>
              </article>
              );
              })}

            <article className="grid grid-cols-1 md:grid-cols-6 mt-5">
              <article className="p-2 text-center font-semibold col-span-4 break-all">Preu total:</article>
              <article className="p-2 text-center font-semibold col-span-1">{comanda[0]?.preu}€</article>
            </article>
          </section>

        <div className="mt-5 flex justify-center">
          {/* <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Guardar <FontAwesomeIcon icon={faFloppyDisk}/>
          </button> */}
          <button onClick={() => pagarComanda(comanda[0].id)} className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Pagar <FontAwesomeIcon icon={faEuroSign}/>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default comandaActual;
