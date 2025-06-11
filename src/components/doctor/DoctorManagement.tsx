
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  department: string;
  contact: string;
  email: string;
  availability: string;
}

const DoctorManagement = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [doctors] = useState<Doctor[]>([
    {
      id: 101,
      name: 'Dr. Ayesha Khan',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      contact: '03111234567',
      email: 'ayesha.khan@hospital.com',
      availability: 'Available'
    },
    {
      id: 102,
      name: 'Dr. Imran Malik',
      specialization: 'Neurologist',
      department: 'Neurology',
      contact: '03021234567',
      email: 'imran.malik@hospital.com',
      availability: 'Available'
    },
    {
      id: 103,
      name: 'Dr. Sana Shah',
      specialization: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      contact: '03451234567',
      email: 'sana.shah@hospital.com',
      availability: 'Unavailable'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTitle = () => {
    if (userRole === 'patient') return 'Available Doctors';
    if (userRole === 'staff') return 'Department Doctors';
    return 'Doctor Management';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
        {userRole === 'admin' && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            + Add New Doctor
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <Label htmlFor="search">Search Doctors</Label>
          <Input
            id="search"
            placeholder="Search by name, specialization, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 mr-4">
                  <span className="text-white text-xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-medium">Department:</span> {doctor.department}</p>
                <p className="text-sm"><span className="font-medium">Contact:</span> {doctor.contact}</p>
                <p className="text-sm"><span className="font-medium">Email:</span> {doctor.email}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.availability}
                </span>
                
                {userRole === 'patient' && doctor.availability === 'Available' && (
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600">
                    Book Appointment
                  </Button>
                )}
                
                {userRole === 'admin' && (
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600">Delete</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddForm && userRole === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="doctorName">Full Name</Label>
                <Input id="doctorName" placeholder="Enter doctor name" />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="Enter specialization" />
              </div>
              <div>
                <Label htmlFor="doctorContact">Contact Number</Label>
                <Input id="doctorContact" placeholder="Enter contact number" />
              </div>
              <div>
                <Label htmlFor="doctorEmail">Email</Label>
                <Input id="doctorEmail" type="email" placeholder="Enter email" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  Save Doctor
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

export default DoctorManagement;
