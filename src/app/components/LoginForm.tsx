"use client";

import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { register } from 'module';

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { lang } = useLanguage();

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data?.token) {
          localStorage.setItem("session", JSON.stringify({
            token: data.token,
            name: data.name || "",
          }));
          toast.success("Inicio de sesión exitoso 🎉");
          router.push("/home");
        }
      } else {
        toast.error(data?.msg);
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error en el servidor ❌");
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    es: {
      title: 'Iniciar sesión',
      emailPlaceholder: 'Correo electrónico',
      passwordPlaceholder: 'Contraseña',
      button: 'Ingresar',
      noCount: '¿No tienes una cuenta?',
      register: 'Regístrate'
    },
    en: {
      title: 'Log in',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      button: 'Enter',
      noCount: "Don't have a count?",
      register: 'Regíster'
    },
  };

  const t = translations[lang];

  return (
    <main className="p-6">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h2 className="text-xl font-bold">{t.title}</h2>
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
          disabled={loading}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Cargando..." : t.button}
        </button>

        <p className="text-center text-sm mt-2">
          {t.noCount}{" "}
          <span
            className="text-blue-700 cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            {t.register}
          </span>
        </p>
      </form>
    </main>
  );
}
