
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

// Mock data
const initialJobs = [
  { 
    id: '1', 
    title: 'Software Developer', 
    company: 'TechCorp', 
    location: 'Tulsa, OK',
    type: 'Full-time',
    posted: '2023-05-15',
    status: 'Active'
  },
  { 
    id: '2', 
    title: 'Warehouse Associate', 
    company: 'Logistics Inc.', 
    location: 'Tulsa, OK',
    type: 'Full-time',
    posted: '2023-05-14',
    status: 'Active'
  },
  { 
    id: '3', 
    title: 'Customer Service Representative', 
    company: 'Support Solutions', 
    location: 'Tulsa, OK',
    type: 'Part-time',
    posted: '2023-05-12',
    status: 'Active'
  },
  { 
    id: '4', 
    title: 'Administrative Assistant', 
    company: 'Tulsa Medical Center', 
    location: 'Tulsa, OK',
    type: 'Full-time',
    posted: '2023-05-10',
    status: 'Inactive'
  },
  { 
    id: '5', 
    title: 'Delivery Driver', 
    company: 'Quick Delivery', 
    location: 'Tulsa, OK',
    type: 'Part-time',
    posted: '2023-05-08',
    status: 'Active'
  }
];

const AdminJobListings = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };
  
  return (
    <AdminLayout title="Job Listings">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Link to="/admin/jobs/create">
          <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Job
          </Button>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.posted}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/jobs/edit/${job.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No jobs found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminJobListings;
