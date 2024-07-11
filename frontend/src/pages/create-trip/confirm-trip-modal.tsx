import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
interface ConfirmTripModalProps {
    CloseConfirmModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
}
export function ConfirmTripModal({
    CloseConfirmModal,
    createTrip
}: ConfirmTripModalProps) {
    return (
        <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
            <div className="max-w-[560px] space-y-4 bg-zinc-900 py-5 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-white">Confirmar criação de viagem</h1>
                    <button className="" onClick={CloseConfirmModal}><X className="text-zinc-400" /></button>
                </div>
                <p className="text-sm mb-4 text-zinc-400">Para concluir a criação da viagem para <span className=" font-semibold text-zinc-50">Florianópolis, Brasil
                </span> nas datas de <span className="font-semibold text-zinc-50">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>

                <form onSubmit={createTrip} className=" gap-3 flex flex-col w-full items-center">
                    <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                        <User className="size-5 text-zinc-400" />
                        <input
                            name="fullName"
                            type="text"
                            className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                            placeholder="Seu nome completo" />
                    </div>
                    <div className=" bg-zinc-950 h-16 p-4 shadow-shape flex text-left w-full rounded-md items-center gap-2">
                        <Mail className="size-5 text-zinc-400" />
                        <input
                            name="fullName"
                            type="text"
                            className="placeholder:text-zinc-400 w-full text-zinc-50 outline-none bg-transparent"
                            placeholder="Seu e-mail pessoal" />
                    </div>

                    <button  
                    className="bg-lime-300 justify-center w-full py-3 px-5 text-lime-950 font-medium flex items-center rounded-md gap-2 hover:bg-lime-400"
                        type="submit">Comfirmar criação da viagem</button>
                </form>
            </div>
        </div>
    )
}