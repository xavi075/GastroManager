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
  
export interface IComanda {
  id: number
  preu: number
  pagat: boolean
  dataInici: string
  dataFi: string
  idTaula: number
  taula: ITaula
}

export interface ILiniaComanda {
  id: number
  preuTotal: number
  quantitat: number
  idComanda: number
  idPlat: number
  plat: IPlat
}

export interface ILiniaMenu {
  id: number
  idComanda: number
  idMenu: number
  idPrimerPlat: number
  idSegonPlat: number
  idPostres: number
  menu: IMenu
}

export interface IPlat {
  id: number
  nom: string
  preu: number
  idGrup: number
}

export interface IMenu {
  id: number
  idRestaurant: number
  nom: string
  preu: number
  idGrupPrimerPlat: number
  idGrupSegonPlat: number
  idGrupPostres: number
  grupPlat_menu_idGrupPrimerPlatTogrupPlat: IGrupPlats
  grupPlat_menu_idGrupSegonPlatTogrupPlat: IGrupPlats
  grupPlat_menu_idGrupPostresTogrupPlat: IGrupPlats
}

export interface IGrupPlats {
  nomGrup: string
  color: string
  plat: IPlat[]
}

