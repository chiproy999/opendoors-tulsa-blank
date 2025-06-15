import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-tulsa-blue-700 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>Last Updated: April 28, 2025</p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">1. Introduction</h2>
          <p>
            Open Doors Tulsa ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">2. Information We Collect</h2>
          <p><strong>Personal Information</strong></p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials (username, password)</li>
            <li>Professional information (organization name, job title)</li>
            <li>Payment information (processed securely through our payment processor)</li>
          </ul>
          
          <p className="mt-4"><strong>Non-Personal Information</strong></p>
          <ul>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on the website</li>
            <li>Referring website addresses</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing transactions and sending related information</li>
            <li>Sending administrative information, updates, and service announcements</li>
            <li>Responding to inquiries and providing customer support</li>
            <li>Sending marketing and promotional communications (with opt-out options)</li>
            <li>Analyzing usage patterns and trends to enhance user experience</li>
            <li>Protecting against fraud and unauthorized access</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">4. Sharing of Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>Partner organizations with your consent</li>
            <li>Law enforcement or other government entities when required by law</li>
            <li>In connection with a business transfer (merger, acquisition, etc.)</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to request deletion of your information</li>
            <li>Right to restrict or object to processing</li>
            <li>Right to data portability</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on this page with a revised "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold text-tulsa-blue-700 mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2">
            Open Doors Tulsa<br />
            123 Main Street, Suite 456<br />
            Tulsa, OK 74103<br />
            privacy@opendoorstulsa.com<br />
            (918) 555-1234
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
