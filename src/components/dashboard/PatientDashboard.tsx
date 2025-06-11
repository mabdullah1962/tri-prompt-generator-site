
import { useState } from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import DashboardHome from './DashboardHome';
import AppointmentManagement from '../appointment/AppointmentManagement';
import BillingManagement from '../billing/BillingManagement';
import DoctorManagement from '../doctor/DoctorManagement';
import MedicalReports from '../reports/MedicalReports';
import { User } from '../../pages/Index';

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

const PatientDashboard = ({ user, onLogout }: PatientDashboardProps) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const patientMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'appointments', label: 'My Appointments', icon: '📅' },
    { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { id: 'billing', label: 'My Bills', icon: '💰' },
    { id: 'reports', label: 'Medical Reports', icon: '📋' },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardHome userRole="patient" />;
      case 'appointments': return <AppointmentManagement userRole="patient" />;
      case 'doctors': return <DoctorManagement userRole="patient" />;
      case 'billing': return <BillingManagement userRole="patient" />;
      case 'reports': return <MedicalReports userRole="patient" />;
      default: return <DashboardHome userRole="patient" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <Header user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar 
          menuItems={patientMenuItems}
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

export default PatientDashboard;
