import resourcesHeroBg from '@/assets/resources-hero-bg.jpg';
import OrganizationLogos from '@/components/resources/OrganizationLogos';

const ResourcesHeroBackground = () => {
  return (
    <>
      {/* Base background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${resourcesHeroBg})` }}
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Interactive organization logos */}
      <OrganizationLogos />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
    </>
  );
};

export default ResourcesHeroBackground;