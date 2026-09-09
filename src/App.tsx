import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Enrollment from "@/pages/Enrollment";
import Life from "@/pages/Life";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/inscription-tarifs" element={<Enrollment />} />
        <Route path="/vie-a-la-creche" element={<Life />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recrutement" element={<Careers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
