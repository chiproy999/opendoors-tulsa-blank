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
      {/* Enhanced gradient background with door opening effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/30 to-green-800/30" />
      
      {/* Door opening animation effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/40 to-transparent origin-left transform animate-[slideLeft_2s_ease-out_forwards]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent origin-right transform animate-[slideRight_2s_ease-out_forwards]" />
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-400/5 rounded-full blur-xl animate-float-delayed" />
      </div>

      {/* Door and key icons */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-12 h-16 border-2 border-white/20 rounded-lg opacity-60 animate-fade-in-delayed">
          <div className="absolute top-1/2 right-1 w-1 h-1 bg-white/40 rounded-full" />
        </div>
        <div className="absolute bottom-32 left-16 w-8 h-4 border border-white/20 rounded-sm opacity-40 animate-fade-in-delayed" style={{ animationDelay: '1s' }}>
          <div className="absolute -right-2 top-1/2 w-2 h-0.5 bg-white/20" />
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