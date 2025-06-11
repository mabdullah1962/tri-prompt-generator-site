
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Treatment {
  id: number;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  date: string;
  medications: string;
  followUp: boolean;
}

const TreatmentManagement = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [treatments] = useState<Treatment[]>([
    {
      id: 401,
      patientName: 'Ali Raza',
      doctorName: 'Dr. Ayesha Khan',
      diagnosis: 'Hypertension',
      date: '2025-05-10',
      medications: 'Amlodipine',
      followUp: true
    },
    {
      id: 402,
      patientName: 'Fatima Noor',
      doctorName: 'Dr. Imran Malik',
      diagnosis: 'Migraine',
      date: '2025-05-12',
      medications: 'Sumatriptan',
      followUp: false
    },
    {
      id: 403,
      patientName: 'Zainab Ali',
      doctorName: 'Dr. Kamran Javed',
      diagnosis: 'Chickenpox',
      date: '2025-05-20',
      medications: 'Acyclovir',
      followUp: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Treatment Management</h1>
        {userRole === 'staff' && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            + Add Treatment Record
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Diagnosis</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Medications</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Follow-up</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr key={treatment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{treatment.id}</td>
                  <td className="py-3 px-4 font-medium">{treatment.patientName}</td>
                  <td className="py-3 px-4">{treatment.doctorName}</td>
                  <td className="py-3 px-4">{treatment.diagnosis}</td>
                  <td className="py-3 px-4">{treatment.date}</td>
                  <td className="py-3 px-4">{treatment.medications}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      treatment.followUp 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {treatment.followUp ? 'Required' : 'Not Required'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {userRole === 'staff' && (
                        <Button size="sm" variant="outline">Edit</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && userRole === 'staff' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add Treatment Record</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Input id="patient" placeholder="Select patient" />
              </div>
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input id="diagnosis" placeholder="Enter diagnosis" />
              </div>
              <div>
                <Label htmlFor="medications">Prescribed Medications</Label>
                <Input id="medications" placeholder="Enter medications" />
              </div>
              <div>
                <Label htmlFor="treatmentDate">Treatment Date</Label>
                <Input id="treatmentDate" type="date" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Treatment description" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="followUp" />
                <Label htmlFor="followUp">Follow-up required</Label>
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                >
                  Save Treatment
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

export default TreatmentManagement;
