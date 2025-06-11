
import { useState } from 'react';
import { 
  Home, 
  Users, 
  UserCheck, 
  Building, 
  Calendar, 
  Pill, 
  CreditCard, 
  BedDouble, 
  UserCog, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const iconMap = {
  '🏠': Home,
  '👥': Users,
  '👨‍⚕️': UserCheck,
  '🏢': Building,
  '📅': Calendar,
  '💊': Pill,
  '💰': CreditCard,
  '🏥': BedDouble,
  '👷': UserCog,
  '📊': FileText,
  '📋': FileText,
};

const Sidebar = ({ menuItems, activeModule, onModuleChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white/95 backdrop-blur-sm shadow-xl min-h-screen border-r border-blue-500/20 transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-white/90 border border-blue-500/30 rounded-full p-1.5 shadow-lg hover:bg-blue-50/80 transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-blue-600/80" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-blue-600/80" />
        )}
      </button>

      {/* Logo Section */}
      <div className="p-4 border-b border-blue-500/10">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MEDICORE
              </h1>
              <p className="text-xs text-gray-500">HMS</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-left rounded-lg transition-all duration-200 group ${
                    activeModule === item.id
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50/80 hover:text-blue-600/80'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <IconComponent className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'} transition-colors`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
