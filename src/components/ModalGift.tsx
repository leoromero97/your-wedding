import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { BANK_DATA, BANK_DATA_2 } from "@/constants/constants";
import Button from "./Button";

export type ModalGiftTypes = {
  title: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
};

export default function ModalGift({
  title,
  setIsModalOpen,
  isModalOpen = false,
}: Readonly<ModalGiftTypes>) {
  const [copiedAlias, setCopiedAlias] = useState<string | null>(null);

  const handleCopyAlias = async (alias: string) => {
    try {
      await navigator.clipboard.writeText(alias);
      setCopiedAlias(alias); // Guardamos el alias actual
      setTimeout(() => setCopiedAlias(null), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  if (!isModalOpen) return null;

  const accounts = [BANK_DATA, BANK_DATA_2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-beige-50 w-full max-w-md p-8 rounded-2xl relative shadow-2xl gap-4 flex flex-col">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-6 text-2xl text-beige-400 hover:text-beige-800 transition-colors cursor-pointer"
        >
          &times;
        </button>

        <header className="pt-4">
          <h4 className="text-xl font-bold italic text-beige-900 leading-tight">
            {title}
          </h4>
          <p className="text-beige-600 text-sm mt-2">
            Podés realizar una transferencia a cualquiera de las siguientes
            cuentas:
          </p>
        </header>

        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1">
          {accounts.map((account) => {
            const isThisCopied = copiedAlias === account.alias;

            return (
              <div
                key={account.alias}
                className="bg-white p-5 rounded-xl border border-beige-200 shadow-sm space-y-3"
              >
                <div className="flex flex-col gap-1 justify-between items-start">
                  <div>
                    <p className="text-sm text-beige-400 uppercase font-black tracking-widest">
                      Alias
                    </p>
                    <p className="text-sm font-mono text-beige-900 break-all leading-none">
                      {account.alias}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-beige-400 uppercase font-black tracking-widest">
                      Banco
                    </p>
                    <p className="text-sm font-medium text-beige-700">
                      {account.bankName}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleCopyAlias(account.alias)}
                  variant={isThisCopied ? "outlined" : "filled"}
                  icon={isThisCopied ? Check : Copy}
                  isFullWidth
                  className="py-2 text-sm"
                >
                  {isThisCopied ? "¡Copiado!" : "Copiar alias"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <Button
            onClick={() => setIsModalOpen(false)}
            variant="outlined"
            isFullWidth
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
