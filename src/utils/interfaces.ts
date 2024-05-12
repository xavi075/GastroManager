export interface ITaula {
    id: number
    idRestaurant: number
    numTaula: number
  }

export interface IMenu {
  id: number
  idRestaurant: number
  nom: string
  preu: number
  grupPlat_menu_idGrupPrimerPlatTogrupPlat: IGrupPlats
  grupPlat_menu_idGrupSegonPlatTogrupPlat: IGrupPlats
  grupPlat_menu_idGrupPostresTogrupPlat: IGrupPlats
}

export interface IGrupPlats {
  nomGrup: string
  color: string
  plat: IPlat[]
}
  
export interface IPlat {
  id: number
  nom: string
  preu: number
  idGrup: number
}

  