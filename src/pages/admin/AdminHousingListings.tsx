
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

// Mock data
const initialListings = [
  { 
    id: '1', 
    title: '2 Bedroom Apartment', 
    location: 'Downtown Tulsa',
    price: '$850/mo',
    bedrooms: '2',
    bathrooms: '1',
    landlord: 'City Properties',
    status: 'Available'
  },
  { 
    id: '2', 
    title: 'Studio Apartment', 
    location: 'Midtown Tulsa',
    price: '$650/mo',
    bedrooms: 'Studio',
    bathrooms: '1',
    landlord: 'Urban Living',
    status: 'Available'
  },
  { 
    id: '3', 
    title: '3 Bedroom House', 
    location: 'South Tulsa',
    price: '$1200/mo',
    bedrooms: '3',
    bathrooms: '2',
    landlord: 'Homes For All',
    status: 'Available'
  },
  { 
    id: '4', 
    title: '1 Bedroom Condo', 
    location: 'East Tulsa',
    price: '$750/mo',
    bedrooms: '1',
    bathrooms: '1',
    landlord: 'Riverside Management',
    status: 'Pending'
  },
  { 
    id: '5', 
    title: '2 Bedroom Townhouse', 
    location: 'North Tulsa',
    price: '$950/mo',
    bedrooms: '2',
    bathrooms: '1.5',
    landlord: 'Quality Housing',
    status: 'Available'
  }
];

const AdminHousingListings = () => {
  const [listings, setListings] = useState(initialListings);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.landlord.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this housing listing?')) {
      setListings(listings.filter(listing => listing.id !== id));
    }
  };
  
  return (
    <AdminLayout title="Housing Listings">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search housing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Link to="/admin/housing/create">
          <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Listing
          </Button>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Beds/Baths</TableHead>
              <TableHead className="hidden md:table-cell">Landlord</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>{listing.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{listing.price}</TableCell>
                  <TableCell className="hidden md:table-cell">{listing.bedrooms} bd / {listing.bathrooms} ba</TableCell>
                  <TableCell className="hidden md:table-cell">{listing.landlord}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/housing/edit/${listing.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDelete(listing.id)}
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
                  No properties found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminHousingListings;
