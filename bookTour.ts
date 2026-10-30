'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type BookingState = {
  success?: boolean
  message?: string
  error?: string
}

export async function bookTour(prevState: BookingState, formData: FormData): Promise<BookingState> {
  const userName = formData.get('userName')?.toString().trim()
  const userEmail = formData.get('userEmail')?.toString().trim().toLowerCase()
  const userPhone = formData.get('userPhone')?.toString().trim()
  const tourId = formData.get('tourId')?.toString()
  const chosenDate = formData.get('chosenDate')?.toString()
  const guestsCount = Number(formData.get('guestsCount') || 1)

  if (!userName || !userEmail || !userPhone || !chosenDate || !tourId) {
    return { error: 'Preencha todos os campos e selecione uma data válida.' }
  }

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {}
          },
        },
      }
    )

    const { error } = await supabase
      .from('bookings')
      .insert([{
        user_name: userName,
        user_email: userEmail,
        user_phone: userPhone,
        tour_id: tourId,
        chosen_date: chosenDate,
        guests_count: guestsCount
      }])

    if (error) {
      console.error('Erro ao agendar:', error.message)
      return { error: 'Não foi possível agendar para esta data. Tente novamente.' }
    }

    return {
      success: true,
      message: 'Agendamento solicitado com sucesso!'
    }
  } catch (err) {
    console.error('Erro de servidor:', err)
    return { error: 'Erro de conexão com o servidor.' }
  }
}