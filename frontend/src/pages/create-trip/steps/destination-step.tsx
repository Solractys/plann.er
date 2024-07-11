import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationStepProps {
    isOpenGuest: boolean
    CloseGuestInvite: () => void
    OpenGuestInvite: () => void
}

export function DestinationStep({
    isOpenGuest,
    CloseGuestInvite,
    OpenGuestInvite
}: DestinationStepProps) {
    return (
        <div className="h-16 p-4 bg-zinc-900 rounded-xl gap-3 flex justify-between items-center shadow-shape">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    type="text"
                    disabled={isOpenGuest}
                    className="bg-transparent text-zinc-50 placeholder:text-zinc-400 text-lg outline-none"
                    placeholder="Para onde você vai?" />
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                    type="text"
                    disabled={isOpenGuest}
                    className="bg-transparent text-zinc-50 placeholder:text-zinc-400  text-lg outline-none w-40"
                    placeholder="Quando?" />
            </div>

            <div className="w-[2px] bg-zinc-800 h-6"></div>
            {isOpenGuest ? (
                <button onClick={CloseGuestInvite}
                    className="bg-zinc-800 py-2 px-5 text-zinc-50 font-medium flex items-center text-sm rounded-md gap-1 hover:bg-zinc-700"
                    type="button">Alterar local/data<Settings2 className="size-5" /></button>
            ) : (
                <button onClick={OpenGuestInvite}
                    className="bg-lime-300 py-2 px-5 text-zinc-950 font-medium flex items-center rounded-md gap-2 hover:bg-lime-400"
                    type="button">Continuar<ArrowRight className="size-5 text-zinc-950" /></button>
            )}
        </div>
    )
}