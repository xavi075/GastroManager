
import { IComanda, ILiniaComanda, ILiniaMenu, ITaula, IGrupPlats, IMenu, IPlat } from "./interfaces";


export function getTaules (idRestaurant: string): Promise<ITaula[]> {
    return fetch(`/api/taules/get?idRestaurant=${idRestaurant}`, {
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

export function getTaula (idTaula: string): Promise<ITaula> {
    return fetch(`/api/taules/get?idTaula=${idTaula}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get taula is not OK')
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

export function getLiniesMenu (idComanda: string): Promise<ILiniaComanda[]> {
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
    return fetch(`/api/grupplats/get?idRestaurant=${idRestaurant}`, {
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

  export function getGrupPlats(idRestaurant: number, idGrup: string): Promise<IGrupPlats> {
    let url = `/api/grupplats/get?idRestaurant=${idRestaurant}&idGrup=${idGrup}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get grup plats is not OK')
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

  export function addComanda(idTaula: number): Promise<IComanda> {
    return fetch(`/api/comanda/add?idTaula=${idTaula}`, {
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

  export function getPlatsGrup(idGrup: number): Promise<IPlat[]> {
    return fetch(`/api/plats/get?idGrup=${idGrup}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get plats grup is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function getPlat(idPlat: number): Promise<IPlat> {
    return fetch(`/api/plats/get?idPlat=${idPlat}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get plat is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function addLiniaComanda(idComanda: number, idPlat: number, quantitat: number): Promise<ILiniaComanda> {
    return fetch(`/api/liniesComanda/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idComanda, idPlat, quantitat})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function getMenusRestaurant(idRestaurant: number): Promise<IMenu[]> {
    return fetch(`/api/menus/get?idRestaurant=${idRestaurant}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response of get menus restaurant is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }

  export function getMenu(idMenu: number): Promise<IMenu> {
    return fetch(`/api/menus/get?idMenu=${idMenu}`, {
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

  export function addLiniaMenu(idComanda: number, idMenu: number, idPrimerPlat: number, idSegonPlat: number, idPostres: number): Promise<ILiniaComanda> {
    return fetch(`/api/liniesMenu/add`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({idComanda, idMenu, idPrimerPlat, idSegonPlat, idPostres})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not OK')
        return res.json()
    }).then( res => {
        return res 
    })
  }
