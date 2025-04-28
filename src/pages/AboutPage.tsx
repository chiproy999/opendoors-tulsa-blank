
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <Layout>
      <Hero
        title="About Tulsa Open Doors"
        subtitle="Our mission, vision, and the story behind our work."
      />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Tulsa Open Doors exists to create pathways to sustainable employment and stable housing for individuals with arrest or conviction histories. We're dedicated to reducing recidivism, fostering economic mobility, and building a more inclusive Tulsa.
          </p>
          <p className="text-lg text-gray-700">
            By connecting job and housing seekers with second-chance-friendly employers and landlords, we help dismantle barriers to reentry and promote successful community reintegration.
          </p>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            We envision a Tulsa where:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
            <li>Every individual has the opportunity to rebuild their life after involvement with the criminal justice system</li>
            <li>Employers recognize the value and potential of hiring individuals with conviction histories</li>
            <li>Housing providers implement fair screening practices that consider the whole person</li>
            <li>The stigma associated with having a conviction history is replaced with a culture of second chances</li>
            <li>Recidivism rates decrease through increased access to stable employment and housing</li>
          </ul>
        </section>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            Tulsa Open Doors was founded in 2023 by a coalition of community organizations, formerly incarcerated individuals, employers, and housing providers committed to addressing the challenges of reentry in our community.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            After recognizing the significant barriers that people with conviction histories face when seeking employment and housing, we created a centralized platform to connect these individuals with opportunities explicitly open to them.
          </p>
          <p className="text-lg text-gray-700">
            Today, we continue to grow our network of second-chance-friendly employers and housing providers while advocating for policy changes that support fair chance hiring and housing practices throughout Tulsa.
          </p>
        </section>
        
        <Separator className="my-12" />
        
        <section>
          <h2 className="text-3xl font-bold text-tulsa-blue-700 mb-4">Our Team</h2>
          <p className="text-lg text-gray-700 mb-8">
            Tulsa Open Doors is run by a dedicated team of professionals with backgrounds in workforce development, housing advocacy, criminal justice reform, and technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
              <p className="text-gray-600 mb-2">Executive Director</p>
              <p className="text-gray-700 text-sm">
                Former attorney with 15 years experience in criminal justice reform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Michael Johnson</h3>
              <p className="text-gray-600 mb-2">Employer Relations Manager</p>
              <p className="text-gray-700 text-sm">
                20 years in HR and workforce development, focused on inclusive hiring practices.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
