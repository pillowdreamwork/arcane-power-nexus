import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Codex from "./pages/Codex";
import Liberation from "./pages/Liberation";
import Rituals from "./pages/Rituals";
import Armory from "./pages/Armory";
import Echo from "./pages/Echo";
import Warfare from "./pages/Warfare";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/codex" element={<Codex />} />
        <Route path="/liberation" element={<Liberation />} />
        <Route path="/rituals" element={<Rituals />} />
        <Route path="/armory" element={<Armory />} />
        <Route path="/echo" element={<Echo />} />
        <Route path="/warfare" element={<Warfare />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
