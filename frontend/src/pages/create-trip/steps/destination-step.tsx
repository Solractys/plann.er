import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";

interface DestinationStepProps {
    isOpenGuest: boolean
    CloseGuestInvite: () => void
    OpenGuestInvite: () => void
    setDestination: (destination: string) => void
    setEventDate: (EventDate: DateRange | undefined) => void
    EventDate: DateRange| undefined
}

export function DestinationStep({
    isOpenGuest,
    CloseGuestInvite,
    OpenGuestInvite,
    setDestination,
    setEventDate,
    EventDate
    
}: DestinationStepProps) {
    const [DatePickerOpen, setDatePickerOpen] = useState(false);
    const displayDate = EventDate && EventDate.from && EventDate.to ? format(EventDate.from, "d' de 'LLL")
    .concat(" até ").concat(format(EventDate.to, "d' de 'LLL",)): undefined;
    
    function OpenDatePicker() {
        setDatePickerOpen(true)
    }
    function closeDatePicker() {
        setDatePickerOpen(false)
    }
    return (
        <div className="h-16 p-4 bg-zinc-900 rounded-xl gap-3 flex justify-between items-center shadow-shape">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    type="text"
                    disabled={isOpenGuest}
                    onChange={(event) => setDestination(event.target.value)}
                    className="bg-transparent text-zinc-50 placeholder:text-zinc-400 text-lg outline-none"
                    placeholder="Para onde você vai?" />
            </div>

            <button
                onClick={OpenDatePicker}
                disabled={isOpenGuest}
                className="flex items-center gap-2 flex-1">
                <Calendar className="size-5 text-zinc-400" />
                <span
                    className=" text-zinc-400 text-left  outline-none">
                    {displayDate ? 
                    displayDate:
                    'Quando?'
                    }
                </span>
            </button>

            {DatePickerOpen && (
                <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
                    <div className=" space-y-4 bg-zinc-900 py-5 px-6 rounded-md">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl text-white">Selecione a data</h1>
                            <button className="bg-blueisa hover:bg-blue-700 active:bg-blueisadark py-1 px-4 text-zinc-50 font-semibold rounded-md shadow-shape" onClick={closeDatePicker}>Enviar</button>
                        </div>
                        <DayPicker locale={ptBR} 
                        classNames={defaultStyles} 
                        className=" text-zinc-400" 
                        mode="range"
                        selected={EventDate} 
                        onSelect={setEventDate} />
                    </div>
                </div>
            )}

            <div className="w-[2px] bg-zinc-800 h-6"></div>
            {isOpenGuest ? (
                <button onClick={CloseGuestInvite}
                    className="bg-zinc-800 py-2 px-5 text-zinc-50 font-medium flex items-center text-sm rounded-md gap-1 hover:bg-zinc-700"
                    type="button">Alterar local/data<Settings2 className="size-5" /></button>
            ) : (
                <button onClick={OpenGuestInvite}
                    className="bg-blueisa py-2 px-5 text-zinc-100 font-medium flex items-center rounded-md gap-2 hover:bg-blue-400"
                    type="button">Continuar<ArrowRight className="size-5 text-zinc-100" /></button>
            )}
        </div>
    )
}