import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Upload,
  Calendar,
  MessageSquare,
  Copy,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Globe,
  Palette,
  Layers,
  BookmarkPlus,
  Check,
  Zap,
  Image as ImageIcon,
  Download,
  AlertCircle,
} from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';
import { useAuth } from '../context/AuthContext';
import { saveTattooConcept } from '../services/firestoreService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isConcept?: boolean;
  sources?: string[];
  audioBase64?: string;
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
  const { user, signIn } = useAuth();
  const [activeMode, setActiveMode] = useState<'chat' | 'stencil'>('chat');
  const [modelMode, setModelMode] = useState<'fast' | 'general' | 'deep'>('fast');
  const [useSearch, setUseSearch] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        'Namaste & Welcome to Shivansh Tattoo Studio. “Precision in Every Line.”\n\nI am your official AI Tattoo Consultation Assistant. I can help explore concepts, sacred geometry symbols, anatomical placement, aftercare science, or create custom stencils.\n\nTell me: What design or idea do you have in mind?',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedConceptId, setSavedConceptId] = useState<string | null>(null);
  const [showConsultForm, setShowConsultForm] = useState<boolean>(false);

  // Audio Voice State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Stencil Visualizer State
  const [stencilPrompt, setStencilPrompt] = useState<string>('Sacred Lord Shiva Trishul with delicate floral geometric mandala');
  const [stencilStyle, setStencilStyle] = useState<string>('Tattoo Stencil Line Art');
  const [generatingStencil, setGeneratingStencil] = useState<boolean>(false);
  const [stencilImage, setStencilImage] = useState<string | null>(null);
  const [stencilSaved, setStencilSaved] = useState<boolean>(false);

  // Guided consultation form
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
  const stencilFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  const quickPrompts = [
    'Lord Shiva Trishul & Om wrist tattoo',
    'Hyper-realistic lion shoulder tattoo',
    'Sacred geometric lotus forearm tattoo',
    'Cover-up consultation for old ink',
    'Minimalist Sanskrit mantra tattoo',
    'Home Tattoo Service requirements',
  ];

  // Voice Speech Recognition
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Play Text-to-Speech using Gemini 3.8 Flash Lite TTS
  const handlePlayVoice = async (msgId: string, text: string) => {
    if (playingAudioId === msgId) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      setPlayingAudioId(null);
      return;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    setAudioLoadingId(msgId);

    try {
      const response = await fetch('/api/ai-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: 'Kore' }),
      });

      const data = await response.json();
      if (data.success && data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        currentAudioRef.current = audio;
        setPlayingAudioId(msgId);

        audio.onended = () => {
          setPlayingAudioId(null);
          currentAudioRef.current = null;
        };

        audio.play().catch((playErr) => {
          console.warn('Audio play error:', playErr);
          setPlayingAudioId(null);
        });
      } else {
        throw new Error('TTS audio unavailable');
      }
    } catch (err) {
      console.warn('Could not generate speech:', err);
    } finally {
      setAudioLoadingId(null);
    }
  };

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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userImage: selectedImage,
          consultationForm: showConsultForm ? consultForm : undefined,
          useSearch,
          modelMode,
        }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (data.success && data.reply) {
        const isConcept = data.reply.includes('TATTOO CONCEPT');
        setMessages((prev) => [
          ...prev,
          {
            id: `assist-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isConcept,
            sources: data.sources,
          },
        ]);
      } else {
        throw new Error(data.error || 'Failed to process consultation');
      }
    } catch (err: any) {
      console.warn('AI Assistant Consultation error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assist-${Date.now()}`,
          role: 'assistant',
          content:
            'Welcome to Shivansh Tattoo Studio. “Precision in Every Line.”\n\nOur master artists are ready to review your concept in detail. You can book an appointment directly with our team or message us on WhatsApp with your reference photos.',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToProfile = async (msgId: string, content: string) => {
    if (!user) {
      const confirmed = window.confirm('Please sign in with Google to save tattoo concepts to your profile.');
      if (confirmed) {
        await signIn();
      }
      return;
    }

    try {
      await saveTattooConcept(user.uid, {
        title: 'Bespoke AI Tattoo Concept',
        conceptText: content,
        style: consultForm.style,
        placement: consultForm.placement,
      });
      setSavedConceptId(msgId);
      setTimeout(() => setSavedConceptId(null), 3000);
    } catch (err) {
      console.error('Failed to save concept:', err);
      alert('Could not save concept to profile. Please try again.');
    }
  };

  // Generate Stencil
  const handleGenerateStencil = async () => {
    if (!stencilPrompt.trim()) return;
    setGeneratingStencil(true);
    setStencilSaved(false);

    try {
      const response = await fetch('/api/ai-generate-stencil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: stencilPrompt,
          style: stencilStyle,
          referenceImage: selectedImage,
        }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setStencilImage(data.imageUrl);
      } else {
        throw new Error('Stencil generation failed');
      }
    } catch (err) {
      console.warn('Stencil generation error:', err);
      alert('Stencil generation temporarily unavailable. Please try another prompt.');
    } finally {
      setGeneratingStencil(false);
    }
  };

  const handleSaveStencilToProfile = async () => {
    if (!stencilImage) return;
    if (!user) {
      const confirmed = window.confirm('Sign in with Google to save this stencil to your profile?');
      if (confirmed) await signIn();
      return;
    }

    try {
      await saveTattooConcept(user.uid, {
        title: `Stencil: ${stencilPrompt.slice(0, 40)}`,
        conceptText: `Generated Stencil: ${stencilPrompt} (Style: ${stencilStyle})`,
        imageUrl: stencilImage,
      });
      setStencilSaved(true);
      setTimeout(() => setStencilSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save stencil:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] bg-[#11091a] rounded-2xl border border-[#ea7af4]/30 shadow-[0_0_50px_rgba(234,122,244,0.35)] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-[#0a0510] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl p-[2px] bg-gradient-to-b from-[#ea7af4] to-[#fae8ff] shadow-[0_0_15px_rgba(234,122,244,0.4)] overflow-hidden">
              <img
                src={STUDIO_CONFIG.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain rounded-[9px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-serif-brand">
                  SHIVANSH AI STUDIO
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#ea7af4] bg-[#ea7af4]/15 px-2 py-0.5 rounded border border-[#ea7af4]/30">
                  Gemini Powered
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light">
                “Precision in Every Line.” · Multi-turn Consultation & Stencil Lab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-0.5 flex items-center text-xs">
              <button
                onClick={() => setActiveMode('chat')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                  activeMode === 'chat'
                    ? 'bg-[#ea7af4] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consultation</span>
              </button>
              <button
                onClick={() => setActiveMode('stencil')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
                  activeMode === 'stencil'
                    ? 'bg-[#ea7af4] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Stencil Lab</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Sub-Bar: Search Grounding, Model Speed, 10-Point Blueprint */}
        {activeMode === 'chat' && (
          <div className="px-5 py-2 bg-[#09050d] border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              {/* Search Grounding Toggle */}
              <button
                onClick={() => setUseSearch(!useSearch)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                  useSearch
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-zinc-200'
                }`}
                title="Search Grounding: Look up real-time live info, directions, and cultural symbol history"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Search Grounding: {useSearch ? 'ON' : 'OFF'}</span>
              </button>

              {/* Model Mode Selector */}
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-400">
                <Zap className="w-3 h-3 text-[#ea7af4]" />
                <span>Speed:</span>
                <button
                  onClick={() => setModelMode('fast')}
                  className={`px-2 py-0.5 rounded ${
                    modelMode === 'fast'
                      ? 'bg-[#ea7af4]/20 text-[#ea7af4] font-bold border border-[#ea7af4]/30'
                      : 'hover:text-white'
                  }`}
                  title="Super-fast response via gemini-3.1-flash-lite"
                >
                  Fast
                </button>
                <button
                  onClick={() => setModelMode('general')}
                  className={`px-2 py-0.5 rounded ${
                    modelMode === 'general'
                      ? 'bg-[#ea7af4]/20 text-[#ea7af4] font-bold border border-[#ea7af4]/30'
                      : 'hover:text-white'
                  }`}
                  title="General tasks via gemini-3.5-flash"
                >
                  General
                </button>
                <button
                  onClick={() => setModelMode('deep')}
                  className={`px-2 py-0.5 rounded ${
                    modelMode === 'deep'
                      ? 'bg-[#ea7af4]/20 text-[#ea7af4] font-bold border border-[#ea7af4]/30'
                      : 'hover:text-white'
                  }`}
                  title="Deep reasoning via gemini-3.1-pro-preview"
                >
                  Deep
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowConsultForm(!showConsultForm)}
              className={`text-[11px] px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                showConsultForm
                  ? 'bg-[#ea7af4] border-[#ea7af4] text-white font-bold'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{showConsultForm ? 'Hide Form' : '10-Point Blueprint Form'}</span>
            </button>
          </div>
        )}

        {/* Guided 10-Point Questionnaire Drawer */}
        {activeMode === 'chat' && showConsultForm && (
          <div className="p-4 bg-[#09090e] border-b border-white/10 text-xs max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white uppercase tracking-wider">
                10-Point Consultation Blueprint
              </span>
              <span className="text-zinc-400 text-[11px]">Guides Gemini to construct your exact concept</span>
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
                  <option>Lord Shiva / Spiritual</option>
                  <option>Portrait Tattoo</option>
                  <option>Custom Lettering</option>
                  <option>Cover-Up Consultation</option>
                  <option>Home Tattoo Service</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Placement:</label>
                <input
                  type="text"
                  value={consultForm.placement}
                  onChange={(e) => setConsultForm({ ...consultForm, placement: e.target.value })}
                  placeholder="e.g. Inner Forearm, Collarbone"
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Dimensions:</label>
                <input
                  type="text"
                  value={consultForm.size}
                  onChange={(e) => setConsultForm({ ...consultForm, size: e.target.value })}
                  placeholder="e.g. 4 x 3 inches"
                  className="w-full bg-[#12121c] text-white border border-white/10 rounded p-1 text-xs"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Appointment Type:</label>
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
          </div>
        )}

        {/* Content Body: Chat Mode vs Stencil Lab Mode */}
        {activeMode === 'chat' ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#11091a] to-[#07030a]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                } max-w-full`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#ea7af4] to-[#c026d3] text-white rounded-br-none shadow-[0_4px_15px_rgba(234,122,244,0.3)]'
                      : 'bg-[#180e24] text-zinc-200 border border-[#ea7af4]/20 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-2">{msg.content}</div>

                  {/* Search Grounding Sources badge if returned */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-blue-300 flex items-center gap-1.5 flex-wrap">
                      <Globe className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="font-semibold">Sources:</span>
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="bg-blue-900/40 border border-blue-500/30 px-2 py-0.5 rounded truncate max-w-[200px]"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Assistant Actions: Audio Speech & Copy & Save to Profile */}
                  {msg.role === 'assistant' && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        {/* Audio Voice Speech Playback */}
                        <button
                          onClick={() => handlePlayVoice(msg.id, msg.content)}
                          disabled={audioLoadingId === msg.id}
                          className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors ${
                            playingAudioId === msg.id
                              ? 'bg-[#ea7af4] text-white font-bold'
                              : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                          }`}
                          title="Listen with Gemini Voice"
                        >
                          {audioLoadingId === msg.id ? (
                            <Sparkles className="w-3 h-3 animate-spin text-[#ea7af4]" />
                          ) : playingAudioId === msg.id ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                          <span>
                            {audioLoadingId === msg.id
                              ? 'Synthesizing...'
                              : playingAudioId === msg.id
                              ? 'Stop Voice'
                              : 'Speak'}
                          </span>
                        </button>

                        {/* Copy Concept Button */}
                        <button
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-zinc-300"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        {/* Save to Firestore Profile */}
                        <button
                          onClick={() => handleSaveToProfile(msg.id, msg.content)}
                          className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors text-zinc-300"
                          title="Save this concept to your account profile"
                        >
                          {savedConceptId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <BookmarkPlus className="w-3 h-3 text-[#ea7af4]" />
                          )}
                          <span>{savedConceptId === msg.id ? 'Saved!' : 'Save'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Booking Transfer Actions */}
                  {msg.role === 'assistant' && msg.content.includes('TATTOO CONCEPT') && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      <button
                        onClick={() => onTransferToBooking(msg.content)}
                        className="px-3 py-1.5 rounded bg-[#ea7af4] text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-[#d946ef] transition-colors"
                      >
                        <Calendar className="w-3 h-3" />
                        Book With This Concept
                      </button>

                      <a
                        href={getWhatsAppLink(
                          'quote',
                          `Hi Shivansh Tattoo Studio, here is my AI Tattoo Concept:\n\n${msg.content}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:bg-emerald-700 transition-colors"
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
                <span>Shivansh AI is formulating your tattoo consultation...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        ) : (
          /* Stencil Visualizer & Canvas Mode */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-[#11091a] to-[#07030a] flex flex-col md:flex-row gap-6">
            {/* Left Controls */}
            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#ea7af4]" />
                  AI Tattoo Stencil & Concept Visualizer
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Generate clean vector stencils, linework drafts, and sacred geometry motifs using Gemini image generation.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Describe Your Stencil Motif:
                </label>
                <textarea
                  rows={3}
                  value={stencilPrompt}
                  onChange={(e) => setStencilPrompt(e.target.value)}
                  placeholder="e.g. Sacred Lord Shiva Trishul with delicate floral geometric mandala and sharp lines..."
                  className="w-full bg-[#180e24] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#ea7af4]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Stencil Art Style:
                </label>
                <select
                  value={stencilStyle}
                  onChange={(e) => setStencilStyle(e.target.value)}
                  className="w-full bg-[#180e24] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ea7af4]"
                >
                  <option>Tattoo Stencil Line Art</option>
                  <option>Sacred Geometry Dotwork</option>
                  <option>Black & Grey Micro-Realism</option>
                  <option>Spiritual Linework (Trishul & Om)</option>
                  <option>Single Needle Fine Line</option>
                </select>
              </div>

              <button
                onClick={handleGenerateStencil}
                disabled={generatingStencil}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea7af4] to-[#c026d3] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,122,244,0.4)] hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                {generatingStencil ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Rendering Stencil Line Art...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Tattoo Stencil</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Preview */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-[#0a0510] border border-white/10 rounded-2xl">
              {stencilImage ? (
                <div className="w-full flex flex-col items-center space-y-3">
                  <div className="w-full max-h-72 aspect-square rounded-xl overflow-hidden border border-[#ea7af4]/30 bg-black flex items-center justify-center shadow-[0_0_30px_rgba(234,122,244,0.2)]">
                    <img
                      src={stencilImage}
                      alt="Generated Stencil"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <a
                      href={stencilImage}
                      download="shivansh-tattoo-stencil.png"
                      className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Stencil
                    </a>

                    <button
                      onClick={handleSaveStencilToProfile}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#ea7af4] hover:bg-[#d946ef] text-xs text-white font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {stencilSaved ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <BookmarkPlus className="w-3.5 h-3.5" />
                      )}
                      <span>{stencilSaved ? 'Saved to Profile!' : 'Save Stencil'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 px-4 text-zinc-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium text-zinc-400">
                    No stencil rendered yet.
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                    Input your concept prompt and click Generate to see crisp line art ready for stencil thermal transfer.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Suggestion Chips (Chat Mode) */}
        {activeMode === 'chat' && (
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
        )}

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

        {/* Bottom Input Bar (Chat Mode) */}
        {activeMode === 'chat' && (
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

              {/* Voice Speech Input (Mic) */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-3 rounded-lg border transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                    : 'text-zinc-400 hover:text-[#ea7af4] hover:bg-white/5 border-white/10'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Voice Speech Input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input Field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening
                    ? 'Listening to your voice...'
                    : 'Describe your tattoo idea, placement, or ask a question...'
                }
                className="flex-1 bg-[#180e24] text-white placeholder-zinc-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#ea7af4] focus:ring-1 focus:ring-[#ea7af4]"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading || (!input.trim() && !selectedImage)}
                className="p-3 bg-gradient-to-r from-[#ea7af4] to-[#c026d3] text-white rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
