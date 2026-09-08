import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/imports/logo_creche_centrale.png";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { adminAuth } from "@/lib/adminAuth";

export default function Admin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");

  const checkSession = useCallback(async () => {
    const authenticated = await adminAuth.checkSession();
    setStatus(authenticated ? "authenticated" : "unauthenticated");
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogout = async () => {
    await adminAuth.logout();
    setStatus("unauthenticated");
  };

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#19042E] flex items-center justify-center">
        <span className="text-white/70 text-sm">Chargement…</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <AdminLogin logoSrc={logo} onSuccess={() => setStatus("authenticated")} />;
  }

  return (
    <AdminDashboard
      logoSrc={logo}
      onBackToSite={() => navigate("/")}
      onLogout={handleLogout}
      onSessionExpired={() => setStatus("unauthenticated")}
    />
  );
}
