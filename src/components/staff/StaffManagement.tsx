
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Staff {
  id: number;
  name: string;
  role: string;
  contact: string;
  salary: number;
  gender: string;
}

const StaffManagement = () => {
  const [staff] = useState<Staff[]>([
    {
      id: 901,
      name: 'Nadia Ahmed',
      role: 'Nurse',
      contact: '03171234567',
      salary: 30000,
      gender: 'Female'
    },
    {
      id: 902,
      name: 'Bilal Hussain',
      role: 'Receptionist',
      contact: '03331234567',
      salary: 40000,
      gender: 'Male'
    },
    {
      id: 903,
      name: 'Ayesha Mirza',
      role: 'Technician',
      contact: '03471234567',
      salary: 28000,
      gender: 'Female'
    },
    {
      id: 904,
      name: 'Omar Farooq',
      role: 'Pharmacist',
      contact: '03251234567',
      salary: 35000,
      gender: 'Male'
    },
    {
      id: 905,
      name: 'Hina Qureshi',
      role: 'Receptionist',
      contact: '03191234567',
      salary: 30000,
      gender: 'Female'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filteredStaff = staff.filter(member =>
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.contact.includes(searchTerm)) &&
    (filterRole === '' || member.role === filterRole)
  );

  const roles = [...new Set(staff.map(member => member.role))];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Nurse': return 'bg-pink-100 text-pink-800';
      case 'Receptionist': return 'bg-blue-100 text-blue-800';
      case 'Technician': return 'bg-green-100 text-green-800';
      case 'Pharmacist': return 'bg-purple-100 text-purple-800';
      case 'Cleaner': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          + Add New Staff
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="search">Search Staff</Label>
            <Input
              id="search"
              placeholder="Search by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Filter by Role</Label>
            <select 
              id="role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Gender</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{member.id}</td>
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{member.gender}</td>
                  <td className="py-3 px-4">{member.contact}</td>
                  <td className="py-3 px-4 font-medium text-green-600">Rs. {member.salary.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Staff Member</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="staffName">Full Name</Label>
                <Input id="staffName" placeholder="Enter staff name" />
              </div>
              <div>
                <Label htmlFor="staffRole">Role</Label>
                <select id="staffRole" className="w-full p-2 border rounded">
                  <option value="">Select role</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Technician">Technician</option>
                  <option value="Cleaner">Cleaner</option>
                </select>
              </div>
              <div>
                <Label htmlFor="staffGender">Gender</Label>
                <select id="staffGender" className="w-full p-2 border rounded">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="staffContact">Contact Number</Label>
                <Input id="staffContact" placeholder="Enter contact number" />
              </div>
              <div>
                <Label htmlFor="staffSalary">Salary (Rs.)</Label>
                <Input id="staffSalary" type="number" placeholder="Enter salary" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                >
                  Add Staff
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
