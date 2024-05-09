import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faPencil } from '@fortawesome/free-solid-svg-icons';



export const Menu = () => {

    const Menus = [{
        nom: "Migdia",
        // TODO: Evaluate converting the lists to lists of objects
        primers: ["Amanida Cèsar", "Sopa de Verdures"],
        segons: ["Llom a la Planxa", "Pasta Carbonara"],
        postres: ["Pastís de Xocolata", "Gelat de Vainilla"],
        preu: 13.95
    },
    {
        nom: "Cap de Setmana",
        // TODO: Evaluate converting the lists to lists of objects
        // TODO: Add Colors or other minor fixes
        primers: ["Amanida Verda", "Puré de Carabassa"],
        segons: ["Hamburguesa de Vedella", "Lluç amb guarnició"],
        postres: ["Pudding", "Fruita de Temporada"],
        preu: 19.95
    }]

    return (
        <section>
            <h2 className='text-2xl font-bold m-2 text-center '>Menús actuals</h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center'>
                {Menus.map(( menu ) => (
                    <article className='bg-bronze-200 rounded-md my-4 text-center justify-center text-lg pb-4'>
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2 px-2'>{menu.nom}</h3>
                    <div className='px-0'>
                        <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                        <ul className='m-4 p-2 bg-white shadow-md rounded-md w-56'>
                            {menu.primers.map((primer) =>(
                                <li>{primer}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            {menu.segons.map((segon) =>(
                                <li>{segon}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Postre</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            {menu.postres.map((postre) =>(
                                <li>{postre}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold">Preu:</h4>
                        <p className="text-xl font-bold">{menu.preu}€</p>
                    </div>
                    <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
                        Edita <FontAwesomeIcon icon={faPencil}/>
                    </button>
                </article>                    
                ))}
            </div>
            <a href="" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou menú <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};