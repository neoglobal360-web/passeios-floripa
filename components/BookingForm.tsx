'use client'

import { useActionState } from 'react'
import { bookTour, BookingState } from '@/app/actions/bookTour'

const initialState: BookingState = {}

export default function BookingForm({ 
  tourId, 
  tourTitle, 
  onClose 
}: { 
  tourId: string
  tourTitle: string
  onClose: () => void 
}) {
  const [state, formAction, isPending] = useActionState(bookTour, initialState)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-[24px] p-6 border border-[var(--border)] shadow-[var(--shadow-lg)] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] font-bold text-[14px] text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--blue)] mb-1">
          <span className="h-2 w-2 rounded-full bg-[var(--turquoise)]" />
          Agendamento Online
        </div>

        <h3 className="text-[20px] font-extrabold text-[var(--text)] mb-1">
          {tourTitle}
        </h3>
        <p className="text-[13px] text-[var(--text-muted)] mb-5">
          Selecione a data e a quantidade de pessoas para garantir os seus lugares.
        </p>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="tourId" value={tourId} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--text-muted)] mb-1">
                Data do Passeio *
              </label>
              <input
                type="date"
                name="chosenDate"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-11 px-3 border border-[var(--border)] rounded-[12px] bg-[var(--bg)] text-[14px] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--text-muted)] mb-1">
                Pessoas *
              </label>
              <input
                type="number"
                name="guestsCount"
                defaultValue={1}
                min={1}
                max={20}
                className="w-full h-11 px-3 border border-[var(--border)] rounded-[12px] bg-[var(--bg)] text-[14px] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[var(--text-muted)] mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              name="userName"
              required
              placeholder="Ex: Maria Silva"
              className="w-full h-11 px-3 border border-[var(--border)] rounded-[12px] bg-[var(--bg)] text-[14px] font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--text-muted)] mb-1">
                E-mail *
              </label>
              <input
                type="email"
                name="userEmail"
                required
                placeholder="seu@email.com"
                className="w-full h-11 px-3 border border-[var(--border)] rounded-[12px] bg-[var(--bg)] text-[14px] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--text-muted)] mb-1">
                WhatsApp *
              </label>
              <input
                type="tel"
                name="userPhone"
                required
                placeholder="(48) 99999-9999"
                className="w-full h-11 px-3 border border-[var(--border)] rounded-[12px] bg-[var(--bg)] text-[14px] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-[var(--blue)] text-white font-bold rounded-full hover:bg-[var(--blue-dark)] transition disabled:opacity-50 mt-2"
          >
            {isPending ? 'A guardar...' : 'Confirmar Reserva de Data'}
          </button>

          {state.error && <p className="text-red-500 text-[13px] text-center font-bold">{state.error}</p>}
          {state.success && (
            <div className="text-center space-y-2">
              <p className="text-emerald-600 text-[13px] font-bold">{state.message}</p>
              <button
                type="button"
                onClick={onClose}
                className="text-[12px] font-bold text-[var(--blue)] underline"
              >
                Fechar janela
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}