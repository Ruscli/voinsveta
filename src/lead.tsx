import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { LeadIntent } from "./content";

interface LeadContextValue {
  /** Текущий намёк: выбранная локация или готовый комментарий */
  intent: LeadIntent;
  /** Передать форме локацию/комментарий и плавно прокрутить к ней */
  open: (intent?: LeadIntent) => void;
}

const LeadContext = createContext<LeadContextValue>({
  intent: {},
  open: () => {},
});

export function LeadProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<LeadIntent>({});

  const open = useCallback((next?: LeadIntent) => {
    setIntent({ location: undefined, note: undefined, ...next });
    window.requestAnimationFrame(() => {
      document
        .getElementById("contacts")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <LeadContext.Provider value={{ intent, open }}>
      {children}
    </LeadContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLead = () => useContext(LeadContext);
