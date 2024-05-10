import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faEuroSign, faSquarePlus, faSquareMinus, faFloppyDisk, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const comandaActual: React.FC = () => {
  const router = useRouter();
  const { taula } = router.query;

  const [quantitatActual, setQuantitat] = useState([1,1,1,1]); // Estat per emmagatzemar la quantitat d'un plat

  // Event incrementat quantitat
  const incrementarQuantitat = (index: number) => {
    const novesQuantitats = [...quantitatActual];
    novesQuantitats[index] = novesQuantitats[index] + 1;
    setQuantitat(novesQuantitats);
  };

  // Event decrementat quantitat
  const decrementarQuantitat = (index: number) => {
    const novesQuantitats = [...quantitatActual];
    if (novesQuantitats[index] > 1) {
      novesQuantitats[index] = novesQuantitats[index] - 1;
      setQuantitat(novesQuantitats);
    }
  };

  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Comanda activa de la taula {taula}</h2>
          <div className="m-5 flex justify-center">
            <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
              Afegir plat <FontAwesomeIcon icon={faPlus}/>
            </button>
            <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
              Afegir menú <FontAwesomeIcon icon={faPlus}/>
            </button>
          </div>
          <section className="border-2 border-solid border-black border-md rounded-lg p-2.5 bg-vanilla-700 mb-8 overflow-x-auto">
            
            <h3 className="p-2 text-center font-semibold break-all">Comanda 222</h3>

            <article className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
              <article className="p-2 text-center col-span-1 md:col-span-3 break-all">Amanida de cabra</article>
              <article className="p-2 text-center col-span-1">
                <button onClick={() => decrementarQuantitat(0)} className="quantity-modifier-btn mr-5">
                  <FontAwesomeIcon icon={faSquareMinus} style={{color: "red"}} size='xl'/>
                </button>
                {quantitatActual[0]}
                <button onClick={() => incrementarQuantitat(0)} className="quantity-modifier-btn ml-5">
                  <FontAwesomeIcon icon={faSquarePlus} style={{color: "green"}} size='xl'/>
                </button>
              </article>
              <article className="p-2 text-center col-span-1">8.99€</article>
              <article className="p-2 text-center col-span-1">
                <button>
                  <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                </button>
              </article>
            </article>

            <article className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
              <article className="p-2 text-center col-span-1 md:col-span-3 break-all">Patates casolanes amb salsa brava</article>
              <article className="p-2 text-center col-span-1">
                <button onClick={() => decrementarQuantitat(1)} className="quantity-modifier-btn mr-5">
                  <FontAwesomeIcon icon={faSquareMinus} style={{color: "red"}} size='xl'/>
                </button>
                {quantitatActual[1]}
                <button onClick={() => incrementarQuantitat(1)} className="quantity-modifier-btn ml-5">
                  <FontAwesomeIcon icon={faSquarePlus} style={{color: "green"}} size='xl'/>
                </button>
              </article>
              <article className="p-2 text-center col-span-1">8.99€</article>
              <article className="p-2 text-center col-span-1">
                <button>
                  <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                </button>
              </article>
            </article>

            <article className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
              <article className="p-2 text-center col-span-1 md:col-span-3 break-all">Xuleton</article>
              <article className="p-2 text-center col-span-1">
                <button onClick={() => decrementarQuantitat(2)} className="quantity-modifier-btn mr-5">
                  <FontAwesomeIcon icon={faSquareMinus} style={{color: "red"}} size='xl'/>
                </button>
                {quantitatActual[2]}
                <button onClick={() => incrementarQuantitat(2)} className="quantity-modifier-btn ml-5">
                  <FontAwesomeIcon icon={faSquarePlus} style={{color: "green"}} size='xl'/>
                </button>
              </article>
              <article className="p-2 text-center col-span-1">108.99€</article>
              <article className="p-2 text-center col-span-1">
                <button>
                  <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                </button>
              </article>
            </article>

            <article className="grid grid-cols-1 md:grid-cols-6 mb-2 m-1 p-1 bg-vanilla-800 shadow-md rounded-md">
              <article className="p-2 text-center col-span-1 md:col-span-3 break-all">Cervesa</article>
              <article className="p-2 text-center col-span-1">
                <button onClick={() => decrementarQuantitat(3)} className="quantity-modifier-btn mr-5">
                  <FontAwesomeIcon icon={faSquareMinus} style={{color: "red"}} size='xl'/>
                </button>
                {quantitatActual[3]}
                <button onClick={() => incrementarQuantitat(3)} className="quantity-modifier-btn ml-5">
                  <FontAwesomeIcon icon={faSquarePlus} style={{color: "green"}} size='xl'/>
                </button>
              </article>
              <article className="p-2 text-center col-span-1">2.99€</article>
              <article className="p-2 text-center col-span-1">
                <button>
                  <FontAwesomeIcon icon={faTrash} style={{color: "red"}} size='xl'/>
                </button>
              </article>
            </article>

            <article className="grid grid-cols-1 md:grid-cols-6 mt-5">
              <article className="p-2 text-center font-semibold col-span-4 break-all">Preu total:</article>
              <article className="p-2 text-center font-semibold col-span-1">35.96€</article>
            </article>
          </section>

        <div className="mt-5 flex justify-center">
          <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Guardar <FontAwesomeIcon icon={faFloppyDisk}/>
          </button>
          <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
            Pagar <FontAwesomeIcon icon={faEuroSign}/>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default comandaActual;
