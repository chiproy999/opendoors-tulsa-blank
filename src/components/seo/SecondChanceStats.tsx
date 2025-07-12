import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatData {
  value: string;
  label: string;
  description: string;
  source: string;
}

const SecondChanceStats = () => {
  const stats: StatData[] = [
    {
      value: "68%",
      label: "Reduction in Recidivism",
      description: "Employment within one year of release reduces recidivism by 68%",
      source: "Council of State Governments Justice Center"
    },
    {
      value: "50%",
      label: "Lower Reoffense Rate",
      description: "Individuals with stable housing have 50% lower reoffense rates",
      source: "Urban Institute Justice Policy Center"
    },
    {
      value: "78%",
      label: "Employment Success Rate",
      description: "Of people who find employment through second-chance programs",
      source: "National Institute of Justice"
    },
    {
      value: "2.6x",
      label: "Economic Impact",
      description: "Every dollar invested in reentry programs saves $2.60 in criminal justice costs",
      source: "Vera Institute of Justice"
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
                <p className="text-xs text-muted-foreground italic">
                  Source: {stat.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            These statistics demonstrate the proven value of second chance employment and housing programs 
            in reducing recidivism, strengthening communities, and providing positive economic outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecondChanceStats;