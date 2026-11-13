import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Cpu,
  GraduationCap,
  Heart,
  Lightbulb,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

const teamMembers = [
  { name: 'Hasna Nazma Syahidah', npm: '257006111067', initials: 'HN', accent: 'emerald' },
  { name: 'Sahla Jahidatul Milla Al Azizah', npm: '257006111112', initials: 'SJ', accent: 'violet' },
  { name: 'Salsabila', npm: '257006111113', initials: 'SA', accent: 'violet' },
  { name: 'Ridho Fadillah', npm: '257006111114', initials: 'RF', accent: 'emerald' },
  { name: 'Silpia Siti Pebriyani', npm: '257006111116', initials: 'SS', accent: 'emerald' },
  { name: 'Fariz Alwasi', npm: '257006111117', initials: 'FA', accent: 'violet' },
];

export const AboutView: React.FC = () => {
  return (
    <div className="relative -mx-4 -mt-4 -mb-4 overflow-hidden bg-[#fbfcfa] text-slate-800 sm:-mx-8 sm:-mt-8 sm:-mb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(ellipse_at_18%_16%,rgba(167,243,208,0.22),transparent_42%),radial-gradient(ellipse_at_85%_12%,rgba(221,214,254,0.24),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <section className="flex min-h-[440px] flex-col justify-center py-20 sm:min-h-[490px] sm:py-28">
          <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-emerald-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            Tentang SimOS
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-7xl">
            About Us
            <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-emerald-600 to-violet-600 bg-clip-text text-transparent">
              Belajar sistem operasi, lebih dekat.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Membangun solusi interaktif dan edukatif untuk memahami kompleksitas
            penjadwalan CPU dan penanganan Deadlock dalam sistem operasi.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-700" />
              Simulasi visual
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-600" />
              Pembelajaran interaktif
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-emerald-700" />
              Untuk dunia akademik
            </span>
          </div>
        </section>

        <section className="grid gap-8 border-y border-slate-200/80 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              Misi &amp; visi
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-900 sm:text-4xl">
              Konsep yang kompleks, dibuat lebih{' '}
              <span className="text-emerald-700">mudah dipahami.</span>
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-8 text-slate-600 sm:text-base">
            <p>
              SimOS dikembangkan untuk membantu mahasiswa dan akademisi
              mempelajari materi sistem operasi melalui pengalaman yang{' '}
              <span className="font-semibold text-violet-700">visual</span> dan{' '}
              <span className="font-semibold text-emerald-700">interaktif</span>.
              Dengan melihat proses bekerja langkah demi langkah, teori terasa
              lebih nyata dan lebih mudah dieksplorasi.
            </p>
            <p>
              Kami menghadirkan simulasi penjadwalan CPU dan penanganan Deadlock
              sebagai ruang belajar yang praktis—mendorong rasa ingin tahu,
              pemahaman konsep, dan eksplorasi mandiri.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white/80 p-4">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Misi</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Menyediakan alat belajar sistem operasi yang jelas dan mudah dicoba.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-white/80 p-4">
                <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Visi</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Membuat pembelajaran konsep OS lebih bermakna dan menarik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-11 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Orang-orang di balik SimOS
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                Tim pengembang
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Kolaborasi kami menghadirkan pengalaman belajar sistem operasi yang
              lebih interaktif.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => {
              const isEmerald = member.accent === 'emerald';
              return (
                <article
                  key={member.npm}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_-20px_rgba(15,23,42,0.24)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_38px_-22px_rgba(15,23,42,0.3)] sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold tracking-wide ring-4 ${
                        isEmerald
                          ? 'bg-emerald-50 text-emerald-800 ring-emerald-50/70'
                          : 'bg-violet-50 text-violet-800 ring-violet-50/70'
                      }`}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isEmerald ? 'text-emerald-600' : 'text-violet-600'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 min-h-12 text-base font-semibold leading-6 text-slate-900">
                    {member.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      NPM
                    </span>
                    <span className="font-mono text-xs font-medium tracking-wide text-slate-600">
                      {member.npm}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <ShieldAlert className="h-3.5 w-3.5 text-violet-500" />
            Belajar, bereksperimen, dan memahami sistem operasi bersama SimOS.
          </div>
        </section>
      </div>
    </div>
  );
};
