import React from 'react';

export const Plat = (props:{nom:string, preu:number}) => {
    return (
        <div className='mb-4 py-4 bg-white shadow-md rounded-md w-56'>
            <h4 className='text-lg font-semibold mb-2'>{props.nom}</h4>
            <p className='text-gray-600'>{props.preu}€</p>
        </div>
    );
};