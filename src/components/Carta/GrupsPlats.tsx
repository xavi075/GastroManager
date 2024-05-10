import React, { useState, useEffect } from 'react';
import { Plat } from './Plat';
import { Button } from "@/utils/components";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { get } from 'http';
import { getGrupsPlats, getMenus } from '@/utils/api';
import { IGrupPlats, IMenu } from '@/utils/interfaces';

export const GrupsPlats = () => {

    const LlistaPlats = [{
        nom: "Patates Braves",
        preu: 5.50
    }, 
    {
        nom: "Olives",
        preu: 1.50
    },
    {
        nom: "Patates Xips",
        preu: 2
    },
    {
        nom: "Patates Xips petites",
        preu: 1.60
    },
    {
        nom: "Fruits Secs",
        preu: 1.90
    },
    {
        nom: "Escopinyes",
        preu: 5.90
    }]

    const LlistaBegudes = [{
        nom: "Aigua (50 ml)",
        preu: 1.90
    }, 
    {
        nom: "Estrella Damm",
        preu: 2.20
    },
    {
        nom: "Coca-Cola",
        preu: 2.50
    },
    {
        nom: "Fanta de Taronja",
        preu: 2.40
    }]

    const LlistaGrups = [{
        nom: "Tapes",
        color: "bg-bronze-200",
        // TODO: Add new functionalities like icons
        plats: LlistaPlats
    },
    {  
        nom: "Begudes",
        color: "bg-sky-200",
        // TODO: Add new functionalities like icons
        plats: LlistaBegudes
    }]

    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats[]>([]);

    useEffect(() => {
        getGrupsPlats(1)
        .then(response => {
            console.log(response);
            setGrupsPlats(response);
        })
        .catch((error) => {
            console.error('Error when get grupsplats: ', error);
        });
    }, [])

    return (
        <section>
            <h2 className='text-2xl font-bold m-2 text-center'>Carta de plats</h2>
            {grupsPlats.map(( grup ) => (
                // <article className={`${grup.color} rounded-md my-4 mx-auto text-center justify-center`}>
                <article className={`bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center`}>                    
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>{grup.nomGrup}</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center px-4'>
                        {grup.plat.map((plat, index) => (
                            <Plat key={`id-${plat}`} nom={plat.nom} preu={plat.preu}/>
                        ))}
                    </div>
                    {/* TODO: Onclick function */}
                    <Link href={"/editaGrupPlats"}>
                        <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                            Edita <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </Link>
                </article>    
            ))}  

            <a href="/nueva-pagina" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou grup <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};
  
