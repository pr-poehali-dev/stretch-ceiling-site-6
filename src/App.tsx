
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/shadow" element={<ShadowCeilings />} />
          <Route path="/portfolio/floating" element={<FloatingCeilings />} />
          <Route path="/portfolio/cornices" element={<HiddenCornices />} />
          <Route path="/portfolio/films" element={<FilmTypes />} />
          <Route path="/portfolio/spotlights" element={<Spotlights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;