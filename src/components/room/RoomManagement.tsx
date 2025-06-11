
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Room {
  id: number;
  roomNumber: string;
  type: string;
  capacity: number;
  occupied: boolean;
  patientName?: string;
  allocationDate?: string;
}

const RoomManagement = () => {
  const [rooms] = useState<Room[]>([
    {
      id: 601,
      roomNumber: 'R101',
      type: 'Private',
      capacity: 1,
      occupied: true,
      patientName: 'Ali Raza',
      allocationDate: '2025-05-15'
    },
    {
      id: 602,
      roomNumber: 'R102',
      type: 'General',
      capacity: 2,
      occupied: false
    },
    {
      id: 603,
      roomNumber: 'R103',
      type: 'ICU',
      capacity: 1,
      occupied: true,
      patientName: 'Zainab Ali',
      allocationDate: '2025-05-20'
    },
    {
      id: 604,
      roomNumber: 'R104',
      type: 'General',
      capacity: 3,
      occupied: false
    },
    {
      id: 605,
      roomNumber: 'R105',
      type: 'Private',
      capacity: 1,
      occupied: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllocationForm, setShowAllocationForm] = useState(false);

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'Private': return 'bg-purple-100 text-purple-800';
      case 'General': return 'bg-blue-100 text-blue-800';
      case 'ICU': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const availableRooms = rooms.filter(room => !room.occupied);
  const occupiedRooms = rooms.filter(room => room.occupied);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowAllocationForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600"
          >
            Allocate Room
          </Button>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-600"
          >
            + Add Room
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Available Rooms</h3>
          <p className="text-3xl font-bold mt-2">{availableRooms.length}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Occupied Rooms</h3>
          <p className="text-3xl font-bold mt-2">{occupiedRooms.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Total Rooms</h3>
          <p className="text-3xl font-bold mt-2">{rooms.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Room Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Room Number</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Capacity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Allocation Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{room.roomNumber}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(room.type)}`}>
                      {room.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{room.capacity}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.occupied 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {room.occupied ? 'Occupied' : 'Available'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{room.patientName || '-'}</td>
                  <td className="py-3 px-4">{room.allocationDate || '-'}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {room.occupied ? (
                        <Button size="sm" className="bg-yellow-600">Discharge</Button>
                      ) : (
                        <Button size="sm" className="bg-blue-600">Allocate</Button>
                      )}
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Room</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" placeholder="Enter room number" />
              </div>
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <select id="roomType" className="w-full p-2 border rounded">
                  <option value="">Select room type</option>
                  <option value="General">General</option>
                  <option value="Private">Private</option>
                  <option value="ICU">ICU</option>
                </select>
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="Enter capacity" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  Add Room
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAllocationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Allocate Room</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Input id="patient" placeholder="Select patient" />
              </div>
              <div>
                <Label htmlFor="room">Available Room</Label>
                <select id="room" className="w-full p-2 border rounded">
                  <option value="">Select room</option>
                  {availableRooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.roomNumber} - {room.type} (Capacity: {room.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="allocationDate">Allocation Date</Label>
                <Input id="allocationDate" type="date" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional notes" />
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  Allocate Room
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAllocationForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
