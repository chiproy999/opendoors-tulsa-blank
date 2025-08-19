
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, UserCheck, UserX } from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  type: string;
  joined: string;
  status: 'Active' | 'Inactive';
}

const AdminUserAccounts = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          user_id,
          username,
          role,
          created_at
        `);

      if (error) throw error;

      // Note: supabase.auth.admin.listUsers requires service role key
      // For now, we'll use profile data only
      const userAccounts: UserAccount[] = profiles?.map(profile => {
        return {
          id: profile.user_id,
          name: profile.username || 'Unknown User',
          email: 'Email access restricted',
          type: profile.role || 'user',
          joined: new Date(profile.created_at).toLocaleDateString(),
          status: 'Active' as const
        };
      }) || [];

      setUsers(userAccounts);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch user accounts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      try {
        // Delete profile record (auth user deletion requires service role)
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('user_id', id);
          
        if (error) throw error;
        
        toast.success('User profile deleted successfully');
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user account');
      }
    }
  };
  
  const toggleUserRole = async (id: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', id);
        
      if (error) throw error;
      
      toast.success(`User role updated to ${newRole}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading users...</p>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.type === 'admin' ? 'bg-red-100 text-red-800' :
                      user.type === 'employer' ? 'bg-purple-100 text-purple-800' :
                      user.type === 'landlord' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.joined}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleUserRole(user.id, user.type)}
                        title={`Toggle admin role for ${user.name}`}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDelete(user.id)}
                        title={`Delete ${user.name}`}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
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
