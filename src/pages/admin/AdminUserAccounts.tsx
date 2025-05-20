
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, UserCheck, UserX } from 'lucide-react';

// Mock data
const initialUsers = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john.smith@example.com',
    type: 'Seeker',
    joined: '2023-04-15',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com',
    type: 'Seeker',
    joined: '2023-04-20',
    status: 'Active'
  },
  { 
    id: '3', 
    name: 'TechCorp HR', 
    email: 'hr@techcorp.com',
    type: 'Employer',
    joined: '2023-03-10',
    status: 'Active'
  },
  { 
    id: '4', 
    name: 'City Properties', 
    email: 'leasing@cityproperties.com',
    type: 'Landlord',
    joined: '2023-02-22',
    status: 'Active'
  },
  { 
    id: '5', 
    name: 'Michael Brown', 
    email: 'mbrown@example.com',
    type: 'Seeker',
    joined: '2023-05-01',
    status: 'Inactive'
  }
];

const AdminUserAccounts = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  const toggleStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };
  
  return (
    <AdminLayout title="User Accounts">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Link to="/admin/users/create">
          <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New User
          </Button>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.type === 'Seeker' ? 'bg-blue-100 text-blue-800' :
                      user.type === 'Employer' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {user.type}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.joined}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleStatus(user.id)}
                        title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.status === 'Active' ? (
                          <UserX className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-500 hover:text-green-700" />
                        )}
                      </Button>
                      <Link to={`/admin/users/edit/${user.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminUserAccounts;
