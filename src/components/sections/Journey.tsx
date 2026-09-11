import { STEPS } from "../../content";
import { Reveal, SectionHeading } from "../ui";

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Система обучения"
          title={
            <>
              Путь ученика: <span className="text-gold-400">6 ступеней</span>
            </>
          }
          lead="Ребёнок не просто ходит на секцию — он видит понятный путь роста. Каждая ступень заканчивается аттестационным экзаменом и аттестатом."
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <article className="card card-hover relative h-full overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-3 font-display text-7xl leading-none text-gold-500/10 select-none"
                  >
                    {step.numeral}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-[0.22em] text-cinnabar-400 uppercase">
                    Ступень {i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-bold tracking-wide text-gold-400/90">
                    {step.tag}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-100/65">
                    {step.text}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mx-auto mt-9 max-w-2xl text-center text-sm leading-relaxed text-paper-100/60">
            После шестой ступени путь не заканчивается — начинается{" "}
            <span className="font-semibold text-gold-300">
              новый круг мастерства
            </span>
            : глубже техника, сложнее оружие, следующие экзамены.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
