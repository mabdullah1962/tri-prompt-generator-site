
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MedicalReport {
  id: number;
  patientName: string;
  treatmentId: number;
  diagnosis: string;
  date: string;
  medications: string;
  doctorName: string;
}

const MedicalReports = ({ userRole = 'admin' }: { userRole?: string }) => {
  const [reports] = useState<MedicalReport[]>([
    {
      id: 801,
      patientName: 'Ali Raza',
      treatmentId: 401,
      diagnosis: 'Hypertension',
      date: '2025-05-10',
      medications: 'Amlodipine',
      doctorName: 'Dr. Ayesha Khan'
    },
    {
      id: 802,
      patientName: 'Fatima Noor',
      treatmentId: 402,
      diagnosis: 'Migraine',
      date: '2025-05-12',
      medications: 'Sumatriptan',
      doctorName: 'Dr. Imran Malik'
    },
    {
      id: 803,
      patientName: 'Zainab Ali',
      treatmentId: 403,
      diagnosis: 'Chickenpox',
      date: '2025-05-20',
      medications: 'Acyclovir',
      doctorName: 'Dr. Kamran Javed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateRange.from || report.date >= dateRange.from) &&
                       (!dateRange.to || report.date <= dateRange.to);
    
    return matchesSearch && matchesDate;
  });

  const getTitle = () => {
    if (userRole === 'patient') return 'My Medical Reports';
    return 'Medical Report History';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
          Export Reports
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="search">Search Reports</Label>
            <Input
              id="search"
              placeholder="Search by patient or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dateFrom">From Date</Label>
            <Input
              id="dateFrom"
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dateTo">To Date</Label>
            <Input
              id="dateTo"
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-900">Report #{report.id}</h3>
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
              
              <div className="space-y-3">
                {userRole !== 'patient' && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Patient:</span>
                    <p className="text-gray-900">{report.patientName}</p>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Diagnosis:</span>
                  <p className="text-gray-900">{report.diagnosis}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Medications:</span>
                  <p className="text-gray-900">{report.medications}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Doctor:</span>
                  <p className="text-gray-900">{report.doctorName}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Treatment ID:</span>
                  <p className="text-gray-900">{report.treatmentId}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 flex-1">
                  View Full Report
                </Button>
                <Button size="sm" variant="outline">
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalReports;
