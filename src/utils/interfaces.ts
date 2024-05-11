export interface ITaula {
    id: number
    idRestaurant: number
    numTaula: number
}

export interface IRestaurant {
  id: number
  nom: string
  adreca: string
  nif: string
}

export interface IRol {
  id: number
  nomRol: string
}

export interface IUsuari {
  id: number
  email: string
  nom: string
  dataCreacio: Date
  rol : IRol
  restaurant : IRestaurant
}
  