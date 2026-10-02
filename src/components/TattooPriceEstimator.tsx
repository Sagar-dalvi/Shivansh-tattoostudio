import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Ruler,
  Palette,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
  MessageCircle,
  Info,
  Sliders,
  AlertCircle,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppLink } from '../studioConfig';

export interface EstimateDetails {
  sizeLabel: string;
  dimensionsText: string;
  placement: string;
  styleName: string;
  serviceMode: string;
  minPrice: number;
  maxPrice: number;
  durationHours: string;
  sessions: string;
  painLevel: number;
  painLabel: string;
}

interface TattooPriceEstimatorProps {
  onApplyEstimateToBooking: (details: EstimateDetails) => void;
  onOpenAiWithEstimate?: (prompt: string) => void;
}

// Preset Size Options
interface SizeOption {
  id: string;
  label: string;
  dimensions: string;
  approxArea: number; // in sq inches
  reference: string;
  iconDesc: string;
  baseMin: number;
  baseMax: number;
}

const SIZE_PRESETS: SizeOption[] = [
  {
    id: 'micro',
    label: 'Micro / Fine Line',
    dimensions: '< 2 inches',
    approxArea: 2,
    reference: 'Coin or Ring size',
    iconDesc: 'Subtle minimal symbol, finger piece, or wrist initials',
    baseMin: 1500,
    baseMax: 2500,
  },
  {
    id: 'small',
    label: 'Small Piece',
    dimensions: '2" – 4" inches',
    approxArea: 8,
    reference: 'Credit Card size',
    iconDesc: 'Forearm quote, inner bicep emblem, ankle or collarbone art',
    baseMin: 3200,
    baseMax: 5000,
  },
  {
    id: 'medium',
    label: 'Medium Piece',
    dimensions: '4" – 7" inches',
    approxArea: 20,
    reference: 'Smartphone size',
    iconDesc: 'Outer forearm wrap, bicep focal art, calf, or shoulder blade',
    baseMin: 6500,
    baseMax: 10500,
  },
  {
    id: 'large',
    label: 'Large Canvas',
    dimensions: '7" – 10" inches',
    approxArea: 48,
    reference: 'Tablet or Hand span',
    iconDesc: 'Half-sleeve segment, full thigh panel, chest piece, or upper back',
    baseMin: 12000,
    baseMax: 18500,
  },
  {
    id: 'xlarge',
    label: 'Statement / Tapestry',
    dimensions: '10"+ inches',
    approxArea: 95,
    reference: 'Full Sleeve / Back',
    iconDesc: 'Full arm sleeve, back piece, rib-to-hip, multi-session epic',
    baseMin: 22000,
    baseMax: 38000,
  },
];

// Placement Options
interface PlacementOption {
  id: string;
  name: string;
  zone: string;
  multiplier: number;
  painLevel: number; // 1 to 5
  painLabel: string;
  curvatures: string;
}

