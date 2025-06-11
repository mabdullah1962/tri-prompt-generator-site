
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '../../pages/Index';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock authentication - in real app, this would connect to your backend
  const mockUsers = {
    'admin': { id: '1', username: 'admin', role: 'admin' as const, name: 'System Administrator' },
    'patient': { id: '201', username: 'patient', role: 'patient' as const, name: 'Ali Raza', email: 'ali.raza@example.com' },
    'doctor': { id: '101', username: 'doctor', role: 'staff' as const, name: 'Dr. Ayesha Khan', email: 'ayesha.khan@hospital.com' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers[username as keyof typeof mockUsers];
    if (user && password === 'password') {
      onLogin(user);
    } else {
      setError('Invalid credentials. Use: admin/password, patient/password, or doctor/password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            MEDICORE HMS
          </h1>
          <p className="text-gray-600 mt-2">Hospital Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-500">Admin: admin/password</p>
          <p className="text-xs text-gray-500">Patient: patient/password</p>
          <p className="text-xs text-gray-500">Doctor: doctor/password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
