import { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { Input, Button } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGrupPlats, IMenu } from "@/utils/interfaces";
import { addGrupPlats, addMenu, addPlat, getGrupPlats, getGrupsPlats, getMenu, updateGrupPlats, updateMenu, updatePlat } from "@/utils/api";
import { get } from "http";
import { Select, SelectItem, menu } from "@nextui-org/react";


export default function editaMenu (){
    const router = useRouter();
    // const idGrup: string = router.asPath.split('=')[1];


    const [idMenu, setIdMenu] = useState<string | undefined>(undefined);



    const [name, setName] = useState('');
    const [preu, setPreu] = useState<number>(0);

    // const [selectedPlat, setSelectedPlat] = useState<number | null>(null);
    const [selectedPrimers, setSelectedPrimers] = useState<number | null>(null);
    const [selectedSegons, setSelectedSegons] = useState<number | null>(null);
    const [selectedPostres, setSelectedPostres] = useState<number | null>(null);

    const [platName, setPlatName] = useState('');
    const [platPreu, setPlatPreu] = useState<number>(0);

    const [newPlatName, setNewPlatName] = useState('');
    const [newPlatPreu, setNewPlatPreu] = useState<number>();

    const [refresh, setRefresh] = useState<boolean>(false);

    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats[]>([]);
    const [menu, setMenu] = useState<IMenu>();
    
    useEffect(() => {
        if (router.isReady) {
        const idMenuFromUrl = router.asPath.split('=')[1];
        setIdMenu(idMenuFromUrl);
        }
    }, [router.isReady, router.asPath]);

    useEffect(() => {
        getGrupsPlats(1)
        .then(response => {
            console.log(response);
            setGrupsPlats(response);
        })
        .catch((error) => {
            console.error('Error when get grupsplats: ', error);
        });
    }, []);
        
    useEffect(() => {
        // TODO: agadar el id del grup des de la url
        // Coger idGrup desde la url
        if (idMenu !== undefined) {
            getMenu(1, idMenu)
            .then(response => {
                console.log(response);
                setMenu(response);
                setName(response.nom);
                setPreu(response.preu);
            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        }   
    }, [idMenu, refresh]);


    useEffect(() => {
        if (menu !== null){
            if (menu?.idGrupPrimerPlat) {setSelectedPrimers(menu?.idGrupPrimerPlat)};
            if (menu?.idGrupSegonPlat) {setSelectedSegons(menu?.idGrupSegonPlat)};
            if (menu?.idGrupPostres) {setSelectedPostres(menu?.idGrupPostres)};
            console.log('menu', menu)
        }
    }, [menu]);

    // TODO: This must work for multiple plates
    const handlePlatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatName(e.target.value);
    };

    const handleNewPlatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlatName(e.target.value);
    };

    const handleNewPlatPreuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlatPreu(parseFloat(e.target.value));
    };
    
    // TODO: This must work for multiple prices
    const handlePlatPreuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatPreu(parseFloat(e.target.value));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePreuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreu(parseFloat(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (idMenu == undefined && name && preu && grupsPlats && selectedPrimers && selectedSegons && selectedPostres) {
            console.log('Creant menu', name, preu, selectedPrimers, selectedSegons, selectedPostres);
            addMenu(1, name, preu, selectedPrimers, selectedSegons, selectedPostres)
            .then(response => {
                console.log(response);

                router.push(`/editaMenu?idMenu=${response.id}`);
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error('Error when get menus: ', error);
            });
        } else {
            if (menu !== undefined && name && preu && selectedPrimers && selectedSegons && selectedPostres){

                console.log('Editant grup');
                console.log('idMenu', idMenu, 'name', name, 'preu', preu, 'grupsPlats', grupsPlats, 'selectedPrimers', selectedPrimers, 'selectedSegons', selectedSegons, 'selectedPostres', selectedPostres);
                updateMenu(menu.id, name, preu, selectedPrimers, selectedSegons, selectedPostres)
                .then(response => {
                    console.log(response);
                    setRefresh(!refresh);
                })
                .catch((error) => {
                    console.error('Error when update plats: ', error);
                });
            };
        }
    };

    const handleSavePlat = (idPlat: number, nom:string, preu: number, idGrup:number) => {
        updatePlat(1, idPlat, nom, preu, idGrup)
        .then(response => {
            console.log(response);
            setRefresh(!refresh);
            // setGrupsPlats(response);
        })
        .catch((error) => {
            console.error('Error when update plats: ', error);
        });
        console.log(nom, preu, idGrup)
    };

    const handleAddPlat = () => {
        // console.log('Afegint plat', newPlatName, newPlatPreu, grupsPlats?.id);
        // if (grupsPlats?.id == undefined) return;
        // addPlat(1, newPlatName, newPlatPreu, grupsPlats?.id)
        // .then(response => {
        //     console.log(response);
        //     setRefresh(!refresh);
        //     setNewPlatName('');
        //     setNewPlatPreu(0);
        // })
        // .catch((error) => {
        //     console.error('Error when update plats: ', error);
        // });

    }

    const handleDeletePlat = (platId: number) => {
    };

    const handlePrimersSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('selectedPrimers', e.target.value, selectedPrimers);
        setSelectedPrimers(parseInt(e.target.value));
    };

    const handleSegonsSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSegons(parseInt(e.target.value));
    };

    const handlePostresSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPostres(parseInt(e.target.value));
    };

  return (
    <Layout>
            <div className="justify-items-right">
            {idMenu === undefined && (
        <h1 className="text-2xl font-bold m-2 text-center p-2">Crea un nou menú</h1>
      )}
      {idMenu && (
        <h1 className="text-2xl font-bold m-2 text-center p-2">
          Edició del menú {menu?.nom}
        </h1>
      )}
                <form className="justify-items-center w-full" onSubmit={handleSubmit}>
                    <section className="bg-bronze-200 rounded-md m-2 mx-8 grid grid-cols-2 justify-items-center gap-2 p-2">
                        <Input
                            isRequired
                            label="Nom del menú"
                            value={name}
                            onChange={handleNameChange}
                        />

                        <Input
                            isRequired
                            type="number"
                            label="Preu"
                            value={preu.toString()}
                            min={0}
                            step={0.01}
                            onChange={handlePreuChange}
                            endContent={
                                <div className="flex items-center">
                                    <span className="text-default-400 text-small">€</span>
                                </div>
                            }
                        />
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Primers</h2>
                        <label htmlFor="platSelect" className="block text-lg font-medium text-gray-700">Selecciona un grup</label>
                        {menu && menu.idGrupPrimerPlat && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handlePrimersSelect}
                            // value={selectedPrimers ?? ''}
                            defaultSelectedKeys={[menu?.idGrupPrimerPlat.toString()]}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}

                        {(idMenu == undefined || menu?.idGrupPrimerPlat == undefined) && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handlePrimersSelect}
                            value={selectedPrimers ?? ''}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}
                        
                        {/* <h3 className="col-span-2 font-semibold">Llista de plats</h3> */}

                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Segons</h2>
                        <label htmlFor="platSelect" className="block text-lg font-medium text-gray-700">Selecciona un grup</label>
                        {menu && menu.idGrupSegonPlat && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handleSegonsSelect}
                            // value={selectedPrimers ?? ''}
                            defaultSelectedKeys={[menu?.idGrupSegonPlat.toString()]}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}

                        {(idMenu == undefined || menu?.idGrupSegonPlat == undefined) && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handleSegonsSelect}
                            value={selectedSegons ?? ''}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}
                        {/* <h3 className="col-span-2 font-semibold">Llista de plats</h3> */}

                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Postres</h2>
                        <label htmlFor="platSelect" className="block text-lg font-medium text-gray-700">Selecciona un grup</label>
                        {menu && menu.idGrupPostres && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handlePostresSelect}
                            // value={selectedPrimers ?? ''}
                            defaultSelectedKeys={[menu?.idGrupPostres.toString()]}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}

                        {(idMenu == undefined || menu?.idGrupPostres == undefined) && (
                            <Select
                            id="platSelect"
                            aria-label="Selecciona un grup"
                            placeholder="Selecciona un grup"
                            onChange={handlePostresSelect}
                            value={selectedPostres ?? ''}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                            {grupsPlats?.map((grup, index) => (
                                <SelectItem key={grup.id} value={index.toString()}>
                                {grup.nomGrup}
                                </SelectItem>
                            ))}
                        </Select>
                        )}
                        {/* <h3 className="col-span-2 font-semibold">Llista de plats</h3> */}

                    </section>
                    <button type="submit" className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                        Desa <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                </form>

                <Link href={`/carta`}>
                    <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                        Torna al menú <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            </div>
        </Layout>
    );
}   