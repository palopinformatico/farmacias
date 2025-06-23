import React from 'react';

interface NotificacionPrecio {
  farmacia: string;
  remedio: string;
  precioAnterior: number;
  precioNuevo: number;
}

const NotificationsPage: React.FC = () => {
  const notificaciones: NotificacionPrecio[] = [
    { farmacia: 'Ahumada', remedio: 'Paracetamol', precioAnterior: 1000, precioNuevo: 800 },
    { farmacia: 'Cruz Verde', remedio: 'Ibuprofeno', precioAnterior: 1200, precioNuevo: 950 },
    { farmacia: 'Salco Brand', remedio: 'Amoxicilina', precioAnterior: 980, precioNuevo: 970 },
  ];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Notificaciones de bajas de precios de medicamentos</h1>

      {notificaciones.length === 0 ? (
        <p className="text-gray-600 text-sm">No hay notificaciones.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border-b">Farmacia</th>
                <th className="text-left p-2 border-b">Remedio</th>
                <th className="text-left p-2 border-b">Precio anterior</th>
                <th className="text-left p-2 border-b">Precio nuevo</th>
                <th className="text-left p-2 border-b">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((n, index) => {
                const diferencia = n.precioAnterior - n.precioNuevo;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{n.farmacia}</td>
                    <td className="p-2 border-b">{n.remedio}</td>
                    <td className="p-2 border-b">${n.precioAnterior}</td>
                    <td className="p-2 border-b">${n.precioNuevo}</td>
                    <td className="p-2 border-b">${diferencia}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
