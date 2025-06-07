"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function SearchBar({ onSearch }: { onSearch: (nombre: string) => void }) {
  const [nombre, setNombre] = useState("");
  const { lang } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      onSearch(nombre);
    }
  };

  const translations = {
    es: {
      placeholder: 'Buscar medicamento...',
      searchButton: 'Buscar',
    },
    en: {
      placeholder: 'Search for medication...',
      searchButton: 'Search',
    },
  };

  const t = translations[lang];

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder={t.placeholder}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t.searchButton}
      </button>
    </form>
  );
}
