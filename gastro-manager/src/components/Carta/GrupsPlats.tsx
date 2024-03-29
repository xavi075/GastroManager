import React from 'react';
import { Plat } from './Plat';

export const GrupsPlats = () => {
    return (
        <section>
            <h2 className='text-xl font-bold m-2'>Carta de plats</h2>
            <article>
                <h3>Tapes</h3>
                <div>
                    {/* TODO: Substituir la key amb la variable d'id corresponent */}
                    {/* TODO: Iterar i generar automàticament a través d'un mapeig */}
                    <Plat key={"id1"} nom={"Patates Braves"} preu={5.50}/>
                    <Plat key={"id2"} nom={"Olives"} preu={1.50}/>
                    <Plat key={"id3"} nom={"Patates Xips"} preu={2}/>
                </div>
            </article>            
            <article>
                <h3>Begudes</h3>
                <div>
                    {/* TODO: Substituir la key amb la variable d'id corresponent */}
                    {/* TODO: Iterar i generar automàticament a través d'un mapeig */}
                    <Plat key={"b1"} nom={"Aigua (50cl)"} preu={1.80}/>
                    <Plat key={"b2"} nom={"Estrella Damm"} preu={2.20}/>
                    <Plat key={"b3"} nom={"Cocacola"} preu={2.30}/>
                </div>
            </article>
            {/* TODO: Botó d'afegir grup */}
        </section>
    );
};
  
