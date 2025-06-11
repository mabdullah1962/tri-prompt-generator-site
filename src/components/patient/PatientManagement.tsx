
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  contact: string;
  email: string;
  bloodGroup: string;
  registrationDate: string;
}

const PatientManagement = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [patients] = useState<Patient[]>([
    {
      id: 201,
      name: 'Ali Raza',
      gender: 'Male',
      age: 34,
      contact: '03211234567',
      email: 'ali.raza@example.com',
      bloodGroup: 'A+',
      registrationDate: '2025-05-01'
    },
    {
      id: 202,
      name: 'Fatima Noor',
      gender: 'Female',
      age: 39,
      contact: '03121234567',
      email: 'fatima.noor@example.com',
      bloodGroup: 'B+',
      registrationDate: '2025-05-02'
    },
    {
      id: 203,
      name: 'Zainab Ali',
      gender: 'Female',
      age: 24,
      contact: '03051234567',
      email: 'zainab.ali@example.com',
      bloodGroup: 'O+',
      registrationDate: '2025-05-03'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {userRole === 'staff' ? 'Patient History' : 'Patient Management'}
        </h1>
        {userRole === 'admin' && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            + Add New Patient
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <Label htmlFor="search">Search Patients</Label>
          <Input
            id="search"
            placeholder="Search by name or contact number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Gender</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Blood Group</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Registration</th>
                {userRole === 'admin' && <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{patient.id}</td>
                  <td className="py-3 px-4 font-medium">{patient.name}</td>
                  <td className="py-3 px-4">{patient.gender}</td>
                  <td className="py-3 px-4">{patient.age}</td>
                  <td className="py-3 px-4">{patient.contact}</td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3 px-4">{patient.registrationDate}</td>
                  {userRole === 'admin' && (
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600">Delete</Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && userRole === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="patientName">Full Name</Label>
                <Input id="patientName" placeholder="Enter patient name" />
              </div>
              <div>
                <Label htmlFor="patientContact">Contact Number</Label>
                <Input id="patientContact" placeholder="Enter contact number" />
              </div>
              <div>
                <Label htmlFor="patientEmail">Email</Label>
                <Input id="patientEmail" type="email" placeholder="Enter email" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  Save Patient
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

export default PatientManagement;
