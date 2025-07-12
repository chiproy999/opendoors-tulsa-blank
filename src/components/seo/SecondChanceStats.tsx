import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatData {
  value: string;
  label: string;
  description: string;
  source: string;
  studyTitle: string;
  sourceUrl: string;
  publicationYear: string;
}

const SecondChanceStats = () => {
  const stats: StatData[] = [
    {
      value: "68%",
      label: "Employment Rate",
      description: "Of persons released from federal prison in 2010, 68% were employed in the first year after release",
      source: "Bureau of Justice Statistics",
      studyTitle: "Employment of Persons Released from Federal Prison in 2010",
      sourceUrl: "https://bjs.ojp.gov/content/pub/pdf/eprfp10.pdf",
      publicationYear: "2021"
    },
    {
      value: "83%",
      label: "Nine-Year Recidivism",
      description: "83% of state prisoners released in 2005 were arrested at least once during 9 years following release",
      source: "Bureau of Justice Statistics",
      studyTitle: "2018 Update on Prisoner Recidivism: A 9-year Follow-up Period (2005-2014)",
      sourceUrl: "https://bjs.ojp.gov/content/pub/pdf/18upr9yfup0514.pdf",
      publicationYear: "2018"
    },
    {
      value: "64.6M",
      label: "Americans Affected",
      description: "An estimated 64.6 million Americans (25% of the population) have a criminal record",
      source: "RAND Corporation",
      studyTitle: "Incentivizing Employers to Hire Ex-Offenders",
      sourceUrl: "https://www.rand.org/content/dam/rand/pubs/research_briefs/RB10000/RB10003/RAND_RB10003.pdf",
      publicationYear: "2017"
    },
    {
      value: "19.8M",
      label: "Felony Convictions",
      description: "Of Americans with criminal records, 19.8 million have at least one felony conviction",
      source: "RAND Corporation",
      studyTitle: "Incentivizing Employers to Hire Ex-Offenders",
      sourceUrl: "https://www.rand.org/content/dam/rand/pubs/research_briefs/RB10000/RB10003/RAND_RB10003.pdf",
      publicationYear: "2017"
    }
  ];

  useEffect(() => {
    // Add structured data for statistics
    addStatisticsSchema();
  }, []);

  const addStatisticsSchema = () => {
    const statisticsSchema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Second Chance Employment Success Statistics",
      "description": "Statistical data on the success rates and benefits of second chance employment and housing programs",
      "creator": {
        "@type": "Organization",
        "name": "Open Doors Tulsa"
      },
      "citation": stats.map(stat => ({
        "@type": "CreativeWork",
        "name": stat.label,
        "text": stat.description,
        "creator": {
          "@type": "Organization",
          "name": stat.source
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'statistics-schema');
    script.textContent = JSON.stringify(statisticsSchema);
    document.head.appendChild(script);
  };

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            The Impact of Second Chance Opportunities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Research consistently shows that providing employment and housing opportunities 
            to individuals with conviction histories creates positive outcomes for communities, 
            businesses, and individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-foreground">
                  {stat.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {stat.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  <a 
                    href={stat.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium block mb-1"
                  >
                    {stat.studyTitle}
                  </a>
                  <p className="italic">
                    {stat.source} ({stat.publicationYear})
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All statistics are sourced from peer-reviewed federal studies and reports. 
            Click on study titles above to access original source documents.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-2 text-sm">Data Sources & Methodology</h4>
            <p className="text-xs text-muted-foreground">
              Data reflects findings from longitudinal federal studies tracking employment and recidivism outcomes 
              for formerly incarcerated individuals. Statistics represent documented findings from the Bureau of Justice Statistics 
              and RAND Corporation research programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondChanceStats;