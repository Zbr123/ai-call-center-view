
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Clock, 
  User, 
  Search, 
  ArrowRight, 
  PhoneCall,
  Users,
  Headphones,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Caller {
  id: string;
  phoneNumber: string;
  name?: string;
  callTime: string;
  purpose: string;
  status: 'live' | 'ended' | 'transferred';
  transferredTo?: string;
  duration?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCaller, setCurrentCaller] = useState<Caller | null>({
    id: '1',
    phoneNumber: '+1 (555) 123-4567',
    name: 'John Smith',
    callTime: '14:23:15',
    purpose: 'Product inquiry - looking for premium features',
    status: 'live',
    duration: '2:34'
  });

  const [pastCallers] = useState<Caller[]>([
    {
      id: '2',
      phoneNumber: '+1 (555) 987-6543',
      name: 'Sarah Johnson',
      callTime: '13:45:22',
      purpose: 'Technical support needed',
      status: 'transferred',
      transferredTo: 'Support Team',
      duration: '4:12'
    },
    {
      id: '3',
      phoneNumber: '+1 (555) 456-7890',
      name: 'Mike Davis',
      callTime: '12:15:08',
      purpose: 'Sales inquiry - enterprise plan',
      status: 'transferred',
      transferredTo: 'Sales Team',
      duration: '6:45'
    },
    {
      id: '4',
      phoneNumber: '+1 (555) 321-0987',
      callTime: '11:30:45',
      purpose: 'Billing question',
      status: 'ended',
      duration: '1:23'
    }
  ]);

  const handleTransfer = (type: 'sales' | 'support') => {
    if (currentCaller) {
      setCurrentCaller({
        ...currentCaller,
        status: 'transferred',
        transferredTo: type === 'sales' ? 'Sales Team' : 'Support Team'
      });
      
      // Simulate call ending after transfer
      setTimeout(() => {
        setCurrentCaller(null);
      }, 2000);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const filteredCallers = pastCallers.filter(caller => 
    caller.phoneNumber.includes(searchTerm) || 
    caller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caller.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">AI Call Dashboard</h1>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Current Caller Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentCaller?.status === 'live' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span>Current Caller</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCaller ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-white">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span className="font-mono">{currentCaller.phoneNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-white">
                        <User className="w-4 h-4 text-green-400" />
                        <span>{currentCaller.name || 'Unknown Caller'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-white">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>Duration: {currentCaller.duration}</span>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-1">Call Purpose:</p>
                        <p className="text-white">{currentCaller.purpose}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={currentCaller.status === 'live' ? 'default' : 'secondary'}
                          className={currentCaller.status === 'live' ? 'bg-green-600' : 'bg-blue-600'}
                        >
                          {currentCaller.status === 'live' ? 'Live Call' : 'Transferred'}
                        </Badge>
                        {currentCaller.transferredTo && (
                          <Badge variant="outline" className="text-white border-white/30">
                            → {currentCaller.transferredTo}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Transfer Buttons */}
                    {currentCaller.status === 'live' && (
                      <div className="pt-4 border-t border-white/20 space-y-2">
                        <Button 
                          onClick={() => handleTransfer('sales')}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Transfer to Sales
                        </Button>
                        <Button 
                          onClick={() => handleTransfer('support')}
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        >
                          <Headphones className="w-4 h-4 mr-2" />
                          Transfer to Support
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <PhoneCall className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No active calls</p>
                    <p className="text-sm text-gray-500">Waiting for incoming calls...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Past Callers Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Call History</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by number, name, or purpose..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredCallers.map((caller) => (
                    <div 
                      key={caller.id} 
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            caller.status === 'transferred' ? 'bg-green-500' : 'bg-gray-500'
                          }`} />
                          <div>
                            <p className="text-white font-medium">{caller.phoneNumber}</p>
                            <p className="text-gray-300 text-sm">{caller.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">{caller.callTime}</p>
                          <p className="text-gray-400 text-xs">{caller.duration}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-gray-300 text-sm">{caller.purpose}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              caller.status === 'transferred' 
                                ? 'border-green-400 text-green-400' 
                                : 'border-gray-400 text-gray-400'
                            }`}
                          >
                            {caller.status === 'transferred' 
                              ? `Transferred to ${caller.transferredTo}` 
                              : 'Call Ended'
                            }
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredCallers.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">No calls match your search</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
