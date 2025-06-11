
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, UserCheck } from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  department?: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

interface AppointmentManagementProps {
  userRole?: 'admin' | 'patient' | 'staff';
}

const AppointmentManagement = ({ userRole = 'admin' }: AppointmentManagementProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 301,
      patientName: 'Ali Raza',
      doctorName: 'Dr. Ayesha Khan',
      department: 'Cardiology',
      date: '2025-05-23',
      time: '10:00',
      status: 'Scheduled',
      notes: 'Routine checkup'
    },
    {
      id: 302,
      patientName: 'Fatima Noor',
      doctorName: 'Dr. Imran Malik',
      date: '2025-05-24',
      time: '11:30',
      status: 'Scheduled',
      notes: 'Migraine complaints'
    },
    {
      id: 303,
      patientName: 'Zainab Ali',
      doctorName: 'Dr. Kamran Javed',
      date: '2025-05-25',
      time: '09:30',
      status: 'Completed',
      notes: 'Child vaccination'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    notes: ''
  });

  // Mock data for dropdowns
  const mockPatients = [
    { id: '201', name: 'Ali Raza' },
    { id: '202', name: 'Fatima Noor' },
    { id: '203', name: 'Zainab Ali' },
  ];

  const mockDoctors = [
    { id: '101', name: 'Dr. Ayesha Khan', specialization: 'Cardiologist', department: 'Cardiology' },
    { id: '102', name: 'Dr. Imran Malik', specialization: 'Neurologist', department: 'Neurology' },
    { id: '103', name: 'Dr. Sana Shah', specialization: 'Orthopedic Surgeon', department: 'Orthopedics' },
    { id: '104', name: 'Dr. Kamran Javed', specialization: 'Pediatrician', department: 'Pediatrics' },
    { id: '105', name: 'Dr. Maria Siddiqui', specialization: 'Dermatologist', department: 'Dermatology' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPatient = mockPatients.find(p => p.id === formData.patientId);
    const selectedDoctor = mockDoctors.find(d => d.id === formData.doctorId);
    
    const newAppointment = {
      id: Date.now(),
      patientName: selectedPatient?.name || '',
      doctorName: selectedDoctor?.name || '',
      department: selectedDoctor?.department || '',
      date: formData.date,
      time: formData.time,
      status: 'Scheduled',
      notes: formData.notes
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ patientId: '', doctorId: '', date: '', time: '', notes: '' });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Appointment Management</h2>
        {(userRole === 'admin' || userRole === 'patient') && (
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-700/80 hover:to-purple-700/80 text-white"
          >
            Book New Appointment
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="border-blue-500/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80">
            <CardTitle className="text-blue-800">Book New Appointment</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="patient" className="text-gray-700 font-medium">Patient</Label>
                <Select onValueChange={(value) => setFormData({...formData, patientId: value})}>
                  <SelectTrigger className="border-blue-500/20 focus:border-blue-500/50">
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-blue-500/20">
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-blue-600/80" />
                          <span>{patient.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="doctor" className="text-gray-700 font-medium">Doctor</Label>
                <Select onValueChange={(value) => setFormData({...formData, doctorId: value})}>
                  <SelectTrigger className="border-blue-500/20 focus:border-blue-500/50">
                    <SelectValue placeholder="Select Doctor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-blue-500/20">
                    {mockDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-green-600/80" />
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialization} - {doctor.department}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" className="text-gray-700 font-medium">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="border-blue-500/20 focus:border-blue-500/50"
                  required
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-gray-700 font-medium">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="border-blue-500/20 focus:border-blue-500/50"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes" className="text-gray-700 font-medium">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="border-blue-500/20 focus:border-blue-500/50"
                  placeholder="Additional notes"
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-green-600/80 to-blue-600/80 hover:from-green-700/80 hover:to-blue-700/80 text-white"
                >
                  Book Appointment
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-gray-300 text-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80">
              <CardTitle className="text-lg text-blue-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Appointment #{appointment.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-2 text-blue-600/80" />
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <UserCheck className="w-4 h-4 mr-2 text-green-600/80" />
                <span>{appointment.doctorName}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-purple-600/80" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-orange-600/80" />
                <span>{appointment.time}</span>
              </div>
              <div className="mt-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'Scheduled' 
                    ? 'bg-green-100/80 text-green-800' 
                    : 'bg-gray-100/80 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              {appointment.notes && (
                <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentManagement;
