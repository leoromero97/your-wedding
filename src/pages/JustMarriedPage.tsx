import { Music, Trash2 } from "lucide-react";
import { useWedding } from "@/context/WeddingContext";
import { useState } from "react";

export const JustMarriedPage = () => {
  const { guests, songs, deleteGuest, deleteSong, updateGuestTable } =
    useWedding();
  const [guestToDelete, setGuestToDelete] = useState<string | null>(null);

  // Agrupar invitados por mesa
  const guestsByTable = guests.reduce((acc, guest) => {
    const table = guest.tableNumber || 0; // 0 significa "Sin mesa asignada"
    if (!acc[table]) acc[table] = [];
    acc[table].push(guest);
    return acc;
  }, {} as Record<number, typeof guests>);

  return (
    <div className="min-h-screen bg-beige-50 p-6 md:p-12">
      {/* ... Header igual al anterior ... */}

      <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* COLUMNA INVITADOS Y MESAS */}
        <section className="md:col-span-2 space-y-8">
          {Object.entries(guestsByTable).map(([table, tableGuests]) => (
            <div key={table} className="space-y-4">
              <h3 className="text-lg font-bold text-stone-700 flex items-center gap-2">
                {table === "0" ? "Invitados sin mesa" : `Mesa ${table}`}
                <span className="text-sm font-normal text-stone-400">
                  ({tableGuests.length})
                </span>
              </h3>

              <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-beige-100">
                    {tableGuests.map((guest) => (
                      <tr
                        key={guest.id}
                        className="hover:bg-beige-50 transition-colors"
                      >
                        <td className="px-6 py-3 font-medium text-stone-800 capitalize">
                          {guest.firstName} {guest.lastName}
                        </td>
                        <td className="px-6 py-3">
                          <select
                            className="bg-beige-100 border-none rounded text-xs p-1"
                            value={guest.tableNumber || 0}
                            onChange={(e) => {
                              if (guest?.id) {
                                updateGuestTable?.(
                                  guest.id,
                                  Number(e.target.value)
                                );
                              }
                            }}
                          >
                            <option value={0}>Asignar Mesa</option>
                            {[...Array(20)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                Mesa {i + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <button
                            onClick={() => setGuestToDelete(guest.id!)} // Guardamos el ID específico
                            className="text-red-300 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
        {guestToDelete && (
          <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
              <h2 className="text-xl font-bold mb-2 text-stone-900 font-serif italic">
                Confirmar eliminación
              </h2>
              <p className="mb-6 text-stone-600 text-sm">
                ¿Estás seguro de que deseas eliminar a este invitado de la
                lista? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setGuestToDelete(null)}
                  className="px-4 py-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    deleteGuest?.(guestToDelete); // Usamos el ID guardado en el estado
                    setGuestToDelete(null); // Cerramos el modal
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COLUMNA CANCIONES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-beige-800 flex items-center gap-2">
            <Music size={20} /> Playlist
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-beige-200 p-4">
            <ul className="space-y-3">
              {songs.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center group border-b border-beige-50 pb-2"
                >
                  <span className="text-stone-700 text-sm italic">
                    "{item.song}"
                  </span>
                  <button
                    onClick={() => deleteSong?.(item.id!)}
                    className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};
