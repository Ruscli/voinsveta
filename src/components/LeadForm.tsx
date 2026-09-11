import { useEffect, useState, type FormEvent } from "react";
import {
  LOCATIONS,
  type LocationId,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "../content";
import { Icon } from "./Icons";

type Status = "idle" | "sending" | "success";

interface FormState {
  parentName: string;
  phone: string;
  age: string;
  location: LocationId;
  comment: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const DEFAULT_FORM: FormState = {
  parentName: "",
  phone: "",
  age: "",
  location: "unknown",
  comment: "",
};

export function LeadForm({
  initialLocation = "unknown",
  initialComment = "",
}: {
  initialLocation?: LocationId;
  initialComment?: string;
}) {
  const [form, setForm] = useState<FormState>({
    ...DEFAULT_FORM,
    location: initialLocation,
    comment: initialComment,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  /* Если пользователь нажал «Записаться в эту группу» — подставляем локацию */
  useEffect(() => {
    setForm((f) => ({ ...f, location: initialLocation, comment: initialComment }));
  }, [initialLocation, initialComment]);

  const setField = (name: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};

    if (form.parentName.trim().length < 2) {
      next.parentName = "Укажите, как к вам обращаться";
    }

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) {
      next.phone = "Введите номер полностью, например +7 900 000-00-00";
    }

    const age = Number.parseInt(form.age, 10);
    if (!form.age || Number.isNaN(age) || age < 5 || age > 20) {
      next.age = "Возраст ребёнка — от 5 до 20";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");

    /* Форма работает без сервера: заявка сохраняется локально в браузере.
       При подключении бэкенда/CRM здесь будет fetch(...) — см. README. */
    try {
      const leads = JSON.parse(
        window.localStorage.getItem("voin-sveta-leads") ?? "[]",
      ) as unknown[];
      leads.push({ ...form, createdAt: new Date().toISOString() });
      window.localStorage.setItem("voin-sveta-leads", JSON.stringify(leads));
    } catch {
      /* приватный режим браузера — не критично */
    }

    window.setTimeout(() => setStatus("success"), 700);
  };

  if (status === "success") {
    return (
      <div
        className="flex h-full flex-col items-center justify-center rounded-3xl border border-gold-500/25 bg-ink-950/60 p-8 text-center"
        role="status"
      >
        <span className="animate-pop-in flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_16px_40px_-12px_rgba(207,159,75,0.6)]">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold">
          Спасибо, заявка принята!
        </h3>
        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-paper-100/70">
          Мы свяжемся с вами, ответим на вопросы и запишем ребёнка на
          бесплатную пробную тренировку.
        </p>
        <p className="mt-3 text-sm text-paper-100/60">
          Нужно срочно? —{" "}
          <a
            href={PHONE_HREF}
            className="font-bold text-gold-300 hover:text-gold-200"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-6 px-5 py-2.5 text-xs"
          onClick={() => {
            setForm(DEFAULT_FORM);
            setErrors({});
            setStatus("idle");
          }}
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-ink-950/60 p-6 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="lead-name">
            Ваше имя
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            className="field"
            placeholder="Например, Анна"
            value={form.parentName}
            onChange={(e) => setField("parentName", e.target.value)}
            aria-invalid={Boolean(errors.parentName)}
          />
          {errors.parentName ? (
            <p className="field-error">{errors.parentName}</p>
          ) : null}
        </div>

        <div>
          <label className="field-label" htmlFor="lead-phone">
            Телефон
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="field"
            placeholder="+7 900 000-00-00"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="lead-age">
            Возраст ребёнка
          </label>
          <input
            id="lead-age"
            type="number"
            inputMode="numeric"
            min={5}
            max={20}
            className="field"
            placeholder="Например, 9"
            value={form.age}
            onChange={(e) => setField("age", e.target.value)}
            aria-invalid={Boolean(errors.age)}
          />
          {errors.age ? <p className="field-error">{errors.age}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="lead-location">
            Локация
          </label>
          <select
            id="lead-location"
            className="field"
            value={form.location}
            onChange={(e) => setField("location", e.target.value as LocationId)}
          >
            <option value="unknown">Пока не знаю — подскажите</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.city} — {loc.venue}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="lead-comment">
            Комментарий <span className="normal-case opacity-60">(необязательно)</span>
          </label>
          <textarea
            id="lead-comment"
            rows={3}
            className="field resize-none"
            placeholder="Опыт спорта, удобное время, вопросы…"
            value={form.comment}
            onChange={(e) => setField("comment", e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-gold btn-lg mt-5 w-full disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Отправляем…" : "Записаться на бесплатную тренировку"}
        {status !== "sending" ? <Icon name="send" className="h-4 w-4" /> : null}
      </button>

      <p className="mt-3.5 text-center text-xs leading-relaxed text-paper-100/45">
        Отправляя форму, вы соглашаетесь на обработку персональных данных.
        Контакты третьим лицам не передаются.
      </p>
    </form>
  );
}
