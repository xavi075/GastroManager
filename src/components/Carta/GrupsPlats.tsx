import React, { useState, useEffect } from 'react';
import { Plat } from './Plat';
import { Button } from "@/utils/components";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { get } from 'http';
import { getGrupsPlats, getMenus } from '@/utils/api';
import { IGrupPlats, IMenu, IRestaurant } from '@/utils/interfaces';

interface GrupsPlatsProps {
    restaurant?: IRestaurant;
  }

export const GrupsPlats = ({ restaurant }: GrupsPlatsProps) => {
  

    console.log("restaurant a grupplats", restaurant);
    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats[]>([]);

    useEffect(() => {
        if (restaurant) {
            // console.log("restaurant a useeffect", restaurant);
            getGrupsPlats(restaurant.id)
            .then(response => {
                console.log(response);
                setGrupsPlats(response);
            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        }
    }, [restaurant])

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
                    <Link href={`/editaGrupPlats?idGrup=${grup.id}`}>
                        <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                            Edita <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </Link>
                </article>    
            ))}  

            <a href="/editaGrupPlats" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou grup <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};
  
