import { useState } from "react";
import { adminAuth } from "@/lib/adminAuth";
import { ApiError } from "@/lib/api";

interface AdminLoginProps {
  onSuccess: () => void;
  logoSrc?: string;
}

export default function AdminLogin({ onSuccess, logoSrc }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setIsSubmitting(true);
    setError("");
    try {
      await adminAuth.login(password.trim());
      onSuccess();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Impossible de contacter le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#19042E] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] space-y-5">
        <div className="flex flex-col items-center space-y-3">
          {logoSrc && (
            <div className="p-1.5 rounded-full bg-white border-2 border-[#301353] shadow-sm">
              <img src={logoSrc} alt="La Centrale Crèche" className="h-14 w-auto object-contain" />
            </div>
          )}
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C86446]">Accès réservé</div>
            <h1 className="font-serif-heading text-xl text-[#301353] font-semibold mt-1">
              Panneau d'administration
            </h1>
          </div>
        </div>

        {error && (
          <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#301353] hover:bg-[#200B3A] disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            {isSubmitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
