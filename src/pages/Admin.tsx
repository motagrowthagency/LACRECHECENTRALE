import { useNavigate } from "react-router-dom";
import logo from "@/imports/logo_creche_centrale.png";
import AdminDashboard from "@/components/AdminDashboard";

export default function Admin() {
  const navigate = useNavigate();

  return <AdminDashboard logoSrc={logo} onBackToSite={() => navigate("/")} />;
}
