
import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import PatientDashboard from '../components/dashboard/PatientDashboard';
import StaffDashboard from '../components/dashboard/StaffDashboard';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'patient' | 'staff';
  name: string;
  email?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {user.role === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
      {user.role === 'patient' && <PatientDashboard user={user} onLogout={handleLogout} />}
      {user.role === 'staff' && <StaffDashboard user={user} onLogout={handleLogout} />}
    </div>
  );
};

export default Index;
