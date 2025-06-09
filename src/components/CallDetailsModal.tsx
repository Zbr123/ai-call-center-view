
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, User, MessageSquare, Target, CheckCircle } from 'lucide-react';

interface CallDetails {
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
}

interface CallDetailsModalProps {
  call: CallDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const CallDetailsModal = ({ call, isOpen, onClose }: CallDetailsModalProps) => {
  if (!call) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-600';
      case 'negative': return 'bg-red-600';
      default: return 'bg-yellow-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Call Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Call Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Caller</span>
              </div>
              <p className="text-white font-medium">{call.callerName || 'Unknown'}</p>
              <p className="text-gray-400 text-sm">{call.phoneNumber}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Duration</span>
              </div>
              <p className="text-white font-medium">{call.duration}</p>
              <p className="text-gray-400 text-sm">{call.startTime} - {call.endTime}</p>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Call Purpose & Outcome */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Call Purpose</h3>
              <p className="text-gray-300">{call.callPurpose}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Outcome</h3>
              <div className="flex items-center space-x-2">
                <Badge className={getSentimentColor(call.sentiment)}>
                  {call.sentiment.charAt(0).toUpperCase() + call.sentiment.slice(1)}
                </Badge>
                <span className="text-gray-300">{call.outcome}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Key Points */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Key Discussion Points</h3>
            </div>
            <ul className="space-y-2">
              {call.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          {call.actionItems.length > 0 && (
            <>
              <Separator className="bg-slate-700" />
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Action Items</h3>
                </div>
                <ul className="space-y-2">
                  {call.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <Separator className="bg-slate-700" />

          {/* Transcript */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Call Transcript</h3>
            <div className="bg-slate-800 rounded-lg p-4 max-h-60 overflow-y-auto">
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{call.transcript}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailsModal;
