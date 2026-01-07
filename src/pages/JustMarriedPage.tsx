import { Music, Trash2, Users, UserCheck, UserX, Heart } from "lucide-react";
import { useWedding } from "@/context/WeddingContext";
import { useState } from "react";

export const JustMarriedPage = () => {
  const { guests, songs, deleteGuest, deleteSong, updateGuestTable } = useWedding();
  const [guestToDelete, setGuestToDelete] = useState<string | null>(null);

  // --- ESTADÍSTICAS ---
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.isComing).length;
  const declinedGuests = guests.filter(g => !g.isComing).length;

  // Agrupar invitados por mesa
  const guestsByTable = guests.reduce((acc, guest) => {
    const table = guest.tableNumber || 0;
    if (!acc[table]) acc[table] = [];
    acc[table].push(guest);
    return acc;
  }, {} as Record<number, typeof guests>);

  return (
    <div className="min-h-screen bg-beige-50 p-6 md:p-12">
      {/* HEADER CON ESTADÍSTICAS */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold italic text-beige-900 mb-8 font-serif text-center">
          Panel de Control
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige-200 flex items-center gap-4">
            <div className="bg-beige-100 p-3 rounded-xl text-beige-600"><Users /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-beige-500 font-bold">Total Invitados</p>
              <p className="text-2xl font-bold text-stone-800">{totalGuests}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige-200 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-xl text-green-600"><UserCheck /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-green-600 font-bold">Confirmados</p>
              <p className="text-2xl font-bold text-stone-800">{confirmedGuests}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige-200 flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-xl text-red-600"><UserX /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-red-600 font-bold">No Asisten</p>
              <p className="text-2xl font-bold text-stone-800">{declinedGuests}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* COLUMNA INVITADOS Y MESAS */}
        <section className="md:col-span-2 space-y-8">
          <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 mb-4">
            <Users size={20} /> Gestión de Mesas
          </h2>

          {totalGuests === 0 ? (
            // EMPTY STATE INVITADOS
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-beige-200">
              <div className="bg-beige-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-beige-300" size={32} />
              </div>
              <p className="text-stone-500 italic">Aún no hay invitados registrados.</p>
              <p className="text-xs text-stone-400 mt-2">Las confirmaciones aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            Object.entries(guestsByTable).map(([table, tableGuests]) => (
              <div key={table} className="space-y-4">
                <h3 className="text-md font-bold text-stone-600 flex items-center gap-2">
                  {table === "0" ? "Invitados por asignar" : `Mesa ${table}`}
                  <span className="text-xs font-normal bg-beige-200 px-2 py-0.5 rounded-full text-beige-700">
                    {tableGuests.length}
                  </span>
                </h3>

                <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-beige-100">
                      {tableGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-beige-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-stone-800 capitalize">
                            {guest.firstName} {guest.lastName}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              className="bg-beige-50 border border-beige-200 rounded-lg text-xs p-1.5 focus:ring-2 focus:ring-beige-400 outline-none"
                              value={guest.tableNumber || 0}
                              onChange={(e) => updateGuestTable?.(guest.id!, Number(e.target.value))}
                            >
                              <option value={0}>Sin Mesa</option>
                              {[...Array(20)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>Mesa {i + 1}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setGuestToDelete(guest.id!)}
                              className="text-stone-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </section>

        {/* COLUMNA CANCIONES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-beige-800 flex items-center gap-2">
            <Music size={20} /> Playlist
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6">
            {songs.length === 0 ? (
              // EMPTY STATE CANCIONES
              <div className="text-center py-8">
                <Music className="text-beige-200 mx-auto mb-3" size={40} />
                <p className="text-stone-400 text-sm italic">No hay sugerencias todavía</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {songs.map((item) => (
                  <li key={item.id} className="flex justify-between items-start group">
                    <div className="flex gap-3">
                      <Heart size={14} className="text-beige-300 mt-1" />
                      <span className="text-stone-700 text-sm italic leading-tight">
                        "{item.song}"
                      </span>
                    </div>
                    <button
                      onClick={() => deleteSong?.(item.id!)}
                      className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-500 transition-all ml-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {/* MODAL DE ELIMINACIÓN */}
      {guestToDelete && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-beige-100">
            <h2 className="text-xl font-bold mb-2 text-stone-900 font-serif italic">Confirmar</h2>
            <p className="mb-6 text-stone-500 text-sm leading-relaxed">
              ¿Estás seguro de que deseas eliminar a este invitado?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setGuestToDelete(null)} className="px-4 py-2 text-stone-400 hover:text-stone-600 text-sm font-medium">
                Cancelar
              </button>
              <button 
                onClick={() => { deleteGuest?.(guestToDelete); setGuestToDelete(null); }}
                className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200 text-sm font-bold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};