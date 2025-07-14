
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import JobsPage from "./pages/JobsPage";
import HousingPage from "./pages/HousingPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobListings from "./pages/admin/AdminJobListings";
import AdminHousingListings from "./pages/admin/AdminHousingListings";
import AdminUserAccounts from "./pages/admin/AdminUserAccounts";

const App = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <LanguageProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/housing" element={<HousingPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  
                  {/* Auth routes */}
                  <Route path="/auth" element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Admin routes - Protected */}
                  <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/jobs" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminJobListings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/housing" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminHousingListings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminUserAccounts />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
