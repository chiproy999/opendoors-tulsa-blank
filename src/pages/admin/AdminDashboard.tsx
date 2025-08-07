
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, User, Users } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import QuickActionCard from '@/components/admin/QuickActionCard';
import SeedDataManager from '@/components/admin/SeedDataManager';
import { useAdminStats } from '@/hooks/useAdminStats';
import { STAT_CONFIG, QUICK_ACTIONS } from '@/constants/adminConfig';
import LoadingCard from '@/components/common/LoadingCard';
import ErrorState from '@/components/common/ErrorState';

const AdminDashboard = () => {
  const { totalJobs, totalHousing, totalUsers, totalEmployers, loading, error } = useAdminStats();

  const statsData = STAT_CONFIG.map(config => ({
    ...config,
    value: config.key === 'totalJobs' ? totalJobs :
           config.key === 'totalHousing' ? totalHousing :
           config.key === 'totalUsers' ? totalUsers :
           totalEmployers,
    icon: <config.icon className="h-8 w-8 text-red-500" />
  }));

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <ErrorState message={error} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : (
          statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              link={stat.link}
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="text-sm font-semibold">New job listing: Software Developer</p>
                <p className="text-xs text-muted-foreground">Added 2 hours ago by TechCorp</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="text-sm font-semibold">New housing listing: Downtown Apartment</p>
                <p className="text-xs text-muted-foreground">Added 3 hours ago by City Properties</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="text-sm font-semibold">New user registration: John Doe</p>
                <p className="text-xs text-muted-foreground">Registered 5 hours ago</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="text-sm font-semibold">Job application submitted</p>
                <p className="text-xs text-muted-foreground">6 hours ago by Sarah Johnson</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {QUICK_ACTIONS.map((action, index) => (
                <QuickActionCard
                  key={index}
                  to={action.to}
                  icon={<action.icon className={`h-10 w-10 ${action.color} mb-2`} />}
                  label={action.label}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <SeedDataManager />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
