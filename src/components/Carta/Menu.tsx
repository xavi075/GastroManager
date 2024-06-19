import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getMenus } from '@/utils/api';
import { IMenu, IRestaurant } from '@/utils/interfaces';
import Link from 'next/link';

interface MenuProps {
    restaurant?: IRestaurant;
  }

export const Menu = ({ restaurant }: MenuProps) => {

    const [menus, setMenus] = useState<IMenu[]>([]);

    console.log("restaurant a menu", restaurant);

    useEffect(() => {
        if (restaurant) {
            getMenus(restaurant.id)
            .then(response => {
                console.log("menus", response);
                setMenus(response);
            })
            .catch((error) => {
                console.error('Error when get menus: ', error);
            });
        }
    }, [restaurant])

    return (
        <section>
            <h2 className='text-2xl font-bold m-2 text-center '>Menús actuals</h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center'>
                {menus.map(( menu ) => (
                    <article className='bg-bronze-200 rounded-md my-4 text-center justify-center text-lg pb-4'>
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2 px-2'>{menu.nom}</h3>
                    <div className='px-0'>
                        <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                        <ul className='m-4 p-2 bg-white shadow-md rounded-md w-56'>
                            {menu.grupPlat_menu_idGrupPrimerPlatTogrupPlat?.plat.map((primer) =>(
                                <li>{primer.nom}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            {menu.grupPlat_menu_idGrupSegonPlatTogrupPlat?.plat.map((segon) =>(
                                <li>{segon.nom}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Postre</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            {menu.grupPlat_menu_idGrupPostresTogrupPlat?.plat.map((postre) =>(
                                <li>{postre.nom}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold">Preu:</h4>
                        <p className="text-xl font-bold">{menu.preu}€</p>
                    </div>
                    <Link href={`/editaMenu?idMenu=${menu.id}`}>
                        <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                            Edita <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </Link>
                </article>                    
                ))}
            </div>
            <a href="/editaMenu" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou menú <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};