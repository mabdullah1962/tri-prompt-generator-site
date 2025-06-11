
import { useState } from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import DashboardHome from './DashboardHome';
import AppointmentManagement from '../appointment/AppointmentManagement';
import DoctorManagement from '../doctor/DoctorManagement';
import PatientManagement from '../patient/PatientManagement';
import TreatmentManagement from '../treatment/TreatmentManagement';
import { User } from '../../pages/Index';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

const StaffDashboard = ({ user, onLogout }: StaffDashboardProps) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const staffMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'appointments', label: 'My Appointments', icon: '📅' },
    { id: 'patients', label: 'Patient History', icon: '👥' },
    { id: 'doctors', label: 'Department Doctors', icon: '👨‍⚕️' },
    { id: 'treatments', label: 'Treatments', icon: '💊' },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardHome userRole="staff" />;
      case 'appointments': return <AppointmentManagement userRole="staff" />;
      case 'patients': return <PatientManagement userRole="staff" />;
      case 'doctors': return <DoctorManagement userRole="staff" />;
      case 'treatments': return <TreatmentManagement userRole="staff" />;
      default: return <DashboardHome userRole="staff" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <Header user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar 
          menuItems={staffMenuItems}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        <main className="flex-1 p-6 bg-white/30 backdrop-blur-sm">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
