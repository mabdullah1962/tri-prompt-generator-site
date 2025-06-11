
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '../../pages/Index';

interface SignupFormProps {
  onSignupSuccess: (user: User) => void;
  onBackToLogin: () => void;
}

const SignupForm = ({ onSignupSuccess, onBackToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    // Mock signup - in real app, this would connect to your backend
    const newUser: User = {
      id: Math.random().toString(),
      username: formData.username,
      role: formData.role as 'patient' | 'staff',
      name: formData.name,
      email: formData.email,
    };

    onSignupSuccess(newUser);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/50 via-purple-600/50 to-pink-500/50">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            MEDICORE HMS
          </h1>
          <p className="text-gray-600 mt-2">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500/50"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500/50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500/50"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
            <Select onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger className="mt-1 border-2 border-gray-200 focus:border-blue-500/50">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="staff">Staff/Doctor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500/50"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="mt-1 border-2 border-gray-200 focus:border-blue-500/50"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50/80 p-3 rounded-lg border border-red-200">{error}</div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-700/80 hover:to-purple-700/80 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={onBackToLogin}
            className="text-blue-600/80 hover:text-blue-700/80 font-medium transition-colors"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
