import React, { useState, useEffect } from 'react';
import { Plat } from './Plat';
import { Button } from "@/utils/components";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faFolderPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { get } from 'http';
import { deleteGrupPlats, getGrupsPlats, getMenus } from '@/utils/api';
import { IGrupPlats, IMenu, IRestaurant } from '@/utils/interfaces';
import { useRouter } from 'next/router';

interface GrupsPlatsProps {
    restaurant?: IRestaurant;
  }

export const GrupsPlats = ({ restaurant }: GrupsPlatsProps) => {
    const router = useRouter();
  

    console.log("restaurant a grupplats", restaurant);
    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats[]>([]);
    const [noGrup, setNoGrup] = useState<boolean>(false);

    useEffect(() => {
        if (restaurant) {
            // console.log("restaurant a useeffect", restaurant);
            getGrupsPlats(restaurant.id)
            .then(response => {
                console.log(response);
                setGrupsPlats(response);
                if (response.length === 0) {
                    setNoGrup(true);
                } else {
                    setNoGrup(false);
                }

            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        }
    }, [restaurant])

    const handleDeleteGrup = (idGrup: number) => {
        console.log('Delete grup', idGrup);
         if (!window.confirm("Segur que vols eliminar el grup? S'eliminaran tots els plats associats al grup i s'eliminarà dels menús que el continguin.")) return;
        deleteGrupPlats(idGrup)
        .then(() => {
            router.reload();
        })
        .catch((error) => {
            console.error('Error when delete grup: ', error);
            alert('Error al eliminar el grup');
        });
    }

    return (
        <section>
            <h2 className='text-2xl font-bold m-2 text-center'>Carta de plats</h2>
            {noGrup && <p className='text-center'>No hi ha grups de plats</p>}
            {grupsPlats.map(( grup ) => (
                // <article className={`${grup.color} rounded-md my-4 mx-auto text-center justify-center`}>
                <article className={`bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center`}>                    
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>{grup.nomGrup}</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center px-4'>
                    {grup.plat.length === 0 ? (
                        <p>Encara no hi ha cap plat</p>
                    ) : (
                        grup.plat.map((plat, index) => (
                        <Plat key={`id-${plat.id}`} nom={plat.nom} preu={plat.preu} />
                        ))
                    )}
                    </div>
                    {/* TODO: Onclick function */}
                    <Link href={`/editaGrupPlats?idGrup=${grup.id}`}>
                        <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                            Edita <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </Link>
                    <button onClick={() => handleDeleteGrup(grup.id)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                        Elimina <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>    
            ))}  

            <a href="/editaGrupPlats" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou grup <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};
  
