"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { lang } = useLanguage();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso");
        router.push("/");
      } else {
        alert(data?.msg || "Error en el registro");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error al conectar con el servidor");
    }
  };

  const translations = {
    es: {
      title: 'Registrar',
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Correo electrónico',
      passwordPlaceholder: 'Contraseña',
      button: '}Crear cuenta',
    },
    en: {
      title: 'Register',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      button: 'Enter',
    },
  };

  const t = translations[lang];

  return (
    <main className="p-6">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h2 className="text-xl font-bold">{t.title}</h2>
        <input
          type="text"
          placeholder={t.namePlaceholder}
          className="border px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t.emailPlaceholder}
          className="border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t.passwordPlaceholder}
          className="border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t.button}
        </button>
      </form>
    </main>
  );
}
