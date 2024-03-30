import React from 'react';
import { Plat } from './Plat';
import { Button } from "@/utils/components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const GrupsPlats = () => {
    return (
        <section>
            <h2 className='text-xl font-bold m-2'>Carta de plats</h2>
            <article className='bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center'>
                <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>Tapes</h3>
                <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-items-center mx-2'>
                    {/* TODO: Substituir la key amb la variable d'id corresponent */}
                    {/* TODO: Iterar i generar automàticament a través d'un mapeig */}
                    <Plat key={"id1"} nom={"Patates Braves"} preu={5.50}/>
                    <Plat key={"id2"} nom={"Olives"} preu={1.50}/>
                    <Plat key={"id3"} nom={"Patates Xips"} preu={2}/>
                    <Plat key={"id4"} nom={"Patates Xips 2"} preu={1.90}/>
                    <Plat key={"id5"} nom={"Patates Xips 3"} preu={2.10}/>
                    <Plat key={"id6"} nom={"Patates Xips 4"} preu={1.75}/>
                </div>
                {/* TODO: Onclick function */}
                <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mb-4">
                    Afegir plat <FontAwesomeIcon icon={faPlus}/>
                </button>
            </article>            
            <article className='bg-sky-200 rounded-md my-4 mx-auto text-center justify-center'>
                <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>Begudes</h3>
                <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-items-center mx-2'>
                    {/* TODO: Substituir la key amb la variable d'id corresponent */}
                    {/* TODO: Iterar i generar automàticament a través d'un mapeig */}
                    <Plat key={"b1"} nom={"Aigua (50cl)"} preu={1.80}/>
                    <Plat key={"b2"} nom={"Estrella Damm"} preu={2.20}/>
                    <Plat key={"b3"} nom={"Cocacola"} preu={2.30}/>
                </div>
                <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mb-4">
                    Afegir plat <FontAwesomeIcon icon={faPlus}/>
                </button>
            </article>

            {/* TODO: Botó d'afegir grup */}
            <a href="/nueva-pagina" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou grup
            </a>
        </section>
    );
};
  
