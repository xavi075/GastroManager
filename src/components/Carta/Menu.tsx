import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteMenu, getMenus, getMenusCarta } from '@/utils/api';
import { IMenu, IRestaurant } from '@/utils/interfaces';
import Link from 'next/link';
import handle from '@/pages/api/grupplats/get';
import { useRouter } from 'next/router';

interface MenuProps {
    restaurant?: IRestaurant;
  }

export const Menu = ({ restaurant }: MenuProps) => {
    const router = useRouter();

    const [menus, setMenus] = useState<IMenu[]>([]);
    const [noMenu, setNoMenu] = useState<boolean>(false);

    console.log("restaurant a menu", restaurant);

    useEffect(() => {
        if (restaurant) {
            getMenusCarta(restaurant.id)
            .then(response => {
                console.log("menus", response);
                setMenus(response);
                if (response.length === 0) {
                    setNoMenu(true);
                } else {
                    setNoMenu(false);
                }
            })
            .catch((error) => {
                console.error('Error when get menus: ', error);
            });
        }
    }, [restaurant])

    const handleDeleteMenu = (idMenu: number) => {
        console.log('Delete menu', idMenu);
        if (!window.confirm("Segur que vols eliminar el menú?")) return;
        deleteMenu(idMenu)
        .then(() => {
            router.reload();
        })
        .catch((error) => {
            console.error('Error when delete menu: ', error);
            alert('Error al eliminar el menú');
        });
    }

    return (
        <section>
            <h2 className='text-2xl font-bold m-2 text-center '>Menús actuals</h2>
            {noMenu && <p className='text-center my-4'>No hi ha menús</p>}
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
                    <button onClick={() => handleDeleteMenu(menu.id)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                        Elimina <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>                    
                ))}
            </div>
            <a href="/editaMenu" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou menú <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};