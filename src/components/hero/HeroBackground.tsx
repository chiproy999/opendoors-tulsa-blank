interface HeroBackgroundProps {
  backgroundImage?: string;
}

const HeroBackground = ({ backgroundImage }: HeroBackgroundProps) => {
  if (backgroundImage) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
    );
  }

  return (
    <>
      {/* Enhanced navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-blue-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-700/20 to-slate-700/10" />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/30" />
      
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/8 rounded-full blur-xl animate-fade-in" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-slate-300/6 rounded-full blur-2xl animate-fade-in-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-400/8 rounded-full blur-lg animate-fade-in" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl animate-fade-in-delayed" />
      </div>

      {/* Badge and map icons */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-10 h-12 border-2 border-white/25 rounded-lg opacity-70 animate-fade-in-delayed">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-white/30 rounded-sm" />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full" />
        </div>
        <div className="absolute bottom-32 left-16 w-12 h-8 border border-white/25 rounded opacity-50 animate-fade-in-delayed" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-1 border-l border-white/20" />
          <div className="absolute inset-1 border-t border-white/20" />
        </div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default HeroBackground;