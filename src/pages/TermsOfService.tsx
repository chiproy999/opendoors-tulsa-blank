
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-tulsa-blue-700 dark:text-blue-400 mb-6">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400 italic mb-8">Last Updated: May 8, 2025</p>
        
        <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Acceptance of Terms</h2>
            <p>
              By accessing and using Tulsa Open Doors website and services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not use our services.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Description of Services</h2>
            <p>
              Tulsa Open Doors provides a platform connecting job and housing seekers with conviction histories to second-chance-friendly employers and landlords in the Tulsa area.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">User Accounts</h2>
            <p>
              When you create an account with us, you warrant that the information you provide is accurate, complete, and current at all times. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">User Content</h2>
            <p>
              By posting content through our Services, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with our services. You are solely responsible for any content you post.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Prohibited Activities</h2>
            <p>The following activities are prohibited when using our services:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Using the Services for unlawful purposes</li>
              <li>Posting false or misleading information</li>
              <li>Attempting to access unauthorized areas</li>
              <li>Interfering with or disrupting the Services</li>
              <li>Impersonating another person or entity</li>
              <li>Harassing or intimidating other users</li>
            </ul>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Disclaimer and Limitation of Liability</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT SHALL TULSA OPEN DOORS BE LIABLE FOR ANY DAMAGES ARISING FROM THE USE OR INABILITY TO USE OUR SERVICES.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of the Services after any changes indicates your acceptance of the new Terms.
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <section>
            <h2 className="text-2xl font-semibold text-tulsa-blue-700 dark:text-blue-300">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Oklahoma, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
