
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
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen fixed left-0 top-0 z-40 transition-all duration-300`} style={{ backgroundColor: 'hsl(var(--sidebar-bg))' }}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-lg hover:bg-gray-50 transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Logo Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--sidebar-accent))' }}>
            <Heart className="w-6 h-6" style={{ color: 'hsl(var(--sidebar-text))' }} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'hsl(var(--sidebar-text))' }}>
                MEDICORE
              </h1>
              <p className="text-xs" style={{ color: 'hsl(var(--sidebar-text-muted))' }}>HMS</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
            const isActive = activeModule === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-left rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'hsl(var(--sidebar-accent))' : 'transparent',
                    color: isActive ? 'hsl(var(--sidebar-text))' : 'hsl(var(--sidebar-text-muted))',
                  }}
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
