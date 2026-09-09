import React, { createContext, useContext, useState } from "react";
import { SvgIcons } from "@/components/icons";

interface SiteContextValue {
  showToast: (msg: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <SiteContext.Provider value={{ showToast }}>
      {children}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#301353] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#F4B23E]/40">
          <SvgIcons.Sparkles className="w-5 h-5 text-[#F4B23E]" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-slate-300 hover:text-white text-xs uppercase font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </SiteContext.Provider>
  );
}
