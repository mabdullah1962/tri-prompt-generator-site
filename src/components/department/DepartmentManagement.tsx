
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Department {
  id: number;
  name: string;
  description: string;
  doctorCount: number;
  headOfDepartment: string;
}

const DepartmentManagement = () => {
  const [departments] = useState<Department[]>([
    {
      id: 1,
      name: 'Cardiology',
      description: 'Heart and blood vessel treatments',
      doctorCount: 5,
      headOfDepartment: 'Dr. Ayesha Khan'
    },
    {
      id: 2,
      name: 'Neurology',
      description: 'Brain and nervous system care',
      doctorCount: 3,
      headOfDepartment: 'Dr. Imran Malik'
    },
    {
      id: 3,
      name: 'Orthopedics',
      description: 'Bone and muscle care',
      doctorCount: 4,
      headOfDepartment: 'Dr. Sana Shah'
    },
    {
      id: 4,
      name: 'Pediatrics',
      description: 'Child healthcare',
      doctorCount: 3,
      headOfDepartment: 'Dr. Kamran Javed'
    },
    {
      id: 5,
      name: 'Dermatology',
      description: 'Skin related treatments',
      doctorCount: 2,
      headOfDepartment: 'Dr. Maria Siddiqui'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const departmentColors = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-violet-500'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          + Add New Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <div key={department.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`bg-gradient-to-r ${departmentColors[index % departmentColors.length]} p-6 text-white`}>
              <h3 className="text-xl font-bold">{department.name}</h3>
              <p className="text-sm opacity-90 mt-1">{department.description}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Head of Department:</span>
                  <span className="font-medium">{department.headOfDepartment}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Doctors:</span>
                  <span className="font-bold text-blue-600">{department.doctorCount}</span>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Doctors
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Department</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" placeholder="Enter department name" />
              </div>
              <div>
                <Label htmlFor="deptDescription">Description</Label>
                <Input id="deptDescription" placeholder="Enter description" />
              </div>
              <div>
                <Label htmlFor="headDoctor">Head of Department</Label>
                <Input id="headDoctor" placeholder="Select head doctor" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                >
                  Save Department
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

export default DepartmentManagement;
