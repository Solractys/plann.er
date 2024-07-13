import { Calendar, CircleCheck, CircleDashed, Link2, MapPin, Plus, Settings2, Tag, UserCog, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

export function TripDetails() {
    const path = useLocation()
    const [trip, setTrip] = useState<Trip | undefined>();

    useEffect(() => {
     api.get(path.pathname).then(response => setTrip(response.data.trip));
}, [])

    const displayDate = trip? format(trip?.starts_at, "d' de 'LLL")
    .concat(" até ").concat(format(trip?.ends_at, "d' de 'LLL")): null;
    const [isOpenModalActiv, setIsOpenModalActiv] = useState(false);
    function OpenModalActiv() {
        setIsOpenModalActiv(true);
    }
    function CloseModalActiv() {
        setIsOpenModalActiv(false);
    }
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            {isOpenModalActiv && (
                <div className="fixed  bg-black/60 inset-0 flex items-center justify-center">
                    <div className="max-w-[560px] w-full space-y-4 bg-zinc-900 py-5 px-6 rounded-md">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl text-white">Confirmar criação de viagem</h1>
                            <button className="" onClick={CloseModalActiv}><X className="text-zinc-400" /></button>
                        </div>
                        <p className="text-sm mb-4 text-zinc-400">Todos convidados podem visualizar as atividades.</p>

                        <form className=" gap-3 flex flex-col w-full items-center">
                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                <Tag className="size-5 text-zinc-400" />
                                <input
                                    name="Activity"
                                    type="text"
                                    className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                                    placeholder="Qual a atividade?" />
                            </div>
                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                <Calendar className="size-5 text-zinc-400" />
                                <input
                                    name="fullName"
                                    type="datetime-local"
                                    className=" placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                                    placeholder="Seu e-mail pessoal" />
                            </div>

                            <button
                                className="bg-blueisa justify-center w-full py-3 px-5 text-lime-50 font-medium flex items-center rounded-md gap-2 hover:bg-blue-700"
                                type="submit">Salvar atividade</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="px-4 h-16 rounded-md bg-zinc-900 shadow-shape flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400 " />
                    <span className="text-zinc-100">{trip?.destination}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 ">
                        <Calendar className="size-5 text-zinc-400" />
                        <span>{displayDate}</span>
                    </div>
                    <button className="bg-zinc-800 px-5 py-2 flex items-center gap-2 rounded-md shadow-shape">Alterar local/hora
                        <Settings2 className="text-zinc-400" /></button>
                </div>
            </div>

            <main className="flex px-3 gap-16  justify-center">
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-50 font-bold text-3xl">Atividades</h1>
                        <button onClick={OpenModalActiv} className="bg-blueisa px-5 py-2 rounded-md flex items-center gap-2">
                            <Plus className="text-lime-50" />
                            <span className="text-lime-50">Cadastrar atividade</span>
                        </button>
                    </div>

                    <div className="space-y-8">

                        <div className="space-y-3 ">
                            <div className="flex text-left items-baseline gap-2">
                                <h1 className="font-semibold">Dia 17</h1>
                                <span className="text-xs text-zinc-400">Sábado</span>
                            </div>
                            <p className="text-lg text-zinc-400 font-light">Nenhuma atividade registrada para hoje.</p>
                        </div>

                        <div className="space-y-3 ">
                            <div className="flex text-left items-baseline gap-2">
                                <h1 className="font-semibold">Dia 18</h1>
                                <span className="text-xs text-zinc-400">Domingo</span>
                            </div>
                            <div className="bg-zinc-900 h-12 flex items-center px-4 rounded-lg shadow-shape">
                                <div className="flex items-center gap-4">
                                    <CircleCheck className="text-blueisa size-5" />
                                    <p className="text-lg text-zinc-400 font-light">Corrida de Kart</p>
                                </div>
                                <span className="ml-auto font-light text-zinc-400">8:00h</span>
                            </div>
                            <div className="bg-zinc-900 h-12 flex items-center px-4 rounded-lg shadow-shape">
                                <div className="flex items-center gap-4">
                                    <CircleCheck className="text-blueisa size-5" />
                                    <p className="text-lg text-zinc-400 font-light">Corrida de Kart</p>
                                </div>
                                <span className="ml-auto font-light text-zinc-400">8:00h</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-80 space-y-4">
                    <div className="space-y-4">
                        <h1 className="font-bold text-2xl">Links importantes</h1>
                        <div className="space-y-4">
                            <div className=" flex justify-between items-center">
                                <div className=" flex items-start flex-col">
                                    <span className=" text-left text-zinc-100">Regras do AirBnB</span>
                                    <span className="text-zinc-400 w-full truncate">https://www.airbnb.com.br/rooms/104700011123123123123123123123</span>
                                </div>
                                <div>
                                    <a href=""><Link2 className="size-5 shrink-0" /></a>
                                </div>
                            </div>
                            <div className=" flex justify-between items-center">
                                <div className=" flex items-start flex-col">
                                    <span className=" text-left text-zinc-100">Regras do AirBnB</span>
                                    <span className="text-zinc-400 w-full truncate">https://www.airbnb.com.br/rooms/104700011123123123123123123123</span>
                                </div>
                                <div>
                                    <a href=""><Link2 className="size-5 shrink-0" /></a>
                                </div>
                            </div>
                        </div>
                        <button className="w-full h-11 bg-zinc-800 gap-2 shadow-shape rounded-md flex items-center justify-center text-zinc-100 px-5 py-2">
                            <Plus className="size-5 text-zinc-100" />
                            Cadastrar novo link</button>
                    </div>

                    <div className="bg-zinc-800 w-full h-px"></div>

                    <div className="space-y-6">
                        <h1 className="text-zinc-100 font-bold text-2xl text-left">Convidados</h1>

                        <div className="space-y-8">
                            <div className=" flex justify-between items-center">
                                <div className=" flex items-start flex-col">
                                    <span className=" text-left text-zinc-100">Jessica White</span>
                                    <span className="text-zinc-400 w-full truncate">jessica.white44@yahoo.com</span>
                                </div>
                                <div >
                                    <CircleCheck className="text-blueisa size-5 shrink-0" />
                                </div>
                            </div>
                            <div className=" flex justify-between items-center">
                                <div className=" flex items-start flex-col">
                                    <span className=" text-left text-zinc-100">Dr. Rita Pacocha</span>
                                    <span className="text-zinc-400 w-full truncate">lacy.stiedemann@gmail.com</span>
                                </div>
                                <div >
                                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                                </div>
                            </div>
                        </div>
                        <button className="w-full h-11 bg-zinc-800 gap-2 shadow-shape rounded-md flex items-center justify-center text-zinc-100 px-5 py-2">
                            <UserCog className="size-5 text-zinc-100" />
                            Gerenciar convidados</button>
                    </div>
                </div>
            </main>
        </div>
    )
}