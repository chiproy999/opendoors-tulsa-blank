import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation keys and values
const translations = {
  en: {
    // Navigation
    'nav.resources': 'Resources',
    'nav.jobs': 'Jobs',
    'nav.housing': 'Housing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign out',
    'nav.signedInAs': 'Signed in as',
    
    // Hero Section
    'hero.title': 'Opening Doors to New Opportunities',
    'hero.subtitle': 'Connecting individuals with conviction histories to meaningful employment, stable housing, and essential resources in Tulsa, Oklahoma.',
    'hero.primaryCTA': 'Find Jobs',
    'hero.secondaryCTA': 'Find Housing',
    'hero.businessCTA': 'Partner with Us',
    
    // Forms
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.email': 'Email',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.signUp': 'Sign Up',
    'form.signIn': 'Sign In',
    'form.required': 'This field is required',
    
    // Newsletter
    'newsletter.title': 'Stay Connected with Open Doors Tulsa',
    'newsletter.subtitle': 'Get the latest job opportunities, housing listings, and resources delivered to your inbox.',
    'newsletter.userType': 'I am a:',
    'newsletter.jobSeeker': 'Job Seeker',
    'newsletter.employer': 'Employer',
    'newsletter.landlord': 'Landlord',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.close': 'No Thanks',
    'newsletter.success': 'Thank you for subscribing!',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try Again',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.close': 'Close',
  },
  es: {
    // Navigation
    'nav.resources': 'Recursos',
    'nav.jobs': 'Empleos',
    'nav.housing': 'Vivienda',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.signIn': 'Iniciar Sesión',
    'nav.signOut': 'Cerrar Sesión',
    'nav.signedInAs': 'Conectado como',
    
    // Hero Section
    'hero.title': 'Abriendo Puertas a Nuevas Oportunidades',
    'hero.subtitle': 'Conectando individuos con historial de condenas a empleos significativos, vivienda estable y recursos esenciales en Tulsa, Oklahoma.',
    'hero.primaryCTA': 'Buscar Empleos',
    'hero.secondaryCTA': 'Buscar Vivienda',
    'hero.businessCTA': 'Asociarse con Nosotros',
    
    // Forms
    'form.firstName': 'Nombre',
    'form.lastName': 'Apellido',
    'form.email': 'Correo Electrónico',
    'form.password': 'Contraseña',
    'form.confirmPassword': 'Confirmar Contraseña',
    'form.signUp': 'Registrarse',
    'form.signIn': 'Iniciar Sesión',
    'form.required': 'Este campo es obligatorio',
    
    // Newsletter
    'newsletter.title': 'Mantente Conectado con Open Doors Tulsa',
    'newsletter.subtitle': 'Recibe las últimas oportunidades de empleo, listados de vivienda y recursos en tu bandeja de entrada.',
    'newsletter.userType': 'Soy un:',
    'newsletter.jobSeeker': 'Buscador de Empleo',
    'newsletter.employer': 'Empleador',
    'newsletter.landlord': 'Propietario',
    'newsletter.subscribe': 'Suscribirse',
    'newsletter.close': 'No Gracias',
    'newsletter.success': '¡Gracias por suscribirte!',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.retry': 'Intentar de Nuevo',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.close': 'Cerrar',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};