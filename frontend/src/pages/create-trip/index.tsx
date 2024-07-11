'use client'
import { ArrowRight, UserRoundPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationStep } from "./steps/destination-step";
import { InviteGuestStep } from "./steps/invite-guest-step";

export function CreateTrip() {

    const navigate = useNavigate();
    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate('/trips/666');
    }
    const [isOpenGuest, setIsOpenGuest] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [confirmModal, setConfirmModal] = useState(false);
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
    return (
        <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="space-y-4">
                    <div className="flex items-center flex-col gap-4">
                        <img src="logo.svg" alt="plann.er" className="w-44" />
                        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                    </div>

                    <DestinationStep
                        isOpenGuest={isOpenGuest}
                        CloseGuestInvite={CloseGuestInvite}
                        OpenGuestInvite={OpenGuestInvite}
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
                />
            )}
        </div>
    )
}