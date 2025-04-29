
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <Layout>
      <Hero
        title="About Tulsa Open Doors"
        subtitle="Our mission and vision"
      />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-tulsa-blue-700 dark:text-blue-300 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Tulsa Open Doors exists to create pathways to sustainable employment and stable housing for individuals with arrest or conviction histories. We're dedicated to reducing recidivism, fostering economic mobility, and building a more inclusive Tulsa.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            By connecting job and housing seekers with second-chance-friendly employers and landlords, we help dismantle barriers to reentry and promote successful community reintegration.
          </p>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-tulsa-blue-700 dark:text-blue-300 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We envision a Tulsa where:
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
        
        <section>
          <h2 className="text-3xl font-bold text-tulsa-blue-700 dark:text-blue-300 mb-4">Our Team</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Tulsa Open Doors is run by a dedicated team of professionals with backgrounds in workforce development, housing advocacy, criminal justice reform, and technology.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-center text-gray-600 dark:text-gray-300">Our team information is coming soon</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
