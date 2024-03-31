import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';



export const Menu = () => {
    return (
        <section>
            <h2 className='text-xl font-bold m-2 text-center '>Menús actuals</h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center'>
                <article className='bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center text-lg font-s'>
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2 px-2'>Migdia</h3>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                        <ul className='m-4 p-2 bg-white shadow-md rounded-md w-56'>
                            <li>Amanida Cèsar</li>
                            <li>Sopa de Verdures</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            <li>Llom a la Planxa</li>
                            <li>Pasta Carbonara</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Postre</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            <li>Pastís de Xocolata</li>
                            <li>Gelat de Vainilla</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold">Preu:</h4>
                        <p className="text-xl font-bold">13.95€</p>
                    </div>
                </article>
                <article className='bg-bronze-200 rounded-md my-4 mx-auto text-center justify-center text-lg'>
                    <h3 className='text-2xl font-bold text-center text-gray-800 mb-4 pt-2 px-2'>Cap de Setmana</h3>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Primer Plat</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            <li>Amanida Cèsar</li>
                            <li>Sopa de Verdures</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Segon Plat</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            <li>Llom a la Planxa</li>
                            <li>Pasta Carbonara</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-2">Postre</h4>
                        <ul className='m-4 py-2 bg-white shadow-md rounded-md w-56'>
                            <li>Pastís de Xocolata</li>
                            <li>Gelat de Vainilla</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold">Preu:</h4>
                        <p className="text-xl font-bold">19.95€</p>
                    </div>
                </article>
            </div>
            <a href="" className="block bg-bronze-500 hover:bg-bronze-700 text-white font-bold py-2 px-4 rounded mx-auto text-center">
                Afegir un nou menú <FontAwesomeIcon icon={faFolderPlus}/>
            </a>
        </section>
    );
};