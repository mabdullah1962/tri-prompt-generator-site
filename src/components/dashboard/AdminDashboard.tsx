
import { useState } from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import DashboardHome from './DashboardHome';
import PatientManagement from '../patient/PatientManagement';
import DoctorManagement from '../doctor/DoctorManagement';
import DepartmentManagement from '../department/DepartmentManagement';
import AppointmentManagement from '../appointment/AppointmentManagement';
import TreatmentManagement from '../treatment/TreatmentManagement';
import BillingManagement from '../billing/BillingManagement';
import RoomManagement from '../room/RoomManagement';
import StaffManagement from '../staff/StaffManagement';
import MedicalReports from '../reports/MedicalReports';
import { User } from '../../pages/Index';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'patients', label: 'Patients', icon: '👥' },
    { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'treatments', label: 'Treatments', icon: '💊' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'rooms', label: 'Rooms', icon: '🏥' },
    { id: 'staff', label: 'Staff', icon: '👷' },
    { id: 'reports', label: 'Reports', icon: '📊' },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardHome userRole="admin" />;
      case 'patients': return <PatientManagement />;
      case 'doctors': return <DoctorManagement />;
      case 'departments': return <DepartmentManagement />;
      case 'appointments': return <AppointmentManagement userRole="admin" />;
      case 'treatments': return <TreatmentManagement />;
      case 'billing': return <BillingManagement userRole="admin" />;
      case 'rooms': return <RoomManagement />;
      case 'staff': return <StaffManagement />;
      case 'reports': return <MedicalReports userRole="admin" />;
      default: return <DashboardHome userRole="admin" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--content-bg))' }}>
      <Sidebar 
        menuItems={adminMenuItems}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />
      <Header user={user} onLogout={onLogout} />
      <main className="ml-64 pt-20 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
