import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Upload,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  ChevronDown,
  Info,
  RefreshCw,
} from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isConcept?: boolean;
}

interface AiTattooAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferToBooking: (conceptText: string) => void;
  initialPrompt?: string;
}

export const AiTattooAssistantModal: React.FC<AiTattooAssistantModalProps> = ({
  isOpen,
  onClose,
  onTransferToBooking,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        'Greetings. I am the Shivansh AI Tattoo Assistant. “Precision in Every Line.”\n\nI am here to help you articulate, refine, and structure your tattoo idea before your consultation with our master artists.\n\nTo begin, tell me: What tattoo are you envisioning, what is the meaning behind it, or would you like me to guide you through our 10-point consultation?',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showConsultForm, setShowConsultForm] = useState<boolean>(false);

  // Guided consultation form inputs for structured precision
  const [consultForm, setConsultForm] = useState({
    style: 'Sacred Geometric / Fine Line',
    meaning: '',
    placement: 'Forearm',
    size: '4 x 3 inches',
    color: 'Black & Grey with high contrast',
    symbols: '',
    isCoverUp: false,
    serviceType: 'Studio Appointment',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Help me design a tattoo',
    'Suggest a tattoo idea',
    'I want a name tattoo',
    'I want a minimalist tattoo',
    'I need a cover-up',
    'I want a spiritual tattoo',
    'I want a home tattoo',
    'Book an appointment',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend.trim() || (selectedImage ? 'Attached reference image for analysis.' : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userImage: selectedImage,
          consultationForm: showConsultForm ? consultForm : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const isConcept = data.reply.includes('TATTOO CONCEPT');
        setMessages((prev) => [
          ...prev,
          {
            id: `assist-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isConcept,
          },
        ]);
      } else {
        throw new Error(data.error || 'Failed to process consultation');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assist-${Date.now()}`,
          role: 'assistant',
          content:
            'Welcome to Shivansh Tattoo Studio. We are ready to review your concept. Final pricing depends on size, placement, complexity, and consultation. Please contact our studio team directly for a quote and appointment booking.',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setLoading(false);
      // keep image attached for reference or clear upon request
    }
  };

  const handleCopyLatest = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] bg-[#11091a] rounded-2xl border border-[#ea7af4]/30 shadow-[0_0_50px_rgba(234,122,244,0.35)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0a0510] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl p-[2px] bg-gradient-to-b from-[#ea7af4] to-[#fae8ff] shadow-[0_0_15px_rgba(234,122,244,0.4)] overflow-hidden">
              <img
                src={STUDIO_CONFIG.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain rounded-[9px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-serif-brand">
                  SHIVANSH AI ASSISTANT
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#ea7af4] bg-[#ea7af4]/15 px-2 py-0.5 rounded border border-[#ea7af4]/30">
                  Virtual Consult
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                “Let’s turn your idea into a tattoo concept.”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConsultForm(!showConsultForm)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors hidden sm:flex items-center gap-1.5 ${
                showConsultForm
                  ? 'bg-[#ea7af4] border-[#ea7af4] text-white'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showConsultForm ? 'Chat Stream' : '10-Point Form'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guided 10-Point Questionnaire Drawer (Optional Quick Fill) */}
        {showConsultForm && (
          <div className="p-4 bg-[#09090e] border-b border-white/10 text-xs max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white uppercase tracking-wider">
                10-Point Consultation Blueprint
              </span>
              <span className="text-zinc-400 text-[11px]">Assists our AI to draft your exact concept</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="text-zinc-400 block mb-1">Style:</label>
                <select
                  value={consultForm.style}
                  onChange={(e) => setConsultForm({ ...consultForm, style: e.target.value })}
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                >
                  <option>Minimalist Fine Line</option>
                  <option>Sacred Geometric</option>
                  <option>Black & Grey Realism</option>
                  <option>Portrait Realism</option>
                  <option>Custom Lettering</option>
                  <option>Spiritual / Shiva / Yantra</option>
                  <option>Cover-Up Reconstruction</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Placement:</label>
                <input
                  type="text"
                  placeholder="e.g. Forearm, Shoulder, Ribs"
                  value={consultForm.placement}
                  onChange={(e) => setConsultForm({ ...consultForm, placement: e.target.value })}
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Approx Size:</label>
                <input
                  type="text"
                  placeholder="e.g. 3x3 inches, Half sleeve"
                  value={consultForm.size}
                  onChange={(e) => setConsultForm({ ...consultForm, size: e.target.value })}
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Service Type:</label>
                <select
                  value={consultForm.serviceType}
                  onChange={(e) => setConsultForm({ ...consultForm, serviceType: e.target.value })}
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                >
                  <option>Studio Appointment</option>
                  <option>Home Tattoo Service</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  handleSend('GENERATE TATTOO CONCEPT with my 10-point consultation specifications.');
                  setShowConsultForm(false);
                }}
                className="px-4 py-1.5 bg-[#ea7af4] text-white font-bold uppercase tracking-wider rounded text-[11px] hover:bg-[#d946ef]"
              >
                GENERATE TATTOO CONCEPT
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0a0512]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#ea7af4] to-[#c084fc] text-white shadow-md'
                    : 'bg-[#180e24] border border-[#ea7af4]/15 text-zinc-200 shadow-sm'
                }`}
              >
                {/* Concept Label if concept output */}
                {msg.isConcept && (
                  <div className="mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ea7af4]">
                      AI CONCEPT — FINAL DESIGN TO BE CONFIRMED WITH THE ARTIST
                    </span>
                    <button
                      onClick={() => handleCopyLatest(msg.content)}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                      title="Copy Concept"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Transfer CTA for assistant concepts */}
                {msg.role === 'assistant' && msg.content.includes('TATTOO CONCEPT') && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    <button
                      onClick={() => onTransferToBooking(msg.content)}
                      className="px-3 py-1.5 rounded bg-[#ea7af4] text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-[#d946ef]"
                    >
                      <Calendar className="w-3 h-3" />
                      Book Consultation With This Concept
                    </button>

                    <a
                      href={getWhatsAppLink('quote', `Hi Shivansh Tattoo Studio, here is my AI Tattoo Concept:\n${msg.content}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-emerald-700"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Send to WhatsApp
                    </a>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3 bg-[#180e24] rounded-lg border border-[#ea7af4]/30 w-fit text-xs text-[#ea7af4] animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-[#ea7af4]" />
              <span>Shivansh AI is formulating your tattoo concept...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/5 bg-[#0e0716] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-[#ea7af4]/20 hover:border-[#ea7af4]/40 border border-white/10 px-3 py-1.5 rounded whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Attached image preview */}
        {selectedImage && (
          <div className="px-4 py-2 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-white/20 overflow-hidden">
                <img src={selectedImage} alt="Upload" className="w-full h-full object-cover" />
              </div>
              <span className="truncate max-w-xs">{imageFileName || 'Attached Reference Image'}</span>
            </div>
            <button
              onClick={removeImage}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[#0a0510]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Upload Reference Image Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-zinc-400 hover:text-[#ea7af4] hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
              title="Upload Reference Image"
            >
              <Upload className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your tattoo idea, placement, meaning, or ask a question..."
              className="flex-1 bg-[#160d22] text-white placeholder-zinc-500 text-xs sm:text-sm px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4] transition-all"
            />

            <button
              type="submit"
              disabled={loading || (!input.trim() && !selectedImage)}
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:opacity-90 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(234,122,244,0.45)] flex items-center gap-1.5"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Mandatory Disclaimers */}
          <div className="mt-2.5 flex items-start gap-1.5 text-[10px] text-zinc-500 font-light leading-tight">
            <Info className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Official Notice:</strong> Final pricing depends on size, placement, complexity, and consultation. Please contact Shivansh Tattoo Studio for a quote. For medical or skin concerns, always consult a qualified healthcare professional.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
