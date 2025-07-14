
import { useLanguage } from '@/context/LanguageContext';
import HeroBackground from '../hero/HeroBackground';
import HeroContent from '../hero/HeroContent';

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  businessCTA?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

const Hero = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  businessCTA,
  backgroundImage,
}: HeroProps = {}) => {
  const { t } = useLanguage();
  
  // Use translations if no custom props provided
  const displayTitle = title || t('hero.title');
  const displaySubtitle = subtitle || t('hero.subtitle');
  const displayPrimaryCTA = primaryCTA || { text: t('hero.primaryCTA'), link: '/jobs' };
  const displaySecondaryCTA = secondaryCTA || { text: t('hero.secondaryCTA'), link: '/housing' };
  const displayBusinessCTA = businessCTA || { text: t('hero.businessCTA'), link: '/contact' };

  return (
    <section 
      className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      <HeroBackground backgroundImage={backgroundImage} />
      
      <HeroContent
        title={displayTitle}
        subtitle={displaySubtitle}
        primaryCTA={displayPrimaryCTA}
        secondaryCTA={displaySecondaryCTA}
        businessCTA={displayBusinessCTA}
      />
    </section>
  );
};

export default Hero;
