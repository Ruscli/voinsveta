import { BENEFITS } from "../../content";
import { Icon } from "../Icons";
import { Reveal, SectionHeading } from "../ui";

export function Benefits() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="О школе"
          title={
            <>
              Почему ушу — отличный выбор{" "}
              <span className="text-gold-400">для ребёнка</span>
            </>
          }
          lead="Воин Света — школа шаолиньского ушу для детей и подростков 7–18 лет. Мы не учим драться: мы помогаем расти — в теле, характере и уверенности."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 3) * 90} className="h-full">
              <article className="card card-hover group h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500/20">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-100/65">
                  {benefit.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
