import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { Input } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGrupPlats, IPlat, ITaula } from "@/utils/interfaces";
import { getGrupsPlats, getPlatsGrup, getTaula, addLiniaComanda } from "@/utils/api";


export default function afegirPlat (){
    const router = useRouter();
    const [idComanda, setIdComanda] = useState<string | undefined>(undefined);
    const [idTaula, setIdTaula] = useState<string | undefined>(undefined);

    console.log("Taula", idTaula);
    console.log("Comanda", idComanda);

    const [selectedGrup, setSelectedGrup] = useState<number | null>(null); // Estat per al grup seleccionat
    const [selectedPlat, setSelectedPlat] = useState<number | null>(null); // Estat per al plat seleccionat

    const [taula, setTaula] = useState<ITaula>();
    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats[]>([]);
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
            getGrupsPlats(taula[0].idRestaurant)
            .then(response => {
                setGrupsPlats(response);
            })
            .catch((error) => {
                console.error('Error when get grupsplats: ', error);
            });
        }
    }, [taula])

    useEffect(() => {
        console.log("SelectedGrup", selectedGrup);
        if(selectedGrup != null) {
            getPlatsGrup(Number(selectedGrup))
            .then(response => {
                console.log("Resposta selectedGrup", response);
                setPlatsGrup(response);
            })
            .catch((error) => {
                console.error('Error when get grup plat: ', error);
            });
        }
    }, [selectedGrup])

    const handlePlatQuantitatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatQuantitat(parseFloat(e.target.value));
    };
    

    const handleGrupPlatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGrup(parseInt(e.target.value));
        setSelectedPlat(null);
    };


    const handlePlatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlat(parseInt(e.target.value));
    };

    const afegirLiniaComanda = (idComanda: number, idPlat: number, quantitat: number) => {
        if(idComanda && idPlat && quantitat){
            addLiniaComanda(idComanda, idPlat, quantitat)
            .then(response => {
                setSelectedGrup(null);
                setSelectedPlat(null);
            })
            .catch((error) => {
                console.error('Error when add comanda: ', error);
            }); 
        }
    };

  return (
    <Layout>
            <div className="justify-items-right">
                {idComanda == undefined && (<h2 className="text-2xl font-bold m-2 text-center p-2">Hi ha hagut un error al obtenir el restaurant</h2>)}
                {idComanda && (<h2 className="text-2xl font-bold m-2 text-center p-2">Afegir un plat a la comanda {idComanda}</h2>)}
                <section>
                    <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista de grups de plats</h2>
                        <div className="mb-4">
                            <label htmlFor="grupPlatSelect" className="block text-lg font-medium text-gray-700">Selecciona un grup de plat</label>
                            <select
                                id="grupPlatSelect"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                value={selectedGrup ?? ''}
                                onChange={handleGrupPlatSelect}
                            >
                                <option value="" disabled>Selecciona un grup de plat</option>
                                {grupsPlats && grupsPlats?.map((grup, index) => (
                                    <option key={grup?.id} value={grup?.id}>
                                        {grup.nomGrup}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </article>
                    {selectedGrup !== null && grupsPlats && (
                        <article className="bg-bronze-200 rounded-md m-2 justify-items-center p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista dels plats del grup</h2>
                            <div className="mb-4">
                                <label htmlFor="platSelect" className="block text-lg font-medium text-gray-700">Selecciona un plat</label>
                                <select
                                    id="platSelect"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedPlat ?? ''}
                                    onChange={handlePlatSelect}
                                >
                                    <option value="" disabled>Selecciona un plat</option>
                                    {platsGrup && platsGrup?.map((plat, index) => (
                                        <option key={plat?.id} value={plat?.id}>
                                            {plat.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>
                    )}

                    {selectedPlat !== null && (
                        <article className="bg-bronze-200 rounded-md m-2 grid grid-cols-1 justify-items-center gap-1 p-1">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Quantitat</h2>
                            <div className="mb-4">
                                <label htmlFor="quantitatSelect" className="block text-lg font-medium text-gray-700">Introdueix la quantitat</label>
                                <Input
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    type="number"
                                    label="Quantitat"
                                    value={platQuantitat.toString()}
                                    min={0}
                                    step={1}
                                    onChange={handlePlatQuantitatChange}
                                    endContent={
                                        <div className="flex items-center">
                                            <span className="text-default-400 text-small">unitats</span>
                                        </div>
                                    }
                                />
                                
                            </div>
                        </article>
                    )}

                </section>
                <div className="m-5 flex justify-center">
                    <button onClick={() => afegirLiniaComanda(Number(idComanda), Number(selectedPlat), Number(platQuantitat))} className={`bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2 
                    ${!selectedPlat ? 'opacity-50 cursor-not-allowed' : '' }`} disabled={!selectedPlat}>
                        Afegeix plat <FontAwesomeIcon icon={faPlus} />
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