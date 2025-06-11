
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

const AppointmentManagement = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [appointments] = useState<Appointment[]>([
    {
      id: 301,
      patientName: 'Ali Raza',
      doctorName: 'Dr. Ayesha Khan',
      date: '2025-05-23',
      time: '10:00:00',
      status: 'Scheduled',
      notes: 'Routine checkup'
    },
    {
      id: 302,
      patientName: 'Fatima Noor',
      doctorName: 'Dr. Imran Malik',
      date: '2025-05-24',
      time: '11:30:00',
      status: 'Scheduled',
      notes: 'Migraine complaints'
    },
    {
      id: 303,
      patientName: 'Zainab Ali',
      doctorName: 'Dr. Kamran Javed',
      date: '2025-05-25',
      time: '09:30:00',
      status: 'Completed',
      notes: 'Child vaccination'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getTitle = () => {
    if (userRole === 'patient') return 'My Appointments';
    if (userRole === 'staff') return 'My Appointments';
    return 'Appointment Management';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
        {(userRole === 'admin' || userRole === 'patient') && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            + {userRole === 'patient' ? 'Book Appointment' : 'Add Appointment'}
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {userRole === 'patient' ? 'Doctor' : 'Patient'}
                </th>
                {userRole !== 'patient' && (
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Doctor</th>
                )}
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{appointment.id}</td>
                  <td className="py-3 px-4 font-medium">
                    {userRole === 'patient' ? appointment.doctorName : appointment.patientName}
                  </td>
                  {userRole !== 'patient' && (
                    <td className="py-3 px-4">{appointment.doctorName}</td>
                  )}
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{appointment.notes}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {appointment.status === 'Scheduled' && (
                        <>
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                            Cancel
                          </Button>
                        </>
                      )}
                      {userRole === 'staff' && appointment.status === 'Scheduled' && (
                        <Button size="sm" className="bg-green-600">Complete</Button>
                      )}
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
            <h2 className="text-xl font-bold mb-4">
              {userRole === 'patient' ? 'Book Appointment' : 'Add Appointment'}
            </h2>
            <form className="space-y-4">
              {userRole !== 'patient' && (
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Input id="patient" placeholder="Select patient" />
                </div>
              )}
              <div>
                <Label htmlFor="doctor">Doctor</Label>
                <Input id="doctor" placeholder="Select doctor" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional notes" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  Book Appointment
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

export default AppointmentManagement;
