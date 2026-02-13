import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Forum from "./pages/Forum";
import ForumDetail from "./pages/ForumDetail";
import CreatePost from "./pages/CreatePost";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import Chat from "./pages/Chat";
import Farmers from "./pages/Farmers";
import FarmerDetail from "./pages/FarmerDetail";
import RegisterFarmer from "./pages/RegisterFarmer";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/create" element={<CreatePost />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/create" element={<CreateProduct />} />
          <Route path="/marketplace/:id" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farmers/register" element={<RegisterFarmer />} />
          <Route path="/farmers/:id" element={<FarmerDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
