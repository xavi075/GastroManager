import exp from "constants";
import { IComanda, ILiniaComanda, ILiniaMenu, ITaula, IGrupPlats, IMenu, IUsuari } from "./interfaces";
import e from "express";

export function getTaules (idRestaurant: string): Promise<ITaula[]> {
    return fetch(`/api/taules/get?idRestaurant=${idRestaurant}`, {
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

export function addTaula(idRestaurant: number, numTaula: number): Promise<ITaula> {
    return fetch(`/api/taules/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, numTaula})
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

export function deleteTaula(idRestaurant: number, numTaula: number): Promise<ITaula> {
    return fetch(`/api/taules/delete`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, numTaula})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function getComanda (idTaula: string): Promise<IComanda> {
    return fetch(`/api/comanda/get?idTaula=${idTaula}`, {
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
    return fetch(`/api/liniesComanda/get?idComanda=${idComanda}`, {
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

export function getLiniesMenu (idComanda: string): Promise<ILiniaMenu[]> {
    return fetch(`/api/liniesMenu/get?idComanda=${idComanda}`, {
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

export function updateQtyLiniaComanda(id: number, novaQuantitat: number): Promise<ILiniaComanda> {
    return fetch(`/api/liniesComanda/update?id=${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({novaQuantitat: novaQuantitat})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}
  
export function deleteLiniaComanda(id: number): Promise<ILiniaComanda> {
    return fetch(`/api/liniesComanda/delete`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({id})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function deleteLiniaMenu(id: number): Promise<ILiniaMenu> {
    return fetch(`/api/liniesMenu/delete`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({id})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}
export function getGrupsPlats(idRestaurant: number): Promise<IGrupPlats[]> {
    let url = `/api/grupplats/get?idRestaurant=${idRestaurant}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get grupsplats is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function getGrupPlats(idRestaurant: number, idGrup?: string): Promise<IGrupPlats> {
    let url = `/api/grupplats/get?idRestaurant=${idRestaurant}&idGrup=${idGrup}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get grupsplats is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function updateComanda(id: number): Promise<IComanda> {
    return fetch(`/api/comanda/update?id=${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function getMenus(idRestaurant: number): Promise<IMenu[]> {
    return fetch(`/api/menus/get?idRestaurant=${idRestaurant}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get grupsplats is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function addGrupPlats(idRestaurant: number, nomGrup: string): Promise<IGrupPlats> {
    return fetch(`/api/grupplats/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, nomGrup})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function updatePlat(idRestaurant: number, idPlat: number, nomPlat: string, preu: number, idGrup: number): Promise<IGrupPlats> {
    return fetch(`/api/plats/update`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, idPlat, nomPlat, preu, idGrup})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function addPlat(idRestaurant: number, nomPlat: string, preu: number, idGrup: number): Promise<IGrupPlats> {
    return fetch(`/api/plats/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, nomPlat, preu, idGrup})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function updateGrupPlats(idGrup: number, nomGrup: string): Promise<IGrupPlats> {
    return fetch(`/api/grupplats/update`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idGrup, nomGrup})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function getMenu(idRestaurant: number, idMenu: string): Promise<IMenu> {
    return fetch(`/api/menus/get?idRestaurant=${idRestaurant}&idMenu=${idMenu}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get menu is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
}

export function addMenu(idRestaurant: number, nomMenu: string, preu: number, primers: number, segons: number, postres: number): Promise<IMenu> {
    return fetch(`/api/menus/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idRestaurant, nomMenu, preu, primers, segons, postres})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}

export function updateMenu(idMenu: number, nomMenu: string, preu: number, primers: number, segons: number, postres: number): Promise<IMenu> {
    return fetch(`/api/menus/update`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idMenu, nomMenu, preu, primers, segons, postres})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
      return res.json()
    }).then( res => {
        return res 
    })
}