'use client'
import { ArrowRight, AtSign, Calendar, DiscAlbum, MapPin, Plus, Settings2, UserRoundPlus, X } from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isOpenGuest, setIsOpenGuest] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emails, setEmails] = useState([
    'Solractys@gmail.com',
    'isabellaquei23@gmail.com'
  ]);
  function addEmail(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('guestEmail')?.toString();
    if(!email){
      return;
    }
    setEmails([
      ...emails,
      email
    ]);
    event.currentTarget.reset();
  }
  function removeEmail(emailToRemove: string){
    const newListEmail = emails.filter(email => email !== emailToRemove );
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

          <div className="h-16 p-4 bg-zinc-900 rounded-xl gap-3 flex justify-between items-center shadow-shape">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input type="text" disabled={isOpenGuest} className="bg-transparent text-zinc-50 placeholder:text-zinc-400 text-lg outline-none" placeholder="Para onde você vai?" />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input type="text" disabled={isOpenGuest} className="bg-transparent text-zinc-50 placeholder:text-zinc-400  text-lg outline-none w-40" placeholder="Quando?" />
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
          {isOpenGuest && (
            <div className="h-16 p-4 bg-zinc-900 rounded-xl gap-3 flex justify-between items-center shadow-shape">
              <button onClick={OpenModal} type="button" className="flex items-center text-left gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-zinc-400">Para onde você vai?</span>
              </button>

              <button onClick={OpenGuestInvite} className="bg-lime-300 py-2 px-5 text-zinc-950 font-medium flex items-center rounded-md gap-2 hover:bg-lime-400"
                type="button">Confirmar Viagem<ArrowRight className="size-5 text-zinc-950" /></button>
            </div>
          )}
        </div>
        <p className="text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a className="text-zinc-300 underline" href="">termos de uso</a> e <a className="text-zinc-300 underline" href="">políticas de privacidade</a>.
        </p>
      </div>
      {isModalOpen && (
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
      )}
    </div>
  )
}