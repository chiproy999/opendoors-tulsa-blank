import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AboutPage = () => {
  return (
    <Layout>
      <Hero
        title="About Open Doors Tulsa"
        subtitle="My mission and vision"
      />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">My Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Open Doors Tulsa exists to create pathways to sustainable employment and stable housing for individuals with arrest or conviction histories. I'm dedicated to reducing recidivism, fostering economic mobility, and building a more inclusive Tulsa.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            By connecting job and housing seekers with second-chance-friendly employers and landlords, I help dismantle barriers to reentry and promote successful community reintegration.
          </p>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">My Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I envision a Tulsa where:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Every individual has the opportunity to rebuild their life after involvement with the criminal justice system</li>
            <li>Employers recognize the value and potential of hiring individuals with conviction histories</li>
            <li>Housing providers implement fair screening practices that consider the whole person</li>
            <li>The stigma associated with having a conviction history is replaced with a culture of second chances</li>
            <li>Recidivism rates decrease through increased access to stable employment and housing</li>
          </ul>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">My Story</h2>
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Quote className="text-red-600 dark:text-red-400 flex-shrink-0" size={32} />
                <p className="text-gray-700 dark:text-gray-300 italic">
                  My journey is a testament to the power of transformation. As a former inmate, I've experienced firsthand how someone can turn their life around and become a moral, upstanding citizen. That's why I started Open Doors Tulsa - because I believe in second chances and know that people can change. This platform exists to help others find the opportunities they need to rebuild their lives, just as I was able to do with the support of others who believed in me.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-12" />
        
        <section>
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">Guiding Philosophy</h2>
          <Alert className="bg-gray-50 dark:bg-gray-800 border-red-200">
            <AlertDescription className="py-4">
              <div className="flex items-center gap-4">
                <Quote className="text-red-600 dark:text-red-400 flex-shrink-0" size={32} />
                <div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-2">
                    "If you want to be happy, practice compassion. If you want others to be happy, practice compassion."
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-right">– Dalai Lama</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
