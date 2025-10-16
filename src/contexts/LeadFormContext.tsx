import { createContext, useContext, useState, ReactNode } from "react";

export interface LeadFormPreset {
  productName?: string;
  form_id?: string;
  redirectUrl?: string;
}

interface LeadFormContextValue {
  isOpen: boolean;
  openForm: (preset?: LeadFormPreset) => void;
  closeForm: () => void;
  preset: LeadFormPreset | null;
}

const LeadFormContext = createContext<LeadFormContextValue | undefined>(undefined);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<LeadFormPreset | null>(null);

  const openForm = (presetData?: LeadFormPreset) => {
    setPreset(presetData || null);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    // Limpar preset após um delay para evitar flash de conteúdo
    setTimeout(() => setPreset(null), 300);
  };

  return (
    <LeadFormContext.Provider value={{ isOpen, openForm, closeForm, preset }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within LeadFormProvider");
  }
  return context;
}
