import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { Input, Button } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGrupPlats } from "@/utils/interfaces";
import { addGrupPlats, addPlat, getGrupPlats, getGrupsPlats, updateGrupPlats, updatePlat } from "@/utils/api";


export default function editaGrupPlats (){
    const router = useRouter();
    // const idGrup: string = router.asPath.split('=')[1];


    const [idGrup, setIdGrup] = useState<string | undefined>(undefined);



    const [name, setName] = useState('');
    const [selectedPlat, setSelectedPlat] = useState<number | null>(null); // Estat per al plat seleccionat
    const [platName, setPlatName] = useState('');
    const [platPreu, setPlatPreu] = useState<number>(0);

    const [newPlatName, setNewPlatName] = useState('');
    const [newPlatPreu, setNewPlatPreu] = useState<number>(0);

    const [refresh, setRefresh] = useState<boolean>(false);

    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats>();
    
    useEffect(() => {
    if (router.isReady) {
      const idGrupFromUrl = router.asPath.split('=')[1];
      setIdGrup(idGrupFromUrl);
    }
  }, [router.isReady, router.asPath]);
        
    useEffect(() => {
        // TODO: agadar el id del grup des de la url
        // Coger idGrup desde la url
        if (idGrup !== undefined) {
            getGrupPlats(1, idGrup)
            .then(response => {
                console.log(response);
                setGrupsPlats(response);
                setName(response.nomGrup);

            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        }   
    }, [idGrup, refresh]);

    useEffect(() => {
        if (grupsPlats && selectedPlat !== null){
            if (grupsPlats.plat[selectedPlat]) {
                setPlatName(grupsPlats.plat[selectedPlat].nom);
                setPlatPreu(grupsPlats.plat[selectedPlat].preu);
            }
        }
    }, [grupsPlats, selectedPlat]);

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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (idGrup == undefined) {
            console.log('Creant grup', name);
            addGrupPlats(1, name)
            .then(response => {
                console.log(response);

                router.push(`/editaGrupPlats?idGrup=${response.id}`);
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        } else {
            if (grupsPlats == undefined) return;
            console.log('Editant grup');
            updateGrupPlats(grupsPlats?.id, name)
            .then(response => {
                console.log(response);
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error('Error when update plats: ', error);
            });
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
        console.log('Afegint plat', newPlatName, newPlatPreu, grupsPlats?.id);
        if (grupsPlats?.id == undefined) return;
        addPlat(1, newPlatName, newPlatPreu, grupsPlats?.id)
        .then(response => {
            console.log(response);
            setRefresh(!refresh);
            setNewPlatName('');
            setNewPlatPreu(0);
        })
        .catch((error) => {
            console.error('Error when update plats: ', error);
        });

    }

    const handleDeletePlat = (platId: number) => {
    };

    const handlePlatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlat(parseInt(e.target.value));
    };

  return (
    <Layout>
            <div className="justify-items-right">
            {idGrup === undefined && (
        <h1 className="text-2xl font-bold m-2 text-center p-2">Crea un nou grup</h1>
      )}
      {idGrup && (
        <h1 className="text-2xl font-bold m-2 text-center p-2">
          Edició del grup {grupsPlats?.nomGrup}
        </h1>
      )}
                {/* <h1 className="text-2xl font-bold m-2 text-center p-2">Edició del grup {grupsPlats?.nomGrup}</h1> */}
                <form className="justify-items-center w-full" onSubmit={handleSubmit}>
                    <section className="bg-bronze-200 rounded-md m-2 p-2">
                        <Input
                            isRequired
                            label="Nom del grup"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </section>
                    <button type="submit" className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                        Desa <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                </form>

                <section>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Modifica un plat</h2>
                    <div className="mb-4 mx-8">
                        <label htmlFor="platSelect" className="block text-lg font-medium text-gray-700">Selecciona un plat</label>
                        <select
                            id="platSelect"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={selectedPlat ?? ''}
                            onChange={handlePlatSelect}
                        >
                            <option value="" disabled>Selecciona un plat</option>
                            {grupsPlats?.plat.map((plat, index) => (
                                <option key={plat.id} value={index}>
                                    {plat.nom}
                                </option>
                            ))}
                        </select>
                    </div>
{/* La comparacio amb undefined ha danar a dalt perque inclogui el select */}
                    {selectedPlat !== null && grupsPlats && idGrup !== undefined &&(
                        <article className="bg-bronze-200 rounded-md m-2 mx-8 grid grid-cols-2 justify-items-center gap-2 p-2">
                            <h3 className="col-span-2 font-semibold">{grupsPlats.plat[selectedPlat].nom}</h3>
                            <Input
                                label="Nom del plat"
                                value={platName}
                                onChange={handlePlatNameChange}
                            />
                            <Input
                                type="number"
                                label="Preu"
                                value={platPreu.toString()}
                                min={0}
                                step={0.01}
                                onChange={handlePlatPreuChange}
                                endContent={
                                    <div className="flex items-center">
                                        <span className="text-default-400 text-small">€</span>
                                    </div>
                                }
                            />
                            <button onClick={() => handleDeletePlat(grupsPlats.plat[selectedPlat].id)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                                Elimina'l <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button onClick={() => handleSavePlat(grupsPlats.plat[selectedPlat].id, platName, platPreu, grupsPlats.id)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                                Desa'l <FontAwesomeIcon icon={faFloppyDisk} />
                            </button>
                        </article>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Afegir un nou plat</h2>
                    {idGrup !== undefined &&(
                        <article className="bg-bronze-200 rounded-md m-2 mx-8 grid grid-cols-2 justify-items-center gap-2 p-2">
                            <Input
                                label="Nom del plat"
                                // value={platName}
                                onChange={handleNewPlatNameChange}
                            />
                            <Input
                                type="number"
                                label="Preu"
                                // value={platPreu.toString()}
                                min={0}
                                step={0.01}
                                onChange={handleNewPlatPreuChange}
                                endContent={
                                    <div className="flex items-center">
                                        <span className="text-default-400 text-small">€</span>
                                    </div>
                                }
                            />
                            <button onClick={handleAddPlat} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                                Afegeix <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </article>
                    )}
                </section>

                <Link href={`/carta`}>
                    <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                        Torna al menú <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            </div>
        </Layout>
    );
}   