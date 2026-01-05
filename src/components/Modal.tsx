import Button from "./Button";

export type ModalPropTypes = {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

export default function Modal({
  setIsModalOpen,
  isOpen,
}: Readonly<ModalPropTypes>) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-beige-50 w-full max-w-md p-8 rounded-2xl relative shadow-2xl">
        <Button
          onClick={() => setIsModalOpen(false)}
          className="justify-self-end"
        >
          &times;
        </Button>
        <h2 className="text-3xl font-bold mb-4 italic">
          Colaborar con mis sueños
        </h2>
        <p className="text-beige-700 mb-6">
          Podés realizar una transferencia a la siguiente cuenta bancaria:
        </p>
        <div className="bg-beige-100 p-4 rounded-lg border border-stone-200">
          <p className="text-sm text-gray-500 uppercase font-bold">Alias</p>
          <p className="text-xl font-mono text-stone-800 mb-4">
            SUEÑOS.MIOS.2026
          </p>
          <p className="text-sm text-gray-500 uppercase font-bold">Banco</p>
          <p className="text-md text-stone-800">
            Banco Santander - Cuenta Corriente
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(false)}>Copiar alias</Button>
        <Button onClick={() => setIsModalOpen(false)} variant="outlined">
          Entendido
        </Button>
      </div>
    </div>
  );
}
