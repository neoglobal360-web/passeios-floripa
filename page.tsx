'use client'

import { useState, useMemo } from "react";
import BookingForm from "@/components/BookingForm";

type Tour = {
  id: string;
  title: string;
  subtitle: string;
  days: string[];
  daysLabel: string;
  time: string;
  price: string;
  priceNote?: string;
  desc: string;
  image: string;
  highlight?: string;
};

const tours: Tour[] = [
  {
    id: "citytour",
    title: "CITYTOUR FLORIPATOTAL",
    subtitle: "O passeio mais completo da Ilha",
    days: ["Segunda", "Quarta", "Sábado"],
    daysLabel: "Segunda, Quarta, Sábado",
    time: "08:00",
    price: "R$ 120,00",
    desc: "Saída do Norte da Ilha, centro de Jurerê Internacional, Ponte Hercílio Luz, Centro e interior da Cidade, Mirante das Lagoas da Conceição, Praia Joaquina, Dunas, Lagoa da Conceição e Praia dos Ingleses.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800",
    highlight: "Mais procurado",
  },
  {
    id: "balneario",
    title: "BALNEÁRIO CAMBORIÚ",
    subtitle: "A Dubai Brasileira",
    days: ["Terça", "Sexta", "Domingo"],
    daysLabel: "Terça, Sexta, Domingo",
    time: "07:30",
    price: "R$ 130,00",
    desc: "A maior e mais bela praia do Sul, tempo livre para compras, passeio de teleférico, Cristo Luz e Parque Unipraias. Um dia de glamour e natureza.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
  },
  {
    id: "beto",
    title: "BETO CARRERO",
    subtitle: "O maior parque da América Latina",
    days: ["Terça", "Quinta", "Sábado", "Domingo"],
    daysLabel: "Terça, Quinta, Sábado, Domingo",
    time: "07:00",
    price: "R$ 120,00",
    priceNote: "transporte - passaporte não incluso",
    desc: "Dia inteiro de diversão no maior parque temático da América Latina. Shows, brinquedos radicais e o zoológico mais completo.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800",
  },
  {
    id: "campeche",
    title: "ILHA DO CAMPECHE",
    subtitle: "Caribe Catarinense",
    days: ["Todos os dias"],
    daysLabel: "Todos os dias",
    time: "07:30",
    price: "R$ 100,00",
    priceNote: "+ BARCO",
    desc: "Travessia de 40 min até a reserva natural mais preservada de Floripa. Águas cristalinas, trilhas e inscrições rupestres de 4 mil anos.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800",
    highlight: "Vagas limitadas",
  },
  {
    id: "escuna",
    title: "ESCUNA PISCINAS NATURAIS + COSTA DA LAGOA",
    subtitle: "Dois paraíso em um dia",
    days: ["Todos os dias"],
    daysLabel: "Todos os dias",
    time: "07:30",
    price: "R$ 120,00",
    priceNote: "+ BARCO",
    desc: "Navegue pela Lagoa da Conceição, mergulhe nas piscinas naturais e conheça a charmosa Costa da Lagoa, acessível só de barco.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800",
  },
  {
    id: "joaquina",
    title: "JOAQUINA E BARRA DA LAGOA",
    subtitle: "Surf, dunas e pôr do sol",
    days: ["Domingo", "Quarta"],
    daysLabel: "Domingo e Quarta",
    time: "07:30",
    price: "R$ 90,00",
    desc: "Pela manhã visita a Praia da Joaquina, uma das mais belas do mundo, Dunas para sandboard, pôr do sol e Barra da Lagoa com canal e projeto TAMAR.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
  },
  {
    id: "bombinhas",
    title: "BOMBINHAS E QUATRO ILHAS",
    subtitle: "Mergulho e tranquilidade",
    days: ["Segunda", "Quarta", "Sexta"],
    daysLabel: "Segunda, Quarta, Sexta",
    time: "07:00",
    price: "R$ 120,00",
    desc: "Pela manhã visita a Praia de Quatro Ilhas com tempo para banho. Bombinhas é capital do mergulho ecológico com visibilidade incrível.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800",
  },
  {
    id: "guarda",
    title: "GUARDA DO EMBAÚ",
    subtitle: "Top 10 praias mais bonitas do Brasil",
    days: ["Terça", "Sábado"],
    daysLabel: "Terça e Sábado",
    time: "08:00",
    price: "R$ 100,00",
    desc: "Considerada uma das 10 praias mais bonitas do Brasil, vila de pescadores preservada, rio que encontra o mar e surf de classe mundial.",
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=800",
  },
];

const filterOptions = ["Todos", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Segunda");
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<Tour | null>(null);

  const filteredTours = useMemo(() => {
    if (activeFilter === "Todos") return tours;
    return tours.filter((t) => {
      if (t.days.includes("Todos os dias")) return true;
      return t.days.includes(activeFilter);
    });
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <style>{`
        :root {
          --blue: #0a4ea3;
          --blue-dark: #083a7a;
          --turquoise: #00c2d1;
          --turquoise-light: #e6f9fb;
          --bg: #f8fbfe;
          --surface: #ffffff;
          --text: #0f243f;
          --text-muted: #5a7390;
          --border: #e6eef7;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[12px] bg-[var(--blue)] flex items-center justify-center text-white font-extrabold text-[16px]">
              P
            </div>
            <div className="leading-none">
              <div className="font-extrabold text-[18px] tracking-tight flex items-baseline gap-1">
                <span className="text-[var(--blue)]">PASSEIOS</span>
                <span className="text-[var(--text)]">FLORIPA</span>
              </div>
              <div className="text-[10px] tracking-[0.18em] font-semibold text-[var(--text-muted)] uppercase mt-0.5">
                Florianópolis • Verão 2026
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://wa.me/5548999999999?text=Ol%C3%A1%20Passeios%20Floripa!" target="_blank" rel="noopener" className="hidden md:inline-flex h-10 px-5 rounded-full bg-[#25D366] text-white text-[13px] font-bold items-center gap-2 hover:bg-[#1eb956] transition shadow-md">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Reservar no WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* PASSEIOS GRID */}
      <section id="passeios" className="mx-auto max-w-[1280px] px-5 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 p-2 rounded-full bg-white border border-[var(--border)] shadow-sm w-fit mb-10">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`h-9 px-4 rounded-full text-[13px] font-bold transition ${
                activeFilter === f ? "bg-[var(--text)] text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="rounded-[24px] bg-white border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
              <img src={tour.image} alt={tour.title} className="h-48 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-[var(--blue)]">{tour.subtitle}</span>
                  <span className="text-[15px] font-extrabold text-[var(--blue)]">{tour.price}</span>
                </div>
                <h3 className="text-[18px] font-extrabold text-[var(--text)] mt-1">{tour.title}</h3>
                <p className="text-[13px] text-[var(--text-muted)] mt-2 line-clamp-3">{tour.desc}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTourForBooking(tour)}
                    className="w-full h-10 rounded-full bg-[var(--blue)] text-white text-[13px] font-bold flex items-center justify-center hover:bg-[var(--blue-dark)] transition cursor-pointer"
                  >
                    Reservar Data
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL DE AGENDAMENTO */}
      {selectedTourForBooking && (
        <BookingForm
          tourId={selectedTourForBooking.id}
          tourTitle={selectedTourForBooking.title}
          onClose={() => setSelectedTourForBooking(null)}
        />
      )}
    </div>
  );
}