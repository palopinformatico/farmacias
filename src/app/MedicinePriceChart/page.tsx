"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useLanguage } from "../context/LanguageContext";
import { subtle } from 'crypto';

// Definición del tipo de datos (puedes ponerlo en un archivo types.ts aparte si lo prefieres)
interface MedicinePriceData {
  date: string; // Formato DD-MM-YYYY
  cruzVerde?: number;
  ahumada?: number;
  salcobrand?: number;
}

// Datos de ejemplo - en una aplicación real, los obtendrías de una API
const allMedicinePrices: MedicinePriceData[] = [
  { date: '08-06-2025', cruzVerde: 1000, ahumada: 1500, salcobrand: 2000 },
  { date: '09-06-2025', cruzVerde: 1800, ahumada: 1700, salcobrand: 1200 },
  { date: '10-06-2025', cruzVerde: 700, ahumada: 2200, salcobrand: 900 },
  { date: '11-06-2025', cruzVerde: 900, ahumada: 2000, salcobrand: 1500 },
  { date: '12-06-2025', cruzVerde: 1200, ahumada: 1800, salcobrand: 1000 },
];

const MedicinePriceTracker: React.FC = () => {
  const [selectedPharmacies, setSelectedPharmacies] = useState<string[]>(['cruzVerde', 'ahumada', 'salcobrand']);
  const [startDate, setStartDate] = useState<string>('2025-06-08');
  const [endDate, setEndDate] = useState<string>('2025-06-12');
  const [filteredData, setFilteredData] = useState<MedicinePriceData[]>([]);
  const { lang } = useLanguage();

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = allMedicinePrices.filter((item) => {
      const [day, month, year] = item.date.split('-');
      const itemDate = new Date(`${year}-${month}-${day}`);
      return itemDate >= start && itemDate <= end;
    });
    setFilteredData(filtered);
  }, [startDate, endDate]);

  const handlePharmacyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPharmacies((prev) => [...prev, value]);
    } else {
      setSelectedPharmacies((prev) => prev.filter((pharmacy) => pharmacy !== value));
    }
  };

  const lineColors: { [key: string]: string } = {
    cruzVerde: '#008000', // Verde para Cruz Verde
    ahumada: '#0000FF',   // Azul para Ahumada
    salcobrand: '#FF0000', // Rojo para Salcobrand
  };

  const pharmacyNames: { [key: string]: string } = {
    cruzVerde: 'Cruz Verde',
    ahumada: 'Ahumada',
    salcobrand: 'Salcobrand',
  };

  const translations = {
    es: {
      title: 'Evolución del Precio de Medicamentos',
      subtitle: 'Seleccione farmacias',
      datesRageText: 'Seleccione rango de fechas',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha fin',
      priceText: 'Precio'
    },
    en: {
      title: 'Evolution of Drugs Prices',
      subtitle: 'Select pharmacy',
      datesRageText: 'Select date range',
      startDate: 'Start date',
      endDate: 'End date',
      priceText: 'Price'
    },
  };

  const t = translations[lang];

  return (
    <main className="p-6">
      <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
          {t.title}
        </h1>

        {/* Selección de Farmacias */}
        <div style={{ marginBottom: '25px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
          <h3 style={{ marginTop: '0', color: '#555' }}>{t.subtitle}:</h3>
          {/* Usamos flexbox y flex-wrap para que los checkboxes se adapten a la pantalla */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {Object.keys(pharmacyNames).map(key => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  value={key}
                  checked={selectedPharmacies.includes(key)}
                  onChange={handlePharmacyChange}
                  style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                />
                <span style={{ color: lineColors[key], fontWeight: 'bold' }}>{pharmacyNames[key]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Selección de Rango de Fechas */}
        <div style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
          <h3 style={{ marginTop: '0', color: '#555' }}>{t.datesRageText}:</h3>
          {/* Usamos flexbox para que los inputs de fecha se adapten */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-4 w-full max-w-3xl mx-auto px-4">
            <label className="flex flex-col w-full max-w-xs">
              {t.startDate}:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              />
            </label>

            <label className="flex flex-col w-full max-w-xs">
              {t.endDate}:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
              />
            </label>
          </div>
        </div>

        {/* Gráfico */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" tickFormatter={(tick) => tick} />
                <YAxis label={{ value: t.priceText, angle: -90, position: 'insideLeft', fill: '#555' }} />
                <Tooltip />
                <Legend />
                {selectedPharmacies.map((pharmacyKey) => (
                  <Line
                    key={pharmacyKey}
                    type="monotone"
                    dataKey={pharmacyKey}
                    stroke={lineColors[pharmacyKey]}
                    name={pharmacyNames[pharmacyKey]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2em' }}>No hay datos disponibles para el rango de fechas seleccionado o farmacias.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MedicinePriceTracker;