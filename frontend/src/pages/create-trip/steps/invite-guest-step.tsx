import { ArrowRight, UserRoundPlus } from "lucide-react";
interface InviteGuestStepProps {
    OpenModal: () => void
    emails: string[]
    OpenConfirmModal: () => void
}
export function InviteGuestStep({
    OpenModal,
    OpenConfirmModal,
    emails
}: InviteGuestStepProps) {
    return (
        <div className="h-16 p-4 bg-zinc-900 rounded-xl gap-3 flex justify-between items-center shadow-shape">
            <button onClick={OpenModal} type="button" className="flex items-center text-left gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emails.length > 0 ? (
                    <span className="text-zinc-100">{emails.length} pessoa(s) convidada(s)</span>
                ) :
                    <span className="text-zinc-400">Quem estará na viagem?</span>
                }
            </button>

            <button onClick={OpenConfirmModal}
                className="bg-blueisa py-2 px-5 text-zinc-50 font-medium flex items-center rounded-md gap-2 hover:bg-blue-700"
                type="button">Confirmar Viagem<ArrowRight className="size-5 text-zinc-50" /></button>
        </div>

    )
}