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
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-black/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
        
        {/* Geometric accent shapes */}
        <div className="absolute top-32 right-20 w-16 h-16 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg rotate-12 animate-float" />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/30 rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-black/40 rounded-sm rotate-45 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-float" />
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