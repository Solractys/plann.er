import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";

interface InviteGuestModalProps {
    CloseModal: () => void
    emails: string[]
    addEmail: (event: FormEvent<HTMLFormElement>) => void
    removeEmail: (email: string) => void
}

export function InviteGuestModal({
    CloseModal,
    emails,
    addEmail,
    removeEmail
}: InviteGuestModalProps) {
    return (
        <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
            <div className="w-[640px] space-y-4 bg-zinc-950 py-5 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-white">Selecionar convidados</h1>
                    <button className="" onClick={CloseModal}><X className="text-zinc-400" /></button>
                </div>
                <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
                <div className="flex flex-wrap gap-2">
                    {emails.map(email => {
                        return (
                            <div key={email} className="bg-zinc-800 p-2 shadow-shape text-sm flex rounded-md gap-2 items-center text-zinc-300">
                                <span>{email}</span>
                                <button>
                                    <X onClick={() => removeEmail(email)} className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="h-px bg-zinc-800"></div>

                <form onSubmit={addEmail} className="h-16 p-4 bg-black rounded-xl gap-3 flex justify-between items-center shadow-shape">
                    <div className="flex items-center text-left gap-2">
                        <AtSign className="size-5 text-zinc-400" />
                        <input
                            name="guestEmail"
                            type="text"
                            className="placeholder:text-zinc-400 w-[340px] text-zinc-50 outline-none bg-transparent"
                            placeholder="Digite o e-mail do convidado" />
                    </div>

                    <button className="bg-lime-300 py-2 px-5 text-zinc-950 font-medium flex items-center rounded-md gap-2 hover:bg-lime-400"
                        type="submit">Convidar<Plus className="size-5 text-zinc-950" /></button>
                </form>
            </div>
        </div>
    )
}