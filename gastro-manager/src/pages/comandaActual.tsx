import React from 'react';
import Layout from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEuroSign } from '@fortawesome/free-solid-svg-icons';

const comandaActual: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-70 max-w-screen-lg mx-auto p-8">
        <h2 className="text-xl py-5 px-0">Comanda activa</h2>
          <table className="table-auto overflow-hidden border-2 border-solid border-black border-md rounded-lg p-2.5 bg-vanilla-700 mb-8 overflow-x-auto">
            <thead>
              <tr className="break-words">
                <th colSpan={3} className="p-2 text-center break-all">Comanda 222</th> 
              </tr>
              <tr className="break-words">
                <th className="p-2 text-center">Plat</th> 
                <th className="p-2 text-center">Quantitat</th>
                <th className="p-2 text-center">Preu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="break-words">
                <td className="p-2 text-center break-all">Plattttttttttttttttttttttttttttttttttttttttt</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">8.99€</td>
              </tr>
              <tr className="break-words">
                <td className="p-2 text-center break-all">Plattttttttttttttttttttttttttttttttttttttttt</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">8.99€</td>
              </tr>
              <tr className="break-words">
                <td className="p-2 text-center break-all">Plattttttttttttttttttttttttttttttttttttttttt</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">8.99€</td>
              </tr>
              <tr className="break-words">
                <td className="p-2 text-center break-all">Plattttttttttttttttttttttttttttttttttttttttt</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">8.99€</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="break-words">
                <th colSpan={2} className="p-2 text-center break-all py-8 mr-4">Preu final:</th> 
                <th className="p-2 text-center break-all">35.96€</th>
              </tr>
            </tfoot>
          </table>
        <div className="mt-10 flex justify-center md:justify-end lg:justify-end">
          <button className="border-1 border-solid border-black border-md rounded-lg items-center bg-brown-800 text-brown-100 font-bold py-2 px-4 m-5 transition-colors duration-200 ease-in-out hover:bg-brown-700 hover:text-white">
            <FontAwesomeIcon icon={faPlus} className="m-3" />
          </button>
          <button className="border-1 border-solid border-black border-md rounded-lg items-center bg-blood_red-800 text-brown-100 font-bold py-2 px-4 m-5 transition-colors duration-200 ease-in-out hover:bg-blood_red-700 hover:text-white">
            <FontAwesomeIcon icon={faEuroSign} className="m-3" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default comandaActual;
