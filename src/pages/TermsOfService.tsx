
import Layout from '@/components/layout/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-tulsa-blue-700 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>Last Updated: April 28, 2025</p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Tulsa Open Doors website and services (the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Services.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">2. Description of Services</h2>
          <p>
            Tulsa Open Doors provides a platform connecting job and housing seekers with conviction histories to second-chance-friendly employers and landlords in the Tulsa area.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you warrant that the information you provide is accurate, complete, and current at all times. Providing false information may result in termination of your account.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other security breach.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">4. User Content</h2>
          <p>
            By posting content through our Services, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with the operation of the Services.
          </p>
          <p>
            You are solely responsible for any content you post and its legality, reliability, and appropriateness. We reserve the right to remove any content that violates these Terms or that we find objectionable.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">5. Prohibited Activities</h2>
          <p>
            You agree not to engage in the following activities:
          </p>
          <ul>
            <li>Using the Services for unlawful purposes</li>
            <li>Posting false, misleading, or fraudulent information</li>
            <li>Attempting to access unauthorized areas of the Services</li>
            <li>Interfering with or disrupting the Services or servers</li>
            <li>Circumventing security features of the Services</li>
            <li>Scraping or collecting data from the Services without permission</li>
            <li>Impersonating another person or entity</li>
            <li>Harassing, threatening, or intimidating other users</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">6. Fees and Payment</h2>
          <p>
            Certain aspects of the Services, such as posting job or housing listings, may require payment. All payments are processed securely through our third-party payment processor.
          </p>
          <p>
            Fees are non-refundable except as required by law or as explicitly stated in our refund policy. We reserve the right to change our fees at any time with reasonable notice.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">7. Intellectual Property</h2>
          <p>
            The Services and all content and materials made available through the Services are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works of such content without our express permission.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL TULSA OPEN DOORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICES.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Tulsa Open Doors and its officers, directors, employees, and agents from any claims, damages, liabilities, costs, or expenses arising from your use of the Services or violation of these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account and access to the Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Oklahoma, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on this page with a revised "Last Updated" date. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">14. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            Tulsa Open Doors<br />
            123 Main Street, Suite 456<br />
            Tulsa, OK 74103<br />
            legal@tulsaopendoors.org<br />
            (918) 555-1234
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
