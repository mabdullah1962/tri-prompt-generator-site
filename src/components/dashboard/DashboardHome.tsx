
interface DashboardHomeProps {
  userRole: 'admin' | 'patient' | 'staff';
}

const DashboardHome = ({ userRole }: DashboardHomeProps) => {
  const getStatsCards = () => {
    const commonStats = [
      { title: 'Today\'s Appointments', value: '24', icon: '📅', color: 'from-blue-500 to-blue-600' },
      { title: 'Available Doctors', value: '12', icon: '👨‍⚕️', color: 'from-green-500 to-green-600' },
    ];

    if (userRole === 'admin') {
      return [
        { title: 'Total Patients', value: '1,234', icon: '👥', color: 'from-purple-500 to-purple-600' },
        ...commonStats,
        { title: 'Available Rooms', value: '8', icon: '🏥', color: 'from-yellow-500 to-yellow-600' },
        { title: 'Pending Bills', value: '45', icon: '💰', color: 'from-red-500 to-red-600' },
        { title: 'Active Staff', value: '67', icon: '👷', color: 'from-indigo-500 to-indigo-600' },
      ];
    } else if (userRole === 'patient') {
      return [
        { title: 'My Appointments', value: '3', icon: '📅', color: 'from-blue-500 to-blue-600' },
        { title: 'Pending Bills', value: '2', icon: '💰', color: 'from-red-500 to-red-600' },
        { title: 'Medical Reports', value: '5', icon: '📋', color: 'from-green-500 to-green-600' },
        { title: 'Next Appointment', value: 'Tomorrow', icon: '⏰', color: 'from-purple-500 to-purple-600' },
      ];
    } else {
      return [
        { title: 'My Patients Today', value: '8', icon: '👥', color: 'from-purple-500 to-purple-600' },
        ...commonStats,
        { title: 'Treatments Done', value: '15', icon: '💊', color: 'from-yellow-500 to-yellow-600' },
      ];
    }
  };

  const statsCards = getStatsCards();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to MEDICORE HMS
        </h1>
        <p className="text-blue-100">
          {userRole === 'admin' && 'Manage your hospital operations efficiently'}
          {userRole === 'patient' && 'Track your health journey with us'}
          {userRole === 'staff' && 'Provide excellent healthcare services'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-4 mb-4 inline-block`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {userRole === 'admin' && (
            <>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 mr-3">👥</span>
                <div>
                  <p className="font-medium">New patient registered</p>
                  <p className="text-sm text-gray-500">Ali Raza - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-500 mr-3">💰</span>
                <div>
                  <p className="font-medium">Payment received</p>
                  <p className="text-sm text-gray-500">Bill #501 - Rs. 1,500 - 1 hour ago</p>
                </div>
              </div>
            </>
          )}
          {userRole === 'patient' && (
            <>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 mr-3">📅</span>
                <div>
                  <p className="font-medium">Appointment scheduled</p>
                  <p className="text-sm text-gray-500">Dr. Ayesha Khan - Tomorrow 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-500 mr-3">💊</span>
                <div>
                  <p className="font-medium">Treatment completed</p>
                  <p className="text-sm text-gray-500">Hypertension treatment - Yesterday</p>
                </div>
              </div>
            </>
          )}
          {userRole === 'staff' && (
            <>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-500 mr-3">✅</span>
                <div>
                  <p className="font-medium">Treatment completed</p>
                  <p className="text-sm text-gray-500">Patient: Fatima Noor - 30 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 mr-3">📅</span>
                <div>
                  <p className="font-medium">Next appointment</p>
                  <p className="text-sm text-gray-500">Zainab Ali - 3:00 PM today</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
