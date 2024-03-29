import React from 'react';

export const Plat = (props:{nom:string, preu:number}) => {
    return (
        <div>
            <h4>{props.nom}</h4>
            <p>{props.preu}</p>
        </div>
    );
};