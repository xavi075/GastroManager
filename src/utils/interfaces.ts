export interface ITaula {
    id: number
    idRestaurant: number
    numTaula: number
  }
  
export interface IUsuari { 
    id: number
    nom: string
    email: string
    contrasenya_hash: string
    dataCreacioUsuari: Date
    idRol: number
    idRestaurant: number
  }