import {IUsuari} from "./interfaces";

const ENDPOINT = "http://localhost:5000"


export function getUsuaris (id: string): Promise<IUsuari[]> {
    return fetch(`${ENDPOINT}/api/usuaris?id=${id}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get usuaris is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function deleteUsuari(id: number): Promise<IUsuari> {
    return fetch(`${ENDPOINT}/api/usuaris/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function addUsuari(nom: string, email: string, contrasenya: string, dataCreacioUsuari:Date, idRol: number, idRestaurant: number): Promise<IUsuari> {
    return fetch(`${ENDPOINT}/api/usuaris/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({nom, email, contrasenya, dataCreacioUsuari, idRol, idRestaurant})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}