const PLACEMENT_OPTIONS: PlacementOption[] = [
  {
    id: 'outer-arm',
    name: 'Outer Forearm / Bicep',
    zone: 'Arm',
    multiplier: 1.0,
    painLevel: 2,
    painLabel: 'Mild / Easy Tolerance',
    curvatures: 'Smooth muscular plane, steady needle glide',
  },
  {
    id: 'inner-arm',
    name: 'Inner Forearm / Inner Bicep',
    zone: 'Arm',
    multiplier: 1.1,
    painLevel: 3,
    painLabel: 'Moderate',
    curvatures: 'Tender skin, requires steady breathing and pacing',
  },
  {
    id: 'shoulder',
    name: 'Shoulder / Deltoid',
    zone: 'Arm',
    multiplier: 1.05,
    painLevel: 2,
    painLabel: 'Mild / Comfortable',
    curvatures: 'Great rounded canvas with excellent ink retention',
  },
  {
    id: 'thigh-calf',
    name: 'Thigh / Outer Calf',
    zone: 'Leg',
    multiplier: 1.05,
    painLevel: 2,
    painLabel: 'Mild / Tolerable',
    curvatures: 'Expansive flat plane, ideal for detailed realism',
  },
  {
    id: 'back-upper',
    name: 'Upper Back / Shoulder Blades',
    zone: 'Torso',
    multiplier: 1.12,
    painLevel: 3,
    painLabel: 'Moderate',
    curvatures: 'Spacious canvas with slight bone proximity at scapula',
  },
  {
    id: 'chest-collar',
    name: 'Chest / Collarbone',
    zone: 'Torso',
    multiplier: 1.2,
    painLevel: 4,
    painLabel: 'High Sensitivity',
    curvatures: 'Thin skin over clavicle; rhythmic breath synchronization',
  },
  {
    id: 'ribs-spine',
    name: 'Ribs / Spine / Sternum',
    zone: 'Torso',
    multiplier: 1.3,
    painLevel: 5,
    painLabel: 'Intense / High Sensitivity',
    curvatures: 'Ultra-thin skin, high nerve density; micro-paced needle craft',
  },
  {
    id: 'wrist-ankle',
    name: 'Wrist / Ankle / Behind Ear',
    zone: 'Delicate',
    multiplier: 1.18,
    painLevel: 3,
    painLabel: 'Moderate Tenderness',
    curvatures: 'Tendon motion, joint flexion; fine needle calibration',
  },
  {
    id: 'fingers-neck',
    name: 'Fingers / Hands / Neck',
    zone: 'Delicate',
    multiplier: 1.32,
    painLevel: 4,
    painLabel: 'High Dexterity',
    curvatures: 'Rapid skin turnover; requires deep pigment mastery',
  },
];

// Style & Color Complexity Options
interface StyleOption {
  id: string;
  name: string;
  category: string;
  multiplier: number;
  description: string;
  badge: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'fineline',
    name: 'Minimalist & Fine Line',
    category: 'Minimal',
    multiplier: 0.95,
    description: 'Crisp single-needle contours, typography, or clean micro linework with zero or light shading.',
    badge: 'Single-Pass Precision',
  },
  {
    id: 'black-grey',
    name: 'Black & Grey Shading',
    category: 'Shading',
    multiplier: 1.15,
    description: 'Multi-tone greywash gradation, charcoal depth, smooth transitions, and high-contrast impact.',
    badge: 'Timeless Monochrome',
  },
  {
    id: 'geometric',
    name: 'Sacred Geometry & Dotwork',
    category: 'Geometry',
    multiplier: 1.25,
    description: 'Mathematical mandala vectoring, stippling density gradations, and zero-wobble symmetry.',
    badge: 'Exact Symmetry',
  },
  {
    id: 'realism',
    name: 'Photo-to-Ink Realism & Portrait',
    category: 'Realism',
    multiplier: 1.45,
    description: 'Hyper-realistic facial reproduction, lifelike eye luminescence, fur/hair micro-textures, and deep volume.',
    badge: 'Master Realism',
  },
  {
    id: 'color-accent',
    name: 'Black & Grey with Color Accent',
    category: 'Color',
    multiplier: 1.25,
    description: 'Monochrome anchor piece highlighted with selective high-saturation color accents (red, teal, gold, purple).',
    badge: 'Duotone Impact',
  },
  {
    id: 'full-color',
    name: 'Full Color Spectrum',
    category: 'Color',
    multiplier: 1.5,
    description: 'Multi-pigment palette layering, smooth color blending, and deep skin-undertone saturation.',
    badge: 'Vibrant Palette',
  },
  {
    id: 'coverup',
    name: 'Cover-Up / Redesign Camouflage',
    category: 'Cover-Up',
    multiplier: 1.35,
    description: 'Optical camouflage over existing faded ink, pigment neutralization, and strategic dark-to-light layering.',
    badge: 'Specialized Camo',
  },
];

// Service Tier Options
interface ServiceTier {
  id: string;
  name: string;
  multiplier: number;
  flatFee: number;
  description: string;
}

const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'studio-standard',
    name: 'Studio Appointment (Resident Specialist)',
    multiplier: 1.0,
    flatFee: 0,
    description: 'In-studio session at our Dhule facility with medical-grade barrier sterilization and private comfort.',
  },
  {
    id: 'studio-founder',
    name: 'Master Direction (Sagar Dalvi Leadership)',
    multiplier: 1.25,
    flatFee: 0,
    description: 'Dedicated 1-on-1 design consultation and artistic direction led by Studio Founder & CEO Sagar Dalvi.',
  },
  {
    id: 'home-service',
    name: 'Luxury Home Tattoo Service',
    multiplier: 1.0,
    flatFee: 2500,
    description: 'Hospital-grade mobile autoclave setup brought directly to your private home. Includes transit and setup.',
  },
];

