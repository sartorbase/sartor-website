import React, { useEffect, useState } from 'react';
import { Activity, BarChart3, CheckCircle, ExternalLink, Eye, MessageSquare, RefreshCw, Ruler, Trash2, TrendingUp, X } from 'lucide-react';
import { analytics } from '../../services/analytics';
import { AnalyticsEvent, AnalyticsSummary } from '../../types';
import { Button } from '../atoms/Button';
import { MetricCard } from '../molecules/MetricCard';

export interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({ isOpen, onClose }) => {
  const [summary, setSummary] = useState<AnalyticsSummary>(analytics.getSummary());
  const [events, setEvents] = useState<AnalyticsEvent[]>(analytics.getEvents());

  useEffect(() => {
    const unsubscribe = analytics.subscribe(() => {
      setSummary(analytics.getSummary());
      setEvents(analytics.getEvents());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-stone-100">
                  SARTOR Engagement & Conversion Analytics
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  Live Tracking
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Monitoring client traffic, WhatsApp booking leads, fabric views, and sizing guide conversions on <strong>sartor.pk</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Page Views"
              value={summary.totalPageViews}
              subtext="Unique sessions"
              icon={<Eye className="w-4 h-4" />}
            />

            <MetricCard
              label="WhatsApp Leads"
              value={summary.whatsappConversions}
              change="+100% Direct"
              subtext="CTAs clicked"
              icon={<MessageSquare className="w-4 h-4" />}
            />

            <MetricCard
              label="Custom Suit Starts"
              value={summary.bookingAttempts}
              subtext="Builder selections"
              icon={<TrendingUp className="w-4 h-4" />}
            />

            <MetricCard
              label="Conversion Rate"
              value={`${summary.conversionRate}%`}
              change="Goal: >15%"
              subtext="Visitor to WhatsApp"
              icon={<Activity className="w-4 h-4" />}
            />

            <MetricCard
              label="Fabric Swatch Views"
              value={summary.fabricViews}
              subtext="Collections viewed"
              icon={<BarChart3 className="w-4 h-4" />}
            />

            <MetricCard
              label="Size Guide Uses"
              value={summary.sizeGuideEngagements}
              subtext="Charts & measurements"
              icon={<Ruler className="w-4 h-4" />}
            />

            <MetricCard
              label="Contact Inquiries"
              value={summary.contactInquiries}
              subtext="Form submissions"
              icon={<CheckCircle className="w-4 h-4" />}
            />

            <div className="bg-gradient-to-br from-amber-950/40 to-stone-900 border border-amber-800/40 rounded-xl p-4.5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Conversion Target
              </span>
              <div className="text-xs text-stone-300 leading-relaxed mt-2">
                WhatsApp CTA routes 100% of high-intent buyers directly to Master Tailor in Lahore.
              </div>
              <div className="mt-2 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active on 0335-2209991
              </div>
            </div>
          </div>

          {/* Recent Event Stream */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-stone-300">
                Recent Interaction Stream (Last {events.length} Actions)
              </h4>
              <button
                onClick={() => analytics.clearData()}
                className="text-[11px] text-stone-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset Metrics</span>
              </button>
            </div>

            <div className="bg-stone-950 rounded-xl border border-stone-800 divide-y divide-stone-850 max-h-56 overflow-y-auto font-mono text-xs">
              {events.length === 0 ? (
                <div className="p-4 text-center text-stone-500">No events logged yet.</div>
              ) : (
                events.slice(0, 20).map((evt) => (
                  <div key={evt.id} className="p-2.5 flex items-center justify-between text-stone-300 hover:bg-stone-900/60">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 font-semibold">[{evt.eventType}]</span>
                      {evt.metadata && (
                        <span className="text-stone-400 text-[11px]">
                          {JSON.stringify(evt.metadata)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            SARTOR Analytics v1.0 · Integrated for sartor.pk · Deployment: Vercel / Edge Ready
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Analytics
          </Button>
        </div>

      </div>
    </div>
  );
};
