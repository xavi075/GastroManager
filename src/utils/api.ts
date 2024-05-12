import {IUsuari} from "./interfaces";

export function getUsuaris(): Promise<IUsuari[]> {
    return fetch(`/api/usuaris/get`, {
        method: 'GET',
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
export function getUsuari (id: string): Promise<IUsuari[]> {
    return fetch(`/api/usuaris?id=${id}`, {
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
    return fetch(`/api/usuaris/delete?id=${id}`, {
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

export function addUsuari(nom: string, email: string, contrasenya: string, dataCreacioUsuari:Date, idRol: number): Promise<IUsuari> {
    return fetch(`/api/usuaris/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({nom, email, contrasenya, dataCreacioUsuari, idRol})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}
