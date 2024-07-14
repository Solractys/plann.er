'use client'
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationStep } from "./steps/destination-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { X } from "lucide-react";
import { ScaleLoader } from "react-spinners";

export function CreateTrip() {

    const navigate = useNavigate();
    const [isOpenGuest, setIsOpenGuest] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ModalError, setModalError] = useState(false);

    const [Destination, setDestination] = useState('');
    const [OwnerName, setOwnerName] = useState('');
    const [EmailOwner, setEmailOwner] = useState('');
    const [EventDate, setEventDate] = useState<DateRange | undefined>();

    function openModalError() {
        setModalError(true);
    }
    function closeModalError() {
        setModalError(false);
    }

    function OpenConfirmModal() {
        setConfirmModal(true);
    }
    function CloseConfirmModal() {
        setConfirmModal(false);
    }
    function addEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('guestEmail')?.toString();
        if (!email) {
            return;
        }
        setEmails([
            ...emails,
            email
        ]);
        event.currentTarget.reset();
    }
    function removeEmail(emailToRemove: string) {
        const newListEmail = emails.filter(email => email !== emailToRemove);
        setEmails(newListEmail);
    }

    function OpenModal() {
        setIsModalOpen(true);
    }
    function CloseModal() {
        setIsModalOpen(false);
    }
    function OpenGuestInvite() {
        setIsOpenGuest(true);
    }
    function CloseGuestInvite() {
        setIsOpenGuest(false);
    }
    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!Destination) {
            openModalError();
            return
        }
        if (!OwnerName || !EmailOwner) {
            openModalError();
            return
        }
        if (!EventDate?.from || !EventDate.to) {
            openModalError();
            return
        }
        const response = await api.post('/trips', {
            destination: Destination,
            starts_at: EventDate?.from,
            ends_at: EventDate?.to,
            emails_to_invite:
                emails
            ,
            owner_name: OwnerName,
            owner_email: EmailOwner
        })
        const { tripId } = response.data;
        setConfirmModal(false);
        return navigate(`/trips/${tripId}`);
    }
    return (
        <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="space-y-4">
                    <div className="flex items-center flex-col gap-4">
                        <img src="logo.svg" alt="plann.er" className="w-44" />
                        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                    </div>
                    {isLoading && (
                        <div className="z-10 fixed bg-black/60 inset-0 flex items-center justify-center">
                            <div>
                                <ScaleLoader color="#0000FF" radius={50} height={50} width={7} />
                            </div>
                        </div>
                    )}

                    <DestinationStep
                        isOpenGuest={isOpenGuest}
                        CloseGuestInvite={CloseGuestInvite}
                        OpenGuestInvite={OpenGuestInvite}
                        setDestination={setDestination}
                        setEventDate={setEventDate}
                        EventDate={EventDate}
                    />

                    {isOpenGuest && (
                        <InviteGuestStep
                            OpenConfirmModal={OpenConfirmModal}
                            OpenModal={OpenModal}
                            emails={emails}
                        />
                    )}
                </div>
                <p className="text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
                    com nossos <a className="text-zinc-300 underline" href="">termos de uso</a> e <a className="text-zinc-300 underline" href="">políticas de privacidade</a>.
                </p>
            </div>
            {isModalOpen && (
                <InviteGuestModal
                    CloseModal={CloseModal}
                    emails={emails}
                    addEmail={addEmail}
                    removeEmail={removeEmail}
                />
            )}

            {confirmModal && (
                <ConfirmTripModal
                    CloseConfirmModal={CloseConfirmModal}
                    createTrip={createTrip}
                    setEmailOwner={setEmailOwner}
                    setOwnerName={setOwnerName}
                    destination={Destination}
                    eventDate={EventDate}
                />
            )}
            {ModalError && (
                <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
                    <div className="w-[420px] border border-red-600 space-y-4 bg-zinc-900 py-5 px-6 rounded-md">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl text-zinc-50">Erro ao tentar criar viagem</h1>
                            <button className="" onClick={closeModalError}><X className="text-zinc-400" /></button>
                        </div>
                        <p className=" mb-4 text-zinc-400">Preencha os dados corretamente</p>
                    </div>
                </div>
            )}
        </div>
    )
}