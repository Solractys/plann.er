import { Calendar, CircleCheck, CircleDashed, Link2, Link2Icon, MapPin, Plus, Settings2, Tag, TagIcon, UserCog, X } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}
interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}
interface Link {
    id: string
    title: string
    url: string
}
interface Activity {
    date: string
    activities: [{
        id: string
        title: string
        occurs_at: string
    }]
}

export function TripDetails() {
    const path = useLocation()
    const [linkUrl, setLinkUrl] = useState('');
    const [linkName, setLinkName] = useState('')
    const [linkModal, setLinkModal] = useState(false)
    const [trip, setTrip] = useState<Trip | undefined>();

    const [links, setLinks] = useState<Link[]>([])
    const [activities, setActivities] = useState<Activity[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([])

    function OpenLinkModal() {
        setLinkModal(true)
    }
    function CloseLinkModal() {
        setLinkModal(false)
    }

    useEffect(() => {
        api.get(path.pathname).then(response => setTrip(response.data.trip));
        api.get(path.pathname + "/participants").then(response => setParticipants(response.data.participants));
        api.get(path.pathname + "/links").then(response => setLinks(response.data.links));
        api.get(path.pathname + "/activities").then(response => setActivities(response.data.activities));
    }, [path.pathname])
    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!linkUrl || !linkName) {
            return
        }
        const response = await api.post(path.pathname + "/links", {
            title: linkName,
            url: linkUrl
        })
        setLinks(response.data);
        setLinkModal(false);
        api.get(path.pathname + "/links").then(response => setLinks(response.data.links));
    }
    const [atcivityName, setActivityName] = useState('');
    const [occursAt, setOccurtsAt] = useState<string>();

    async function createActivity(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(!atcivityName || !occursAt){
            return;
        }
        await api.post(path.pathname + "/activities", {
            occurs_at: occursAt,
            title: atcivityName
        })
        api.get(path.pathname + "/activities").then(response => setActivities(response.data.activities));
        setIsOpenModalActiv(false)

    }

    const displayDate = trip ? format(trip?.starts_at, "d' de 'LLL", { locale: ptBR })
        .concat(" até ").concat(format(trip?.ends_at, "d' de 'LLL", { locale: ptBR })) : null;

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
                            <h1 className="text-2xl text-white">Cadastro de atividade</h1>
                            <button className="" onClick={CloseModalActiv}><X className="text-zinc-400" /></button>
                        </div>
                        <p className="text-sm mb-4 text-zinc-400">Todos convidados podem visualizar as atividades.</p>

                        <form onSubmit={createActivity} className=" gap-3 flex flex-col w-full items-center">
                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                <Tag className="size-5 text-zinc-400" />
                                <input
                                    name="ActivityName"
                                    onChange={(event) => setActivityName(event.target.value)}
                                    type="text"
                                    className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                                    placeholder="Qual a atividade?" />
                            </div>
                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                <Calendar className="size-5 text-zinc-400" />
                                <input
                                    name="accurs_at"
                                    onChange={(event) => setOccurtsAt(event.target.value)}
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
                    <div
                        className="flex items-center gap-2 ">
                        <Calendar className="size-5 text-zinc-400" />
                        <span>{displayDate}</span>
                    </div>
                    <button
                        className="bg-zinc-800 px-5 py-2 flex items-center gap-2 rounded-md shadow-shape">
                        Alterar local/hora
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

                        {activities.map(activity =>
                            <div key={activity.date} className="space-y-3 ">
                                <div className="flex text-left items-baseline gap-2">
                                    <h1 className="font-semibold">
                                        Dia {format(activity.date, "d")}
                                    </h1>
                                    <span
                                        className="text-xs text-zinc-400">
                                        {format(activity.date, "EEEE", { locale: ptBR })}
                                    </span>
                                </div>
                                {activity.activities.length > 0 ?
                                    activity.activities.map(todo =>
                                        <div key={todo.id}
                                            className="bg-zinc-900 h-12 flex items-center px-4 rounded-lg shadow-shape">
                                            <div className="flex items-center gap-4">
                                                <CircleCheck className="text-blueisa size-5" />
                                                <p className="text-lg text-zinc-400 font-light">{todo.title}</p>
                                            </div>
                                            <span
                                                className="ml-auto font-light text-zinc-400">
                                                {format(todo.occurs_at, "HH:mm 'h'", { locale: ptBR })}
                                            </span>
                                        </div>
                                    )
                                    :
                                    <p
                                        className="text-lg text-zinc-400 font-light">
                                        Nenhuma atividade registrada para este dia.
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-80 space-y-4">
                    <div className="space-y-4">
                        <h1 className="font-bold text-2xl">Links importantes</h1>
                        <div className="space-y-4">
                            {links.length > 0 ? links.map(link =>
                                <div key={link.id} className=" flex justify-between items-center">
                                    <div className=" flex items-start flex-col">
                                        <span className=" text-left text-zinc-100">{link.title}</span>
                                        <span className="text-zinc-400 w-full truncate">{link.url}</span>
                                    </div>
                                    <div>
                                        <a href={link.url}><Link2 className="size-5 shrink-0" /></a>
                                    </div>
                                </div>
                            ) :
                                <span>Sem Links cadastrados</span>
                            }
                            {linkModal && (
                                <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
                                    <div className="max-w-[560px] space-y-4 bg-zinc-900 py-5 px-6 rounded-md">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-2xl text-white">Cadastrar link</h1>
                                            <button className="" onClick={CloseLinkModal}><X className="text-zinc-400" /></button>
                                        </div>
                                        <p className="text-sm mb-4 text-zinc-400">Adicione o título e a url do link que deseja compartilhar com os seus convidados</p>

                                        <form onSubmit={createLink} className=" gap-3 flex flex-col w-full items-center">
                                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                                <TagIcon className="size-5 text-zinc-400" />
                                                <input
                                                    name="linkName"
                                                    type="text"
                                                    onChange={(event) => setLinkName(event.target.value)}
                                                    className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                                                    placeholder="Titulo do Link" />
                                            </div>
                                            <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                                                <Link2Icon className="size-5 text-zinc-400" />
                                                <input
                                                    name="url"
                                                    type="text"
                                                    onChange={(event) => setLinkUrl(event.target.value)}
                                                    className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                                                    placeholder="Url do link" />
                                            </div>

                                            <button
                                                className="bg-blueisa active:bg-blueisadark justify-center w-full py-3 px-5 text-blue-50 font-medium flex items-center rounded-md gap-2 hover:bg-blue-700"
                                                type="submit">Criar Link</button>
                                        </form>
                                    </div>
                                </div>
                            )}

                        </div>
                        <button onClick={OpenLinkModal} className="w-full h-11 hover:bg-zinc-700 bg-zinc-800 gap-2 shadow-shape rounded-md flex items-center justify-center text-zinc-100 px-5 py-2">
                            <Plus className="size-5 text-zinc-100" />
                            Cadastrar novo link</button>
                    </div>

                    <div className="bg-zinc-800 w-full h-px"></div>

                    <div className="space-y-6">
                        <h1 className="text-zinc-100 font-bold text-2xl text-left">Convidados</h1>

                        <div className="space-y-8">
                            {participants.map((participant, index) =>
                                <div key={participant.id} className=" flex justify-between items-center" >
                                    <div className=" flex items-start flex-col">
                                        <span className=" text-left text-zinc-100">Convidado(a) {index}</span>
                                        <span className="text-zinc-400 w-full truncate">{participant.email}</span>
                                    </div>
                                    <div>
                                        {participant.is_confirmed ?
                                            (<CircleCheck className="text-blueisa size-5 shrink-0" />) :
                                            <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            className="w-full hover:bg-zinc-700 h-11 bg-zinc-800 gap-2 shadow-shape rounded-md flex items-center justify-center text-zinc-100 px-5 py-2">
                            <UserCog className="size-5 text-zinc-100" />
                            Gerenciar convidados
                        </button>
                    </div>
                </div>
            </main >
        </div >
    )
}