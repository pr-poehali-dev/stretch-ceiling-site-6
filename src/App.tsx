
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import ShadowCeilings from "./pages/categories/ShadowCeilings";
import FloatingCeilings from "./pages/categories/FloatingCeilings";
import HiddenCornices from "./pages/categories/HiddenCornices";
import FilmTypes from "./pages/categories/FilmTypes";
import Spotlights from "./pages/categories/Spotlights";
import LightLines from "./pages/categories/LightLines";
import TrackLighting from "./pages/categories/TrackLighting";
import LightCeilings from "./pages/categories/LightCeilings";
import ShadowVents from "./pages/categories/ShadowVents";
import CurtainNiches from "./pages/categories/CurtainNiches";
import BuiltinCornices from "./pages/categories/BuiltinCornices";
import AiVisualization from "./pages/AiVisualization";
import NotFound from "./pages/NotFound";
import ContactsPopup from "./components/ContactsPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContactsPopup />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/shadow" element={<ShadowCeilings />} />
          <Route path="/portfolio/floating" element={<FloatingCeilings />} />
          <Route path="/portfolio/cornices" element={<HiddenCornices />} />
          <Route path="/portfolio/films" element={<FilmTypes />} />
          <Route path="/portfolio/spotlights" element={<Spotlights />} />
          <Route path="/portfolio/light-lines" element={<LightLines />} />
          <Route path="/portfolio/track-lighting" element={<TrackLighting />} />
          <Route path="/portfolio/light-ceilings" element={<LightCeilings />} />
          <Route path="/portfolio/shadow-vents" element={<ShadowVents />} />
          <Route path="/portfolio/curtain-niches" element={<CurtainNiches />} />
          <Route path="/portfolio/builtin-cornices" element={<BuiltinCornices />} />
          <Route path="/ai-visualization" element={<AiVisualization />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;