import { CAMP_PHONE_DISPLAY, CAMP_PHONE_HREF } from "../../content";
import { useLead } from "../../lead";
import { Icon, type IconName } from "../Icons";
import { Reveal, SectionHeading } from "../ui";

const FORMAT: { icon: IconName; text: string }[] = [
  { icon: "flame", text: "Тренировки по ушу утром и вечером" },
  { icon: "team", text: "Командные игры и жизнь в отряде" },
  {
    icon: "spark",
    text: "Творческие проекты: ремёсла, съёмка фильмов, пионерская тематика",
  },
  { icon: "pin", text: "Жизнь на природе: Конаково, Тверская область" },
  {
    icon: "medal",
    text: "Возраст участников 9–14 лет, длительность смены — две недели",
  },
];

export function Camp() {
  const { open } = useLead();

  return (
    <section id="camp" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Летние сборы"
          title={<>Смены «Зарница»: ушу, природа и команда</>}
          lead="Раз в год школа выезжает на летнюю смену: две недели лагеря, где тренировки сочетаются с творчеством, дружбой и жизнью на природе."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <article className="card h-full p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold">
                Как проходят смены
              </h3>
              <ul className="mt-5 space-y-4">
                {FORMAT.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="pt-1.5 text-sm leading-relaxed text-paper-100/75">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={140} className="h-full">
            <article className="flex h-full flex-col justify-between rounded-3xl border border-gold-500/20 bg-gradient-to-b from-gold-500/[0.08] to-transparent p-7 sm:p-8">
              <div>
                <span className="chip border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  Набор на следующую смену
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">
                  Даты уточняются
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-100/70">
                  Смены этого лета уже прошли. Оставьте заявку — и мы сообщим
                  первыми, когда откроется набор на следующее лето. Мест в
                  отрядах всегда немного.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <button
                  type="button"
                  className="btn btn-gold w-full"
                  onClick={() =>
                    open({
                      note: "Хочу узнать даты следующей летней смены «Зарница»",
                    })
                  }
                >
                  Узнать о следующей смене
                </button>
                <a className="btn btn-ghost w-full" href={CAMP_PHONE_HREF}>
                  <Icon name="phone" className="h-4 w-4 text-gold-400" />
                  {CAMP_PHONE_DISPLAY} — телефон сборов
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
