
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Bill {
  id: number;
  patientName: string;
  treatmentId: number;
  amount: number;
  date: string;
  paymentMethod: string;
  status: string;
}

const BillingManagement = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [bills] = useState<Bill[]>([
    {
      id: 501,
      patientName: 'Ali Raza',
      treatmentId: 401,
      amount: 1500.00,
      date: '2025-05-13',
      paymentMethod: 'Cash',
      status: 'Paid'
    },
    {
      id: 502,
      patientName: 'Fatima Noor',
      treatmentId: 402,
      amount: 2000.00,
      date: '2025-05-13',
      paymentMethod: 'Online',
      status: 'Pending'
    },
    {
      id: 503,
      patientName: 'Zainab Ali',
      treatmentId: 403,
      amount: 1800.00,
      date: '2025-05-23',
      paymentMethod: 'Card',
      status: 'Paid'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTitle = () => {
    if (userRole === 'patient') return 'My Bills';
    return 'Billing Management';
  };

  // Calculate totals for admin view
  const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidBills = bills.filter(bill => bill.status === 'Paid');
  const pendingBills = bills.filter(bill => bill.status === 'Pending');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
        {userRole === 'admin' && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            + Generate Bill
          </Button>
        )}
      </div>

      {userRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">Rs. {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Paid Bills</h3>
            <p className="text-3xl font-bold mt-2">{paidBills.length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Pending Bills</h3>
            <p className="text-3xl font-bold mt-2">{pendingBills.length}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bill ID</th>
                {userRole !== 'patient' && (
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                )}
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Treatment ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{bill.id}</td>
                  {userRole !== 'patient' && (
                    <td className="py-3 px-4">{bill.patientName}</td>
                  )}
                  <td className="py-3 px-4">{bill.treatmentId}</td>
                  <td className="py-3 px-4 font-bold text-green-600">Rs. {bill.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">{bill.date}</td>
                  <td className="py-3 px-4">{bill.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {bill.status === 'Pending' && userRole === 'patient' && (
                        <Button size="sm" className="bg-green-600">Pay Now</Button>
                      )}
                      {userRole === 'admin' && (
                        <Button size="sm" variant="outline">Edit</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && userRole === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Generate Bill</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Input id="patient" placeholder="Select patient" />
              </div>
              <div>
                <Label htmlFor="treatment">Treatment ID</Label>
                <Input id="treatment" placeholder="Enter treatment ID" />
              </div>
              <div>
                <Label htmlFor="amount">Amount (Rs.)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select id="paymentMethod" className="w-full p-2 border rounded">
                  <option value="">Select payment method</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  Generate Bill
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
    </div>
  );
};

export default BillingManagement;
