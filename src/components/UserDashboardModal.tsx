import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Trash2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  FolderHeart,
  CalendarCheck2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getUserAppointments,
  getUserSavedConcepts,
  deleteSavedConcept,
  AppointmentRecord,
  SavedConceptRecord,
} from '../services/firestoreService';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingWithConcept?: (conceptText: string) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenBookingWithConcept,
}) => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'appointments' | 'concepts'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [savedConcepts, setSavedConcepts] = useState<SavedConceptRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadData();
    }
  }, [isOpen, user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [userApts, userConcs] = await Promise.all([
        getUserAppointments(user.uid),
        getUserSavedConcepts(user.uid),
      ]);
      setAppointments(userApts);
      setSavedConcepts(userConcs);
    } catch (err) {
      console.error('Failed to load user dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConcept = async (conceptId: string) => {
    if (!user) return;
    try {
      await deleteSavedConcept(user.uid, conceptId);
      setSavedConcepts((prev) => prev.filter((c) => c.id !== conceptId));
    } catch (err) {
      console.error('Error deleting concept:', err);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl h-[88vh] bg-[#11091a] rounded-2xl border border-[#ea7af4]/30 shadow-[0_0_50px_rgba(234,122,244,0.3)] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0a0510] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="w-10 h-10 rounded-full border border-[#ea7af4]/40 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#ea7af4]/20 border border-[#ea7af4]/40 flex items-center justify-center text-[#ea7af4]">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  {user.displayName || 'Client Portal'}
                </h3>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-zinc-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                signOut();
                onClose();
              }}
              className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1 px-3 py-1.5 rounded border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-white/10 bg-[#0e0716] flex items-center gap-4">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold transition-colors relative ${
              activeTab === 'appointments'
                ? 'text-[#ea7af4] border-b-2 border-[#ea7af4]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>My Bookings</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full text-zinc-300">
              {appointments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold transition-colors relative ${
              activeTab === 'concepts'
                ? 'text-[#ea7af4] border-b-2 border-[#ea7af4]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FolderHeart className="w-4 h-4" />
            <span>Saved Concepts</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full text-zinc-300">
              {savedConcepts.length}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0510]">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#ea7af4]">
              <Sparkles className="w-6 h-6 animate-spin mr-2" />
              <span className="text-sm">Synchronizing your studio records...</span>
            </div>
          ) : activeTab === 'appointments' ? (
            <div>
              {appointments.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-white mb-1">No Active Bookings Yet</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
                    Your scheduled tattoo consultations and home visits will appear here once booked.
                  </p>
                  <a
                    href="#booking"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-gradient-to-r from-[#ea7af4] to-[#c026d3] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Book Consultation Now
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#ea7af4]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{apt.serviceName}</span>
                            {apt.isHomeService && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                                Home Visit
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#ea7af4] font-medium mt-0.5">
                            Artist: {apt.artist}
                          </p>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-[#ea7af4]/20 text-[#ea7af4] border-[#ea7af4]/30'
                          }`}
                        >
                          {apt.status === 'confirmed' ? 'Confirmed' : 'Pending Review'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-zinc-400 mb-3 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{apt.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{apt.preferredTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{apt.placement} ({apt.size})</span>
                        </div>
                      </div>

                      {apt.notes && (
                        <p className="text-xs text-zinc-300 bg-black/40 p-2.5 rounded border border-white/5 italic mb-3">
                          "{apt.notes}"
                        </p>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                        <a
                          href={getWhatsAppLink(
                            'appointment',
                            `Hi Shivansh Tattoo Studio, checking status for my appointment ID: ${apt.id} (${apt.serviceName} on ${apt.preferredDate})`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Studio WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {savedConcepts.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Sparkles className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-white mb-1">No Saved Concepts Yet</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
                    Consult our Shivansh AI Assistant to generate custom concepts, stencils, and sacred geometry designs, then save them here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedConcepts.map((conc) => (
                    <div
                      key={conc.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#ea7af4]/30 flex flex-col justify-between"
                    >
                      <div>
                        {conc.imageUrl && (
                          <div className="mb-3 rounded-lg overflow-hidden border border-white/10 bg-black/50 aspect-square max-h-48 flex items-center justify-center">
                            <img
                              src={conc.imageUrl}
                              alt={conc.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm font-bold text-white">{conc.title}</h4>
                          <button
                            onClick={() => handleDeleteConcept(conc.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                            title="Delete Concept"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-zinc-300 whitespace-pre-wrap font-mono bg-black/40 p-2.5 rounded border border-white/5 max-h-36 overflow-y-auto mb-3 text-[11px] leading-relaxed">
                          {conc.conceptText}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                        {onOpenBookingWithConcept && (
                          <button
                            onClick={() => {
                              onOpenBookingWithConcept(conc.conceptText);
                              onClose();
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded bg-[#ea7af4] hover:bg-[#d946ef] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                          >
                            <Calendar className="w-3 h-3" />
                            Book This
                          </button>
                        )}

                        <a
                          href={getWhatsAppLink(
                            'quote',
                            `Hi Shivansh Tattoo Studio, I would like to consult about this saved tattoo concept:\n\n${conc.conceptText}`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