export const TattooPriceEstimator: React.FC<TattooPriceEstimatorProps> = ({
  onApplyEstimateToBooking,
  onOpenAiWithEstimate,
}) => {
  // State
  const [useCustomDimensions, setUseCustomDimensions] = useState<boolean>(false);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('small');
  const [customWidth, setCustomWidth] = useState<number>(3.5);
  const [customHeight, setCustomHeight] = useState<number>(4.0);

  const [selectedPlacementId, setSelectedPlacementId] = useState<string>('outer-arm');
  const [selectedStyleId, setSelectedStyleId] = useState<string>('black-grey');
  const [selectedTierId, setSelectedTierId] = useState<string>('studio-standard');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Active items
  const activePreset = useMemo(
    () => SIZE_PRESETS.find((s) => s.id === selectedSizeId) || SIZE_PRESETS[1],
    [selectedSizeId]
  );

  const activePlacement = useMemo(
    () => PLACEMENT_OPTIONS.find((p) => p.id === selectedPlacementId) || PLACEMENT_OPTIONS[0],
    [selectedPlacementId]
  );

  const activeStyle = useMemo(
    () => STYLE_OPTIONS.find((st) => st.id === selectedStyleId) || STYLE_OPTIONS[1],
    [selectedStyleId]
  );

  const activeTier = useMemo(
    () => SERVICE_TIERS.find((t) => t.id === selectedTierId) || SERVICE_TIERS[0],
    [selectedTierId]
  );

  // Calculation Math
  const calculation = useMemo(() => {
    let baseMin = 0;
    let baseMax = 0;
    let effectiveArea = 0;
    let dimensionsLabel = '';

    if (useCustomDimensions) {
      effectiveArea = customWidth * customHeight;
      dimensionsLabel = `${customWidth}" × ${customHeight}" (${effectiveArea.toFixed(1)} sq in)`;

      // Tiered square inch pricing
      let calcMin = 1400; // minimum shop sterile barrier setup
      let calcMax = 2200;

      if (effectiveArea <= 2) {
        calcMin += effectiveArea * 600;
        calcMax += effectiveArea * 900;
      } else if (effectiveArea <= 8) {
        calcMin += 2 * 600 + (effectiveArea - 2) * 450;
        calcMax += 2 * 900 + (effectiveArea - 2) * 650;
      } else if (effectiveArea <= 25) {
        calcMin += 2 * 600 + 6 * 450 + (effectiveArea - 8) * 320;
        calcMax += 2 * 900 + 6 * 650 + (effectiveArea - 8) * 480;
      } else {
        calcMin += 2 * 600 + 6 * 450 + 17 * 320 + (effectiveArea - 25) * 220;
        calcMax += 2 * 900 + 6 * 650 + 17 * 480 + (effectiveArea - 25) * 340;
      }

      baseMin = calcMin;
      baseMax = calcMax;
    } else {
      effectiveArea = activePreset.approxArea;
      dimensionsLabel = `${activePreset.label} (${activePreset.dimensions})`;
      baseMin = activePreset.baseMin;
      baseMax = activePreset.baseMax;
    }

    // Apply multipliers
    const placementFactor = activePlacement.multiplier;
    const styleFactor = activeStyle.multiplier;
    const tierFactor = activeTier.multiplier;
    const flatFee = activeTier.flatFee;

    const rawMin = baseMin * placementFactor * styleFactor * tierFactor + flatFee;
    const rawMax = baseMax * placementFactor * styleFactor * tierFactor + flatFee;

    // Round to clean 100s for a professional quote experience
    const roundedMin = Math.round(rawMin / 100) * 100;
    const roundedMax = Math.round(rawMax / 100) * 100;

    // Estimated duration calculation based on area and complexity
    let hoursLow = 1.0;
    let hoursHigh = 2.0;

    if (effectiveArea <= 2) {
      hoursLow = 0.75;
      hoursHigh = 1.5;
    } else if (effectiveArea <= 8) {
      hoursLow = 1.5;
      hoursHigh = 3.0;
    } else if (effectiveArea <= 22) {
      hoursLow = 3.0;
      hoursHigh = 5.0;
    } else if (effectiveArea <= 50) {
      hoursLow = 5.0;
      hoursHigh = 8.0;
    } else {
      hoursLow = 8.0;
      hoursHigh = 15.0;
    }

    // Modulate hours with style factor
    hoursLow = Math.max(0.5, Number((hoursLow * styleFactor).toFixed(1)));
    hoursHigh = Math.max(1.0, Number((hoursHigh * styleFactor).toFixed(1)));

    let durationText = `${hoursLow} – ${hoursHigh} Hours`;
    let sessionsText = 'Single Dedicated Session';
    if (hoursHigh > 6) {
      sessionsText = '1 – 2 Progressive Sessions';
    }
    if (hoursHigh > 10) {
      sessionsText = 'Multi-Session Master Project';
    }

    return {
      minPrice: roundedMin,
      maxPrice: roundedMax,
      effectiveArea,
      dimensionsLabel,
      durationText,
      sessionsText,
      painLevel: activePlacement.painLevel,
      painLabel: activePlacement.painLabel,
    };
  }, [
    useCustomDimensions,
    customWidth,
    customHeight,
    activePreset,
    activePlacement,
    activeStyle,
    activeTier,
  ]);

  // Construct Estimate Details Object for transfer
  const currentEstimateDetails: EstimateDetails = {
    sizeLabel: useCustomDimensions ? 'Custom Dimensions' : activePreset.label,
    dimensionsText: calculation.dimensionsLabel,
    placement: activePlacement.name,
    styleName: activeStyle.name,
    serviceMode: activeTier.name,
    minPrice: calculation.minPrice,
    maxPrice: calculation.maxPrice,
    durationHours: calculation.durationText,
    sessions: calculation.sessionsText,
    painLevel: calculation.painLevel,
    painLabel: calculation.painLabel,
  };

  // WhatsApp formatted link
  const whatsAppMessage = `Hi Shivansh Tattoo Studio, I generated an estimate on your website calculator:
• Style: ${activeStyle.name}
• Size: ${calculation.dimensionsLabel}
• Placement: ${activePlacement.name}
• Service: ${activeTier.name}
• Rough Quote: ₹${calculation.minPrice.toLocaleString('en-IN')} – ₹${calculation.maxPrice.toLocaleString('en-IN')}
• Estimated Duration: ${calculation.durationText}

I would like to discuss booking an appointment and refining this design with the studio.`;

  const whatsAppUrl = getWhatsAppLink('quote', whatsAppMessage);

  const handleCopySummary = () => {
    const summaryText = `Shivansh Tattoo Studio Estimate:
• Style: ${activeStyle.name}
• Size: ${calculation.dimensionsLabel}
• Placement: ${activePlacement.name}
• Estimate: ₹${calculation.minPrice.toLocaleString('en-IN')} – ₹${calculation.maxPrice.toLocaleString('en-IN')}
• Duration: ${calculation.durationText} (${calculation.sessionsText})`;

    navigator.clipboard.writeText(summaryText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      id="estimator"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09050e] relative overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#ea7af4]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-900/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ea7af4] font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#ea7af4]" />
            <span>Transparent Pricing & Precision Calibration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            TATTOO PRICE ESTIMATOR
          </h2>

          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Every tattoo at Shivansh Tattoo Studio is an individualized work of art. Use our interactive
            estimator to calculate a realistic quote range based on your desired size, anatomical placement,
            and ink complexity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-xs text-zinc-500">
            <span>Sterile Medical Cartridges</span>
            <span aria-hidden="true">·</span>
            <span>Vegan Archival Pigments</span>
            <span aria-hidden="true">·</span>
            <span>No Hidden Surcharges</span>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Step 1: Size & Dimensions */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#130b1c] border border-white/10 hover:border-[#ea7af4]/30 transition-colors shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#ea7af4]/15 border border-[#ea7af4]/30 text-[#ea7af4] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      Select Size & Dimensions
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Choose a calibrated benchmark or set custom inch measurements
                    </p>
                  </div>
                </div>

                {/* Toggle Preset vs Custom */}
                <div className="inline-flex items-center p-1 bg-black/40 rounded-lg border border-white/10 text-xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setUseCustomDimensions(false)}
                    className={`px-3 py-1.5 rounded-md transition-all font-medium ${
                      !useCustomDimensions
                        ? 'bg-[#ea7af4] text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Preset Benchmarks
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseCustomDimensions(true)}
                    className={`px-3 py-1.5 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                      useCustomDimensions
                        ? 'bg-[#ea7af4] text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Exact Inches</span>
                  </button>
                </div>
              </div>

              {!useCustomDimensions ? (
                /* Size Presets Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SIZE_PRESETS.map((preset) => {
                    const isSelected = selectedSizeId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedSizeId(preset.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all relative ${
                          isSelected
                            ? 'bg-[#20102e] border-[#ea7af4] shadow-[0_0_15px_rgba(234,122,244,0.2)]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider ${
                              isSelected ? 'text-[#ea7af4]' : 'text-zinc-200'
                            }`}
                          >
                            {preset.label}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {preset.dimensions}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-300 font-medium flex items-center gap-1 mb-1">
                          <span className="text-zinc-500">Ref:</span> {preset.reference}
                        </div>
                        <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {preset.iconDesc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Custom Dimensions Slider Panel */
                <div className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Width Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Width:</span>
                        <span className="text-[#ea7af4] font-bold font-mono text-sm">
                          {customWidth.toFixed(1)} inches
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        step="0.5"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ea7af4]"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                        <span>1"</span>
                        <span>7"</span>
                        <span>14"</span>
                      </div>
                    </div>

                    {/* Height Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-zinc-300 font-medium">Height:</span>
                        <span className="text-[#ea7af4] font-bold font-mono text-sm">
                          {customHeight.toFixed(1)} inches
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        step="0.5"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ea7af4]"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                        <span>1"</span>
                        <span>7"</span>
                        <span>14"</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Area Metric */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-[#ea7af4]" />
                      <span>
                        Effective Surface Area:{' '}
                        <strong className="text-white">
                          {(customWidth * customHeight).toFixed(1)} sq. inches
                        </strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      Tiered square-inch volume curve applied
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Anatomical Placement */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#130b1c] border border-white/10 hover:border-[#ea7af4]/30 transition-colors shadow-lg">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-[#ea7af4]/15 border border-[#ea7af4]/30 text-[#ea7af4] flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Select Placement & Anatomical Zone
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Skin elasticity, bone curvature, and nerve density factor into needle pacing
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PLACEMENT_OPTIONS.map((placement) => {
                  const isSelected = selectedPlacementId === placement.id;
                  return (
                    <button
                      key={placement.id}
                      type="button"
                      onClick={() => setSelectedPlacementId(placement.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#20102e] border-[#ea7af4] shadow-[0_0_15px_rgba(234,122,244,0.2)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? 'text-[#ea7af4]' : 'text-zinc-200'
                          }`}
                        >
                          {placement.name}
                        </span>
                      </div>

                      {/* Pain Level Indicator */}
                      <div className="flex items-center gap-1.5 my-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <span
                              key={lvl}
                              className={`w-1.5 h-3 rounded-xs ${
                                lvl <= placement.painLevel
                                  ? placement.painLevel >= 4
                                    ? 'bg-amber-400'
                                    : 'bg-[#ea7af4]'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          {placement.painLabel}
                        </span>
                      </div>

                      <p className="text-[10px] text-zinc-500 leading-tight">
                        {placement.curvatures}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Ink Style & Color Complexity */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#130b1c] border border-white/10 hover:border-[#ea7af4]/30 transition-colors shadow-lg">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-[#ea7af4]/15 border border-[#ea7af4]/30 text-[#ea7af4] flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Art Style & Color Complexity
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Needle configurations, pigment layering, and micro-shading passes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyleId === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#20102e] border-[#ea7af4] shadow-[0_0_15px_rgba(234,122,244,0.2)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? 'text-[#ea7af4]' : 'text-white'
                            }`}
                          >
                            {style.name}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-mono">
                            {style.badge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed">
                          {style.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Service Mode & Artist Tier */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#130b1c] border border-white/10 hover:border-[#ea7af4]/30 transition-colors shadow-lg">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-[#ea7af4]/15 border border-[#ea7af4]/30 text-[#ea7af4] flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Service Experience Tier
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Standard studio session, Sagar Dalvi creative direction, or private luxury home service
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICE_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#20102e] border-[#ea7af4] shadow-[0_0_15px_rgba(234,122,244,0.2)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                          <span className={isSelected ? 'text-[#ea7af4]' : 'text-white'}>
                            {tier.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      {tier.flatFee > 0 && (
                        <div className="mt-3 text-[10px] font-mono text-[#ea7af4]">
                          + ₹{tier.flatFee.toLocaleString('en-IN')} Mobile Sterile Kit
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Estimate Quote Summary Card (5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-2xl bg-gradient-to-b from-[#180e24] via-[#140b1d] to-[#0f0717] border border-[#ea7af4]/30 p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ea7af4] to-transparent" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ea7af4]">
                  Calibrated Estimate
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  INR (₹)
                </span>
              </div>

              {/* Price Range Display */}
              <div className="mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                  ₹{calculation.minPrice.toLocaleString('en-IN')}{' '}
                  <span className="text-zinc-500 font-light text-2xl">–</span>{' '}
                  ₹{calculation.maxPrice.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 font-light">
                  Estimated quote range · Subject to exact artwork detail during consultation
                </p>
              </div>

              {/* Key Specs Matrix */}
              <div className="space-y-3 py-4 border-y border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Size / Dimensions</span>
                  </span>
                  <span className="text-white font-medium text-right max-w-[180px] truncate">
                    {calculation.dimensionsLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Placement</span>
                  </span>
                  <span className="text-white font-medium text-right">
                    {activePlacement.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Style Complexity</span>
                  </span>
                  <span className="text-white font-medium text-right max-w-[170px] truncate">
                    {activeStyle.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Estimated Time</span>
                  </span>
                  <span className="text-white font-medium text-right">
                    {calculation.durationText}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Sensitivity Index</span>
                  </span>
                  <span className="text-amber-300 font-medium text-right">
                    {activePlacement.painLabel} ({activePlacement.painLevel}/5)
                  </span>
                </div>
              </div>

              {/* What Is Included Guarantee */}
              <div className="my-5 space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Always Included With Every Session:
                </div>
                <div className="grid grid-cols-1 gap-1.5 text-[11px] text-zinc-300 font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Single-use autoclave blister-packed cartridges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>100% Vegan archival inks (Dynamic / Eternal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Digital stencil anatomical fitting preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Complimentary initial healing barrier film</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Primary CTA: Transfer To Booking */}
                <button
                  type="button"
                  onClick={() => onApplyEstimateToBooking(currentEstimateDetails)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#ea7af4] via-[#d946ef] to-[#c084fc] hover:opacity-95 text-white font-bold text-xs uppercase tracking-[0.16em] rounded-xl transition-all shadow-[0_0_20px_rgba(234,122,244,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Apply Estimate to Booking</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary CTA: WhatsApp Direct Inquire */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Estimate via WhatsApp</span>
                </a>

                {/* Tertiary Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] rounded-lg border border-white/5 transition-colors text-center"
                  >
                    {isCopied ? '✓ Quote Copied' : 'Copy Quote Details'}
                  </button>

                  {onOpenAiWithEstimate && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenAiWithEstimate(
                          `I have configured an estimate for a ${activeStyle.name} tattoo on my ${activePlacement.name}, sized ${calculation.dimensionsLabel}. Can you suggest creative concept ideas and composition elements that suit this placement?`
                        )
                      }
                      className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-[#ea7af4] text-[11px] rounded-lg border border-[#ea7af4]/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Refine in AI</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-5 p-3 rounded-lg bg-black/40 border border-white/5 text-[10px] text-zinc-500 leading-normal flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>
                  Exact investment is determined during in-person studio consultation after evaluating
                  detailed line frequency, anatomical curves, and custom stencil complexity.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
