import { UserCheck, UserX } from 'lucide-react';
import { useGuests } from '@/context/GuestContext';

export const JustMarriedPage = () => {
  const { guests } = useGuests();

  const confirmedCount = guests.filter(g => g.isComing).length;

  return (
    <div className="min-h-screen bg-beige-50 p-8">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold italic text-beige-900 mb-2">Lista de Invitados</h1>
        <p className="text-beige-600 font-medium">Total de confirmados: {confirmedCount}</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-beige-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-beige-100 text-beige-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Nombre Completo</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-beige-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-beige-900">
                    {guest.firstName} {guest.lastName}
                  </td>
                  <td className="px-6 py-4">
                    {guest.isComing ? (
                      <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm">
                        <UserCheck size={14} /> Confirmado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-sm">
                        <UserX size={14} /> No asiste
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {guests.length === 0 && (
            <p className="p-12 text-center text-beige-400 italic">No hay registros todavía...</p>
          )}
        </div>
      </main>
    </div>
  );
};