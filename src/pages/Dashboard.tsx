
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CallDetailsModal from '@/components/CallDetailsModal';
import { 
  Phone, 
  Clock, 
  User, 
  Search, 
  ArrowRight, 
  PhoneCall,
  Users,
  Headphones,
  LogOut,
  MessageSquare,
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CallData {
  id: string;
  phoneNumber: string;
  callerName?: string;
  startTime: string;
  endTime: string;
  duration: string;
  callPurpose: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  outcome: string;
  transcript: string;
  status: 'completed' | 'in-progress' | 'missed';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with actual API calls to your Telnyx backend
  const [callsData] = useState<CallData[]>([
    {
      id: '1',
      phoneNumber: '+1 (555) 123-4567',
      callerName: 'John Smith',
      startTime: '14:23:15',
      endTime: '14:28:45',
      duration: '5:30',
      callPurpose: 'Inquiry about premium massage therapy services and pricing',
      keyPoints: [
        'Interested in 90-minute deep tissue massage',
        'Has chronic lower back pain from desk job',
        'Prefers evening appointments',
        'Asked about package deals and membership options'
      ],
      actionItems: [
        'Send pricing information for premium packages',
        'Schedule follow-up call for booking',
        'Provide therapist availability for evenings'
      ],
      sentiment: 'positive',
      outcome: 'High interest - ready to book, requested callback',
      transcript: `AI: Hello! Thank you for calling our wellness center. How can I help you today?

Caller: Hi, I'm looking for information about massage therapy services. I've been dealing with some back pain and thought a professional massage might help.

AI: I'd be happy to help you with that. Can you tell me more about the type of pain you're experiencing and what kind of massage you're interested in?

Caller: It's mostly lower back pain from sitting at a desk all day. I've heard deep tissue massage can be really effective for this kind of thing.

AI: Absolutely, deep tissue massage is excellent for addressing chronic tension from desk work. We offer 60 and 90-minute deep tissue sessions. Many of our clients with similar issues find the 90-minute session allows for more comprehensive work. Would you like to hear about our pricing and availability?

Caller: Yes, definitely. And I'm curious if you have any package deals or membership options?

AI: Great question! We do offer several package options that provide significant savings. Let me gather your contact information so I can send you detailed pricing and have one of our booking specialists call you back to discuss the best options for your needs and schedule your first appointment.

Caller: That sounds perfect. I prefer evening appointments if possible.

AI: Noted. We have good availability in the evenings. Let me get your details...`,
      status: 'completed'
    },
    {
      id: '2',
      phoneNumber: '+1 (555) 987-6543',
      callerName: 'Sarah Johnson',
      startTime: '13:45:22',
      endTime: '13:52:10',
      duration: '6:48',
      callPurpose: 'Follow-up on previous treatment and booking next appointment',
      keyPoints: [
        'Previous 60-min session was very helpful',
        'Wants to book another appointment with same therapist',
        'Mentioned improvement in shoulder mobility',
        'Interested in adding hot stone treatment'
      ],
      actionItems: [
        'Book follow-up with Maria Garcia',
        'Add hot stone add-on to next session',
        'Send reminder 24 hours before appointment'
      ],
      sentiment: 'positive',
      outcome: 'Appointment booked successfully - loyal customer',
      transcript: `AI: Hello! Thank you for calling back. I see from your number that you had a session with Maria Garcia last week. How are you feeling?

Caller: Oh, it was amazing! My shoulder feels so much better. Maria really knew what she was doing.

AI: That's wonderful to hear! Maria is one of our most experienced therapists. Would you like to book another session with her?

Caller: Yes, absolutely. And I was wondering - do you offer hot stone treatments? A friend recommended trying it.

AI: We do! Hot stones are a great addition to massage therapy. They help with deeper muscle relaxation and can be particularly effective for the type of tension you've been experiencing. I can add that to your next session with Maria.

Caller: Perfect! When is she available?

AI: Let me check her schedule...`,
      status: 'completed'
    },
    {
      id: '3',
      phoneNumber: '+1 (555) 456-7890',
      callerName: 'Mike Davis',
      startTime: '12:15:08',
      endTime: '12:18:30',
      duration: '3:22',
      callPurpose: 'Quick question about cancellation policy',
      keyPoints: [
        'Has appointment scheduled for tomorrow',
        'Unexpected work conflict arose',
        'Wants to reschedule rather than cancel',
        'Very apologetic about short notice'
      ],
      actionItems: [
        'Reschedule appointment to next available slot',
        'Waive cancellation fee due to circumstances',
        'Send new appointment confirmation'
      ],
      sentiment: 'neutral',
      outcome: 'Successfully rescheduled - customer retained',
      transcript: `AI: Hello! How can I assist you today?

Caller: Hi, I have an appointment scheduled for tomorrow at 2 PM, but I just found out I have an emergency work meeting. I know it's short notice, but is there any way I can reschedule instead of canceling?

AI: I understand these things happen. Let me look at your appointment and see what options we have available. Can you provide your name?

Caller: It's Mike Davis. I'm really sorry about the short notice.

AI: No problem at all, Mike. I can see your appointment with our therapeutic massage. Let me check for alternative times this week...`,
      status: 'completed'
    }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const openCallDetails = (call: CallData) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  const filteredCalls = callsData.filter(call => 
    call.phoneNumber.includes(searchTerm) || 
    call.callerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.callPurpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'border-green-400 text-green-400';
      case 'negative': return 'border-red-400 text-red-400';
      default: return 'border-yellow-400 text-yellow-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-blue-600';
      case 'missed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

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
              <h1 className="text-xl font-bold text-white">AI Call Analytics Dashboard</h1>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Calls Today</p>
                  <p className="text-2xl font-bold text-white">{callsData.length}</p>
                </div>
                <PhoneCall className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg Duration</p>
                  <p className="text-2xl font-bold text-white">5:20</p>
                </div>
                <Clock className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Positive Sentiment</p>
                  <p className="text-2xl font-bold text-white">85%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Bookings Made</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call History */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">AI Call History & Insights</CardTitle>
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
              {filteredCalls.map((call) => (
                <div 
                  key={call.id} 
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        call.sentiment === 'positive' ? 'bg-green-500' :
                        call.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="text-white font-medium">{call.phoneNumber}</p>
                        <p className="text-gray-300 text-sm">{call.callerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{call.startTime}</p>
                      <p className="text-gray-400 text-xs">{call.duration}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-300 text-sm mb-2">{call.callPurpose}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSentimentColor(call.sentiment)}`}
                      >
                        {call.sentiment.charAt(0).toUpperCase() + call.sentiment.slice(1)} Sentiment
                      </Badge>
                      <Badge 
                        className={`text-xs ${getStatusColor(call.status)}`}
                      >
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{call.keyPoints.length} key points</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{call.actionItems.length} actions</span>
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openCallDetails(call)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCalls.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">No calls match your search</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CallDetailsModal 
        call={selectedCall}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
