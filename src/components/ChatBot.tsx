import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  CHAT_DEFAULT_CHIPS,
  CHAT_FALLBACK,
  CHAT_GREETING,
  CHAT_RULES,
  PHONE_HREF,
  SCHOOL_NAME,
  type ChatChip,
} from "../content";
import { useLead } from "../lead";
import { Icon } from "./Icons";
import { LogoMark } from "./ui";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  chips?: ChatChip[];
}

let nextId = 1;

/* Нормализация текста: нижний регистр + «ё» → «е» */
const normalize = (text: string) => text.toLowerCase().replace(/ё/g, "е");

function answerFor(text: string): { text: string; chips?: ChatChip[] } {
  const t = normalize(text);
  for (const rule of CHAT_RULES) {
    if (rule.keywords.some((k) => t.includes(normalize(k)))) {
      return { text: rule.answer, chips: rule.chips };
    }
  }
  return { text: CHAT_FALLBACK.answer, chips: CHAT_FALLBACK.chips };
}

export function ChatBot() {
  const { open } = useLead();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId++, from: "bot", text: CHAT_GREETING, chips: CHAT_DEFAULT_CHIPS },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  /* Автопрокрутка списка сообщений */
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, isOpen]);

  /* Фокус в поле при открытии + Escape закрывает чат */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* Не оставляем висящие таймеры */
  useEffect(
    () => () => {
      for (const id of timersRef.current) window.clearTimeout(id);
    },
    [],
  );

  const reply = (userText: string) => {
    setTyping(true);
    const delay = 600 + Math.random() * 500;
    const timer = window.setTimeout(() => {
      const { text, chips } = answerFor(userText);
      setMessages((m) => [...m, { id: nextId++, from: "bot", text, chips }]);
      setTyping(false);
    }, delay);
    timersRef.current.push(timer);
  };

  const sendUserText = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: nextId++, from: "user", text }]);
    setDraft("");
    reply(text);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendUserText(draft);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserText(draft);
    }
  };

  const handleChip = (chip: ChatChip) => {
    if (chip.action === "send") {
      sendUserText(chip.label);
      return;
    }
    if (chip.action === "call") {
      window.location.href = PHONE_HREF;
      return;
    }
    /* form: к форме заявки, чат сворачиваем */
    setIsOpen(false);
    open({});
  };

  return (
    <>
      {/* Кнопка-кружок */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Закрыть чат с администратором" : "Открыть чат с администратором"}
        className="fixed right-4 bottom-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 text-ink-950 shadow-[0_14px_36px_-10px_rgba(207,159,75,0.65)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      >
        <Icon name={isOpen ? "close" : "chat"} className="h-6 w-6" />
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 flex h-4 w-4"
          >
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-cinnabar-400/60" />
            <span className="relative h-4 w-4 rounded-full border-2 border-ink-950 bg-cinnabar-500" />
          </span>
        )}
      </button>

      {/* Панель чата */}
      {isOpen && (
        <section
          role="dialog"
          aria-label={`Чат с администратором школы «${SCHOOL_NAME}»`}
          className="fixed right-4 bottom-20 z-[60] flex h-[min(560px,72dvh)] w-[min(calc(100vw-2rem),384px)] flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink-900 shadow-2xl shadow-black/60 sm:right-6 sm:bottom-24"
        >
          {/* Шапка */}
          <header className="flex items-center gap-3 border-b border-white/10 bg-ink-850 px-4 py-3.5">
            <span className="relative shrink-0 rounded-full bg-paper-50 p-1.5">
              <LogoMark className="h-7 w-7" />
              <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-ink-850 bg-emerald-400" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-tight font-bold">
                Администратор школы
              </p>
              <p className="text-xs text-emerald-300/90">
                онлайн · отвечает сразу
              </p>
            </div>
            <button
              type="button"
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-paper-100/60 transition-colors hover:bg-white/5 hover:text-paper-50"
              aria-label="Закрыть чат"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="close" className="h-4.5 w-4.5" />
            </button>
          </header>

          {/* Сообщения */}
          <div
            ref={listRef}
            aria-live="polite"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.from === "user" ? "self-end" : "self-start"}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "rounded-br-md bg-gold-500 font-semibold text-ink-950"
                      : "rounded-bl-md border border-white/10 bg-ink-800 text-paper-100"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.chips && msg.chips.length > 0 && (
                  <div className="mt-2 flex max-w-[90%] flex-wrap gap-1.5">
                    {msg.chips.map((chip) =>
                      chip.action === "call" ? (
                        <a
                          key={chip.label}
                          href={PHONE_HREF}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-bold text-gold-300 transition-colors hover:bg-gold-500/20"
                        >
                          <Icon name="phone" className="h-3.5 w-3.5" />
                          {chip.label}
                        </a>
                      ) : (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => handleChip(chip)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                            chip.action === "form"
                              ? "border-cinnabar-400/50 bg-cinnabar-500/15 text-cinnabar-400 hover:bg-cinnabar-500/25"
                              : "border-white/15 bg-white/5 text-paper-100/85 hover:border-gold-500/40 hover:text-gold-300"
                          }`}
                        >
                          {chip.label}
                          {chip.action === "form" ? (
                            <Icon name="arrow" className="h-3.5 w-3.5" />
                          ) : null}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div
                className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-ink-800 px-4 py-3"
                aria-label="Администратор печатает"
              >
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-400 [animation-delay:300ms]" />
              </div>
            )}
          </div>

          {/* Ввод */}
          <form
            onSubmit={onSubmit}
            className="border-t border-white/10 bg-ink-850 px-3 py-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Напишите вопрос…"
                aria-label="Текст вопроса администратору"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-paper-50 placeholder:text-paper-100/35 focus:border-gold-400/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Отправить"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 transition-transform hover:scale-105 active:scale-95"
              >
                <Icon name="send" className="h-4.5 w-4.5" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10px] leading-snug text-paper-100/40">
              Бот отвечает на основные вопросы. Уточнить детали и записаться
              можно напрямую у тренера Александра — по телефону или через
              заявку.
            </p>
          </form>
        </section>
      )}
    </>
  );
}
