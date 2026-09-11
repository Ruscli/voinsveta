import { PARENT_CARDS } from "../../content";
import { Icon } from "../Icons";
import { Reveal, SectionHeading } from "../ui";

export function Parents() {
  return (
    <section
      id="parents"
      className="scroll-mt-24 border-y border-white/5 bg-ink-900/50 py-20 sm:py-24"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Для родителей"
          title="Вопросы, которые волнуют родителей"
          lead="Коротко и честно — о безопасности, формате занятий и первых шагах в школе."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PARENT_CARDS.map((card, i) => (
            <Reveal key={card.q} delay={(i % 2) * 90} className="h-full">
              <article className="card card-hover h-full">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cinnabar-500/15 text-cinnabar-400">
                    <Icon name="shield" className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-bold">{card.q}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-100/65">
                      {card.a}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
