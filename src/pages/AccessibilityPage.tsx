
import Layout from '@/components/layout/Layout';
import Hero from '@/components/common/Hero';
import SEOMeta from '@/components/home/SEOMeta';

const AccessibilityPage = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Accessibility Statement | Tulsa Open Doors" 
        description="Our commitment to digital accessibility and inclusive design for all users."
        keywords="accessibility, WCAG, ADA compliance, digital inclusion, web accessibility, disability access, screen reader, Tulsa Open Doors"
      />

      <Hero 
        title="Accessibility Statement"
        subtitle="Our commitment to making Tulsa Open Doors accessible to everyone"
      />

      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h2>Our Commitment</h2>
          <p>
            Tulsa Open Doors is committed to ensuring digital accessibility for people of all abilities. 
            We are continually improving the user experience for everyone and applying the relevant 
            accessibility standards.
          </p>
          
          <h2>Measures Taken</h2>
          <p>
            We've taken the following measures to ensure accessibility:
          </p>
          <ul>
            <li>Include accessibility throughout our internal policies</li>
            <li>Provide continual accessibility training for our staff</li>
            <li>Employ formal accessibility quality assurance methods</li>
            <li>Design with accessibility in mind from the beginning</li>
          </ul>
          
          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
            developers to improve accessibility for people with disabilities. It defines three levels 
            of conformance: Level A, Level AA, and Level AAA. Tulsa Open Doors is fully conformant with 
            WCAG 2.1 level AA. Fully conformant means that the content fully conforms to the accessibility 
            standard without any exceptions.
          </p>
          
          <h2>Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Tulsa Open Doors. Please let us know if you 
            encounter accessibility barriers:
          </p>
          <ul>
            <li>Phone: (918) 555-1234</li>
            <li>E-mail: accessibility@tulsaopendoors.org</li>
            <li>Postal address: 123 Main Street, Suite 456, Tulsa, OK 74103</li>
          </ul>
          <p>
            We try to respond to feedback within 2 business days.
          </p>
          
          <h2>Assessment Approach</h2>
          <p>
            Tulsa Open Doors assessed the accessibility of this website by the following approaches:
          </p>
          <ul>
            <li>Self-evaluation</li>
            <li>External evaluation</li>
            <li>User testing with assistive technologies</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AccessibilityPage;
