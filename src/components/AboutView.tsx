import React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Cpu,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";
import ridho from "../../assets/ridho.png";
import silpia from "../../assets/silpia.png";
import salsabila from "../../assets/salsabila.png";
import sahla from "../../assets/sahla.png";
import hasna from "../../assets/hasna.png";
import fariz from "../../assets/fariz.png";

interface TeamMember {
  name: string;
  npm: string;
  initials: string;
  photo?: string;
  isCutout?: boolean;
}

interface AboutViewProps {
  onBack?: () => void;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hasna Nazma Syahidah",
    npm: "257006111067",
    initials: "HN",
    photo: hasna,
    isCutout: true,
  },
  {
    name: "Sahla Jahidatul Milla Al Azizah",
    npm: "257006111112",
    initials: "SJ",
    photo: sahla,
    isCutout: true,
  },
  {
    name: "Salsabila",
    npm: "257006111113",
    initials: "SA",
    photo: salsabila,
    isCutout: true,
  },
  {
    name: "Ridho Fadillah",
    npm: "257006111114",
    initials: "RF",
    photo: ridho,
    isCutout: true,
  },
  {
    name: "Silpia Siti Pebriyani",
    npm: "257006111116",
    initials: "SS",
    photo: silpia,
    isCutout: true,
  },
  {
    name: "Fariz Alwasi",
    npm: "257006111117",
    initials: "FA",
    photo: fariz,
    isCutout: true,
  },
];

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="relative -mx-4 -mt-4 -mb-4 overflow-hidden bg-base text-ink transition-colors sm:-mx-8 sm:-mt-8 sm:-mb-8">
      <div className="relative mx-auto max-w-6xl px-5 pt-6 sm:px-8 sm:pt-8">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Pilihan Modul</span>
          </button>
        </div>

        <section className="flex min-h-104 flex-col justify-center pt-10 pb-20 sm:min-h-116">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-ink sm:text-7xl">
            About Us
            <span className="mt-2 block bg-linear-to-r from-secondary-ink to-accent bg-clip-text text-transparent">
              Belajar sistem operasi, lebih dekat.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl leading-8 text-muted sm:text-lg">
            Membangun solusi interaktif dan edukatif untuk memahami kompleksitas
            penjadwalan CPU dan penanganan Deadlock dalam sistem operasi.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted">
            <span className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4 text-secondary-ink" />
              Simulasi visual
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              Pembelajaran interaktif
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-secondary-ink" />
              Untuk dunia akademik
            </span>
          </div>
        </section>

        <section className="grid gap-8 border-y border-line py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-ink">
              Misi &amp; visi
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
              Konsep yang kompleks, dibuat lebih{" "}
              <span className="text-accent">mudah dipahami.</span>
            </h2>
          </div>
          <div className="space-y-6 text-[15px] leading-8 sm:text-base">
            <p className="text-ink">
              SimOS dikembangkan untuk membantu mahasiswa dan akademisi
              mempelajari materi sistem operasi melalui pengalaman yang{" "}
              <span className="font-semibold text-secondary-ink">visual</span>{" "}
              dan <span className="font-semibold text-accent">interaktif</span>.
              Dengan melihat proses bekerja langkah demi langkah, teori terasa
              lebih nyata dan lebih mudah dieksplorasi.
            </p>
            <p className="text-ink">
              Kami menghadirkan simulasi penjadwalan CPU dan penanganan Deadlock
              sebagai ruang belajar yang praktis mendorong rasa ingin tahu,
              pemahaman konsep, dan eksplorasi mandiri.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                <div>
                  <h3 className="text-sm font-semibold text-ink">Misi</h3>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Menyediakan alat belajar sistem operasi yang jelas dan mudah
                    dicoba.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                <div>
                  <h3 className="text-sm font-semibold text-ink">Visi</h3>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Membuat pembelajaran konsep OS lebih bermakna dan menarik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-secondary-ink">
                Orang-orang di balik SimOS
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                Tim pengembang
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted">
              Kolaborasi kami menghadirkan pengalaman belajar sistem operasi
              yang lebih interaktif.
            </p>
          </div>
          <div className="grid gap-x-4 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => {
              const hasFullPhoto = Boolean(member.photo && !member.isCutout);
              const hasCutoutPhoto = Boolean(member.photo && member.isCutout);

              return (
                <article
                  key={member.npm}
                  className="group relative rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-secondary-ink sm:p-6"
                >
                  {hasFullPhoto && (
                    <div
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                      aria-hidden="true"
                    >
                      <img
                        src={member.photo}
                        alt=""
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
                    </div>
                  )}

                  {hasCutoutPhoto && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-x-0 top-0 h-23 bg-surface" />
                        <div className="absolute inset-x-0 top-23 bottom-14 bg-secondary dark:bg-white" />
                        <div className="absolute inset-x-0 bottom-0 h-14 bg-surface" />
                      </div>

                      <img
                        src={member.photo}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 bottom-14 z-5 h-54 w-auto origin-bottom object-contain object-bottom transition-transform duration-300 group-hover:scale-105 sm:right-5 sm:h-57"
                      />
                    </>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-tertiary text-sm font-bold tracking-wide text-ink-reverse ring-4 ring-secondary-soft"
                        aria-hidden="true"
                      >
                        {member.initials}
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className={`mt-6 min-h-12 text-base font-semibold leading-6 ${
                        hasFullPhoto
                          ? "text-white"
                          : hasCutoutPhoto
                            ? "max-w-[50%] text-on-secondary dark:text-slate-950"
                            : "text-ink"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <div
                      className={`mt-6 flex items-center justify-between ${
                        hasFullPhoto ? "border-white/20" : ""
                      }`}
                    >
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          hasFullPhoto
                            ? "text-slate-300"
                            : hasCutoutPhoto
                              ? "text-muted dark:text-slate-400"
                              : "text-muted"
                        }`}
                      >
                        NPM
                      </span>
                      <span
                        className={`font-mono text-xs font-medium tracking-wide ${
                          hasFullPhoto
                            ? "text-accent"
                            : hasCutoutPhoto
                              ? "text-secondary-ink dark:text-white"
                              : "text-secondary-ink"
                        }`}
                      >
                        {member.npm}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>{" "}
          <div className="mt-14 flex items-center justify-center gap-2 text-xs font-medium text-muted">
            <ShieldAlert className="h-3.5 w-3.5 text-accent" />
            Belajar, bereksperimen, dan memahami sistem operasi bersama SimOS.
          </div>
        </section>
      </div>
    </div>
  );
};
