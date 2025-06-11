
import { Button } from '@/components/ui/button';
import { User } from '../../pages/Index';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500/80 to-pink-500/80';
      case 'patient': return 'bg-gradient-to-r from-green-500/80 to-blue-500/80';
      case 'staff': return 'bg-gradient-to-r from-purple-500/80 to-indigo-500/80';
      default: return 'bg-gradient-to-r from-gray-500/80 to-gray-600/80';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              MEDICORE HMS
            </h1>
            <span className={`ml-4 px-3 py-1 rounded-full text-white text-sm font-medium ${getRoleColor(user.role)}`}>
              {user.role.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-gray-900 font-medium">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="border-2 border-red-500/80 text-red-500/80 hover:bg-red-500/80 hover:text-white transition-colors"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
