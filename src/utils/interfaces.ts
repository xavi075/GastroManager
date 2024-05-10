export interface ITaula {
    id: number
    idRestaurant: number
    numTaula: number
  }


export interface IGrupPlats {
  nom: string
  color: string
  plats: IPlat[]
}
  
export interface IPlat {
  id: number
  nom: string
  preu: number
  idGrup: number
}

  