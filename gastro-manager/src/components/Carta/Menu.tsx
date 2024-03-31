import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';



export const Menu = () => {
    return (
        <section>
            <h2 className='text-xl font-bold m-2 text-center'>Menús actuals</h2>
            <article className='bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center'>
                <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>Menú Migdia</h3>
                <div>
                    <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                    <ul>
                        <li>Amanida Cèsar</li>
                        <li>Sopa de Verdures</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                    <ul>
                        <li>Llom a la Planxa</li>
                        <li>Pasta Carbonara</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-2">Postre</h4>
                    <ul>
                        <li>Pastís de Xocolata</li>
                        <li>Gelat de Vainilla</li>
                    </ul>
                </div>
                <div className="mt-4">
                    <h4 className="text-lg font-bold">Preu:</h4>
                    <p className="text-xl font-bold">13.95€</p>
                </div>
            </article>
            <article className='bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center'>
                <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2'>Menú Cap de Setmana</h3>
                <div>
                    <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                    <ul>
                        <li>Amanida Cèsar</li>
                        <li>Sopa de Verdures</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                    <ul>
                        <li>Llom a la Planxa</li>
                        <li>Pasta Carbonara</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-2">Postre</h4>
                    <ul>
                        <li>Pastís de Xocolata</li>
                        <li>Gelat de Vainilla</li>
                    </ul>
                </div>
                <div className="mt-4">
                    <h4 className="text-lg font-bold">Preu:</h4>
                    <p className="text-xl font-bold">13.95€</p>
                </div>
            </article>
            <a href="/nueva-pagina" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou menú <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};