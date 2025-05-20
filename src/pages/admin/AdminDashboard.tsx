
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: 'Jobs', 
      value: '42', 
      description: 'Active job listings',
      icon: <Briefcase className="h-8 w-8 text-red-500" />,
      link: '/admin/jobs'
    },
    { 
      title: 'Housing', 
      value: '67', 
      description: 'Available properties',
      icon: <Building className="h-8 w-8 text-red-500" />,
      link: '/admin/housing'
    },
    { 
      title: 'Users', 
      value: '189', 
      description: 'Registered users',
      icon: <Users className="h-8 w-8 text-red-500" />,
      link: '/admin/users'
    },
    { 
      title: 'Employers', 
      value: '24', 
      description: 'Registered employers',
      icon: <User className="h-8 w-8 text-red-500" />,
      link: '/admin/users?type=employer'
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
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
              <Link to="/admin/jobs/create">
                <Card className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col justify-center items-center p-4">
                  <Briefcase className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-sm font-medium">Add Job Listing</p>
                </Card>
              </Link>
              <Link to="/admin/housing/create">
                <Card className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col justify-center items-center p-4">
                  <Building className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-sm font-medium">Add Housing Listing</p>
                </Card>
              </Link>
              <Link to="/admin/users/create">
                <Card className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col justify-center items-center p-4">
                  <User className="h-10 w-10 text-red-500 mb-2" />
                  <p className="text-sm font-medium">Add User</p>
                </Card>
              </Link>
              <Link to="/admin/settings">
                <Card className="hover:bg-red-50 dark:hover:bg-gray-800 transition-colors cursor-pointer h-full flex flex-col justify-center items-center p-4">
                  <svg className="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-medium">Settings</p>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
