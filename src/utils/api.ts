import { IComanda, ILiniaComanda, IPlat, ITaula } from "./interfaces";


const ENDPOINT = "http://localhost:5000"

export function getTaules (idRestaurant: string): Promise<ITaula[]> {
    return fetch(`${ENDPOINT}/taules?idRestaurant=${idRestaurant}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get taules is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function addTaula(idRestaurant: number, numTaula: number): Promise<ITaula> {
    return fetch(`${ENDPOINT}/taules`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, numTaula, afegir: true})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function deleteTaula(idRestaurant: number, numTaula: number): Promise<ITaula> {
    return fetch(`${ENDPOINT}/taules`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, numTaula, afegir: false})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function getComanda (idTaula: string): Promise<IComanda> {
    return fetch(`${ENDPOINT}/comanda?idTaula=${idTaula}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get comanda is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function getLiniesComanda (idComanda: string): Promise<ILiniaComanda[]> {
    return fetch(`${ENDPOINT}/liniesComanda?idComanda=${idComanda}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get linies comanda is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function getLiniesMenu (idComanda: string): Promise<ILiniaComanda[]> {
    return fetch(`${ENDPOINT}/liniesMenu?idComanda=${idComanda}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get linies menu is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}
  