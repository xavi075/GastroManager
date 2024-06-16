import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { Input, Button } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGrupPlats, IMenu, IPlat, ITaula } from "@/utils/interfaces";
import { getMenusRestaurant, getMenu, getPlatsGrup, getTaula, addLiniaMenu } from "@/utils/api";


export default function afegirMenu (){
    const router = useRouter();
    const [idComanda, setIdComanda] = useState<string | undefined>(undefined);
    const [idTaula, setIdTaula] = useState<string | undefined>(undefined);

    // const idGrup: string = "1";

    console.log("Taula", idTaula);
    console.log("Comanda", idComanda);

    // const [name, setName] = useState('');
    const [selectedMenu, setselectedMenu] = useState<number | null>(null); // Estat per al menu seleccionat
    const [selectedPrimerPlat, setselectedPrimerPlat] = useState<number | null>(null); // Estat per al 1r plat seleccionat
    const [selectedSegonPlat, setselectedSegonPlat] = useState<number | null>(null); // Estat per al 2n plat seleccionat
    const [selectedPostres, setselectedPostres] = useState<number | null>(null); // Estat per a les postres seleccionades
    // const [platName, setPlatName] = useState('Patates Braves');
    // const [platPreu, setPlatPreu] = useState<number>(5.5);

    const [taula, setTaula] = useState<ITaula>();
    const [menus, setMenus] = useState<IMenu[]>([]);
    const [menu, setMenu] = useState<IMenu>();
    const [primersPlats, setPrimersPlats] = useState<IPlat[]>([]);
    const [segonsPlats, setSegonsPlats] = useState<IPlat[]>([]);
    const [postres, setPostres] = useState<IPlat[]>([]);
    // const [grupPlats, setGrupPlats] = useState<IGrupPlats>();
    const [platsGrup, setPlatsGrup] = useState<IPlat[]>([]);
    const [platQuantitat, setPlatQuantitat] = useState<number>(1);

    useEffect(() => {
        if (router.isReady) {
          const { idComanda, idTaula } = router.query;
          setIdComanda(idComanda as string);
          setIdTaula(idTaula as string);
        }
      }, [router.isReady, router.query]);
        
    useEffect(() => {
        if(Number(idTaula)){
            getTaula(String(idTaula))
            .then(response => {
                setTaula(response);
            })
            .catch((error) => {
                console.error('Error when get taula: ', error);
            });
        }
    }, [idTaula])

    useEffect(() => {
        if(taula){
            getMenusRestaurant(taula[0].idRestaurant)
            .then(response => {
                setMenus(response);
            })
            .catch((error) => {
                console.error('Error when get menus: ', error);
            });
        }
    }, [taula])

    useEffect(() => {
        console.log("selectedMenu", selectedMenu);
        if(selectedMenu != null) {
            getMenu(Number(selectedMenu))
            .then(response => {
                console.log("Resposta selectedMenu", response);
                setMenu(response);
            })
            .catch((error) => {
                console.error('Error when get menu: ', error);
            });
        }
    }, [selectedMenu])

    useEffect(() => {
        if(menu) {
            console.log("Menu", menu)
            console.log("Id Primers plats", menu[0].idGrupPrimerPlat)
            getPlatsGrup(Number(menu[0].idGrupPrimerPlat))
            .then(response => {
                console.log("Primers plats", response)
                setPrimersPlats(response);
            })
            .catch((error) => {
                console.error('Error when get primers plat: ', error);
            });
        }
    }, [menu])

    useEffect(() => {
        if(selectedPrimerPlat) {
            console.log("Id Segons plats", menu[0].idGrupSegonPlat)
            getPlatsGrup(Number(menu[0].idGrupSegonPlat))
            .then(response => {
                console.log("Segons plats", response)
                setSegonsPlats(response);
            })
            .catch((error) => {
                console.error('Error when get segons plat: ', error);
            });
        }
    }, [selectedPrimerPlat])

    useEffect(() => {
        if(selectedSegonPlat) {
            console.log("Id postres", menu[0].idGrupPostres)
            getPlatsGrup(Number(menu[0].idGrupPostres))
            .then(response => {
                console.log("Postres", response)
                setPostres(response);
            })
            .catch((error) => {
                console.error('Error when get postres: ', error);
            });
        }
    }, [selectedSegonPlat]) 

    const handleMenuSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedMenu(parseInt(e.target.value));
        setselectedPrimerPlat(null);
        setselectedSegonPlat(null);
        setselectedPostres(null);
    };


    const handlePrimerPlatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedPrimerPlat(parseInt(e.target.value));
        setselectedSegonPlat(null);
        setselectedPostres(null);
    };

    const handleSegonPlatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedSegonPlat(parseInt(e.target.value));
        setselectedPostres(null);
    };

    const handlePostresSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedPostres(parseInt(e.target.value));
    };

    const afegirLiniaMenu = (idComanda: number, idMenu: number, idPrimerPlat: number, idSegonPlat: number, idPostres: number) => {
        if(idComanda && idMenu && idPrimerPlat && idSegonPlat && idPostres){
            addLiniaMenu(idComanda, idMenu, idPrimerPlat, idSegonPlat, idPostres)
            .then(response => {
                setselectedMenu(null);
                setselectedPrimerPlat(null);
                setselectedSegonPlat(null);
                setselectedPostres(null);
            })
            .catch((error) => {
                console.error('Error when add linia menu: ', error);
            }); 
        }
    };

    console.log("Plats menu", menu?.grupPlat_menu_idGrupPrimerPlatTogrupPlat)

  return (
    <Layout>
            <div className="justify-items-right">
                {idComanda == undefined && (<h2 className="text-2xl font-bold m-2 text-center p-2">Hi ha hagut un error al obtenir el restaurant</h2>)}
                {idComanda && (<h2 className="text-2xl font-bold m-2 text-center p-2">Afegir un menú a la comanda {idComanda}</h2>)}
                <section>
                    <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista de menus disponibles</h2>
                        <div className="mb-4">
                            <label htmlFor="menu" className="block text-lg font-medium text-gray-700">Selecciona un dels menus disponibles</label>
                            <select
                                id="menu"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                value={selectedMenu ?? ''}
                                onChange={handleMenuSelect}
                            >
                                <option value="" disabled>Selecciona un menú</option>
                                {menus && menus?.map((menu, index) => (
                                    <option key={menu?.id} value={menu?.id}>
                                        {menu.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </article>
                    {selectedMenu !== null && primersPlats && (
                        <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista dels 1r plats del menu</h2>
                            <div className="mb-4">
                                <label htmlFor="primerPlatSelect" className="block text-lg font-medium text-gray-700">Selecciona el 1r plat</label>
                                <select
                                    id="primerPlatSelect"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedPrimerPlat ?? ''}
                                    onChange={handlePrimerPlatSelect}
                                >
                                    <option value="" disabled>Selecciona un 1r plat</option>
                                    {primersPlats && primersPlats.map((primerPlat, index) => (
                                        <option key={primerPlat?.id} value={primerPlat?.id}>
                                            {primerPlat.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>
                    )}

                    {selectedPrimerPlat !== null && segonsPlats && (
                        <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista dels 2n plats del menu</h2>
                            <div className="mb-4">
                                <label htmlFor="segonPlatSelect" className="block text-lg font-medium text-gray-700">Selecciona el 2n plat</label>
                                <select
                                    id="segonPlatSelect"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedSegonPlat ?? ''}
                                    onChange={handleSegonPlatSelect}
                                >
                                    <option value="" disabled>Selecciona un 2n plat</option>
                                    {segonsPlats && segonsPlats.map((segonPlat, index) => (
                                        <option key={segonPlat?.id} value={segonPlat?.id}>
                                            {segonPlat.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>
                    )}

                    {selectedSegonPlat !== null && postres && (
                        <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista de les postres del menu</h2>
                            <div className="mb-4">
                                <label htmlFor="postresSelect" className="block text-lg font-medium text-gray-700">Selecciona les postres</label>
                                <select
                                    id="postresSelect"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedPostres ?? ''}
                                    onChange={handlePostresSelect}
                                >
                                    <option value="" disabled>Selecciona les postres</option>
                                    {postres && postres.map((postre, index) => (
                                        <option key={postre?.id} value={postre?.id}>
                                            {postre.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>
                    )}
                    

                </section>
                <div className="m-5 flex justify-center">
                    <button onClick={() => afegirLiniaMenu(Number(idComanda), Number(selectedMenu), Number(selectedPrimerPlat), Number(selectedSegonPlat), Number(selectedPostres))} className={`bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2 
                    ${!selectedPostres ? 'opacity-50 cursor-not-allowed' : '' }`} disabled={!selectedPostres}>
                        Afegeix menú <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <Link href={`/comanda?idTaula=${idTaula}`} key={idTaula}>
                        <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                            Torna a la comanda <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </Link> 
                </div>
                
            </div>
        </Layout>
    );
}   