// ─── Bike Configurator Data ───────────────────────────────────────────────────
// The Wheelhouse | Premium Bike Build Tool

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  price: number; // additional cost over base
}

export interface ComponentOption {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image?: string;
  specs?: string;
}

export interface BikeFrame {
  id: string;
  brand: string;
  model: string;
  category: string; // Road, Gravel, MTB, Track
  description: string;
  basePrice: number;
  image: string;
  colors: ColorOption[];
  material: string;
  weight: string;
}

export interface ConfigStep {
  id: string;
  label: string;
  description: string;
}

// ─── CONFIG STEPS ─────────────────────────────────────────────────────────────
export const CONFIG_STEPS: ConfigStep[] = [
  { id: "frame",    label: "Frame",     description: "Choose your foundation" },
  { id: "color",    label: "Color",     description: "Make it yours" },
  { id: "groupset", label: "Groupset",  description: "Shifting & braking system" },
  { id: "wheels",   label: "Wheels",    description: "Roll fast, roll light" },
  { id: "tyres",    label: "Tyres",     description: "Where rubber meets road" },
  { id: "finishing",label: "Finishing", description: "Cockpit & saddle" },
  { id: "summary",  label: "Summary",   description: "Your complete build" },
];

// ─── FRAMES ───────────────────────────────────────────────────────────────────
export const FRAMES: BikeFrame[] = [
  {
    id: "specialized-tarmac-sl8",
    brand: "Specialized",
    model: "Tarmac SL8",
    category: "Road",
    description: "The fastest road bike Specialized has ever made. FACT 12r carbon, aerodynamic tube shapes, and a ride quality that defies physics.",
    basePrice: 4500,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    material: "FACT 12r Carbon",
    weight: "6.8 kg (complete)",
    colors: [
      { id: "gloss-black", name: "Gloss Black", hex: "#1a1a1a", price: 0 },
      { id: "white-silver", name: "White / Silver", hex: "#e8e8e8", price: 0 },
      { id: "red-black", name: "Crimson / Black", hex: "#c0392b", price: 0 },
      { id: "blue-chrome", name: "Blue Chrome", hex: "#2980b9", price: 250 },
      { id: "sagan-collection", name: "Sagan Collection", hex: "#8e44ad", price: 500 },
    ],
  },
  {
    id: "cervelo-r5",
    brand: "Cervélo",
    model: "R5",
    category: "Road",
    description: "Engineered for the world's best climbers. Ultralight, stiff where it matters, and compliant where it counts.",
    basePrice: 5200,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    material: "High-Modulus Carbon",
    weight: "6.6 kg (complete)",
    colors: [
      { id: "black-red", name: "Black / Red", hex: "#1a1a1a", price: 0 },
      { id: "white-red", name: "White / Red", hex: "#f5f5f5", price: 0 },
      { id: "team-replica", name: "Team Replica", hex: "#e74c3c", price: 350 },
      { id: "midnight-blue", name: "Midnight Blue", hex: "#1a2a4a", price: 0 },
    ],
  },
  {
    id: "trek-emonda-slr",
    brand: "Trek",
    model: "Émonda SLR",
    category: "Road",
    description: "The lightest production road bike Trek has ever built. OCLV 800 carbon, IsoSpeed decoupler, and a geometry that climbs like a dream.",
    basePrice: 4800,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80",
    material: "OCLV 800 Carbon",
    weight: "6.5 kg (complete)",
    colors: [
      { id: "matte-black", name: "Matte Black", hex: "#2c2c2c", price: 0 },
      { id: "radioactive-yellow", name: "Radioactive Yellow", hex: "#d4e600", price: 0 },
      { id: "alpine-white", name: "Alpine White", hex: "#f0f0f0", price: 0 },
      { id: "project-one-red", name: "Project One Red", hex: "#b71c1c", price: 600 },
      { id: "project-one-teal", name: "Project One Teal", hex: "#00796b", price: 600 },
    ],
  },
  {
    id: "basso-diamante-sv",
    brand: "Basso",
    model: "Diamante SV",
    category: "Road",
    description: "Italian craftsmanship meets modern performance. Toray T1000 carbon, a silhouette born in the Dolomites, and an exclusivity that turns heads.",
    basePrice: 3900,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
    material: "Toray T1000 Carbon",
    weight: "7.0 kg (complete)",
    colors: [
      { id: "nero-opaco", name: "Nero Opaco", hex: "#1c1c1c", price: 0 },
      { id: "bianco-perla", name: "Bianco Perla", hex: "#f8f4ee", price: 0 },
      { id: "rosso-corsa", name: "Rosso Corsa", hex: "#cc0000", price: 0 },
      { id: "verde-smeraldo", name: "Verde Smeraldo", hex: "#2e7d32", price: 200 },
      { id: "celeste", name: "Celeste", hex: "#a8d8c8", price: 200 },
    ],
  },
  {
    id: "canyon-aeroad-cfr",
    brand: "Canyon",
    model: "Aeroad CFR",
    category: "Road",
    description: "Wind-tunnel perfected aero road bike. CFR carbon, integrated cockpit, and the speed of a time trial bike with the handling of a race bike.",
    basePrice: 4200,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    material: "CFR Carbon",
    weight: "7.2 kg (complete)",
    colors: [
      { id: "stealth", name: "Stealth Black", hex: "#111111", price: 0 },
      { id: "white-aero", name: "White Aero", hex: "#eeeeee", price: 0 },
      { id: "team-movistar", name: "Team Movistar", hex: "#00a0e3", price: 400 },
    ],
  },
  {
    id: "salsa-warroad-carbon",
    brand: "Salsa",
    model: "Warroad Carbon",
    category: "Gravel",
    description: "Built for the long haul. Gravel racing geometry, tire clearance for 40mm rubber, and a carbon layup that soaks up the roughest roads.",
    basePrice: 2800,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
    material: "Carbon Fiber",
    weight: "8.4 kg (complete)",
    colors: [
      { id: "dusty-blue", name: "Dusty Blue", hex: "#5b7fa6", price: 0 },
      { id: "burnt-orange", name: "Burnt Orange", hex: "#c45e1a", price: 0 },
      { id: "forest-green", name: "Forest Green", hex: "#2d5a27", price: 0 },
    ],
  },
];

// ─── GROUPSETS ────────────────────────────────────────────────────────────────
export const GROUPSETS: ComponentOption[] = [
  {
    id: "shimano-dura-ace-di2",
    name: "Dura-Ace Di2 R9200",
    brand: "Shimano",
    description: "The pinnacle of Shimano's road groupset lineup. 12-speed wireless Di2 with semi-wireless architecture, hydraulic disc brakes, and unmatched shift precision.",
    price: 3200,
    specs: "12-speed | 50/34T | 11-30T | Di2 Electronic",
  },
  {
    id: "shimano-ultegra-di2",
    name: "Ultegra Di2 R8100",
    brand: "Shimano",
    description: "Dura-Ace performance at a more accessible price. 12-speed Di2 with the same shift quality as the flagship, at a fraction of the weight penalty.",
    price: 1800,
    specs: "12-speed | 50/34T | 11-30T | Di2 Electronic",
  },
  {
    id: "sram-red-etap-axs",
    name: "RED eTap AXS",
    brand: "SRAM",
    description: "Fully wireless 12-speed groupset with SRAM's signature double-tap shifting. The lightest groupset available with hydraulic disc brakes.",
    price: 3600,
    specs: "12-speed | 48/35T | 10-33T | Wireless Electronic",
  },
  {
    id: "sram-force-etap-axs",
    name: "Force eTap AXS",
    brand: "SRAM",
    description: "SRAM's second-tier wireless groupset. Nearly identical shifting performance to RED at a more accessible price point.",
    price: 2200,
    specs: "12-speed | 48/35T | 10-33T | Wireless Electronic",
  },
  {
    id: "campagnolo-super-record",
    name: "Super Record EPS",
    brand: "Campagnolo",
    description: "Italian excellence in electronic shifting. 12-speed EPS with Campagnolo's legendary ergonomics and the most tactile shift feel on the market.",
    price: 3800,
    specs: "12-speed | 50/34T | 11-29T | EPS Electronic",
  },
  {
    id: "shimano-105-di2",
    name: "105 Di2 R7100",
    brand: "Shimano",
    description: "Electronic shifting for every rider. 12-speed Di2 technology brought to a price point that makes sense for serious enthusiasts.",
    price: 1100,
    specs: "12-speed | 50/34T | 11-34T | Di2 Electronic",
  },
];

// ─── WHEELS ───────────────────────────────────────────────────────────────────
export const WHEELS: ComponentOption[] = [
  {
    id: "zipp-454-nsw",
    name: "454 NSW Carbon Clincher",
    brand: "Zipp",
    description: "Sawtooth rim profile inspired by humpback whale fins. Reduces drag in crosswinds and delivers the most aerodynamic wheel in real-world conditions.",
    price: 3200,
    specs: "58mm depth | 27.4mm internal width | 1,490g/pair",
  },
  {
    id: "enve-ses-4-5",
    name: "SES 4.5 Carbon Clincher",
    brand: "ENVE",
    description: "The all-rounder. 45mm front, 45mm rear — balanced aero and climbing performance for every terrain. Made in the USA.",
    price: 2800,
    specs: "45mm depth | 25mm internal width | 1,390g/pair",
  },
  {
    id: "roval-rapide-clx-ii",
    name: "Rapide CLX II",
    brand: "Roval",
    description: "Specialized's in-house carbon wheel. Optimized for the Tarmac SL8 but exceptional on any bike. Wind-tunnel tested, real-world proven.",
    price: 2400,
    specs: "51mm depth | 23mm internal width | 1,420g/pair",
  },
  {
    id: "lightweight-meilenstein",
    name: "Meilenstein Obermayer",
    brand: "Lightweight",
    description: "The benchmark for climbing wheels. Hand-laid carbon fiber, sub-1,000g per pair, and a stiffness-to-weight ratio that defies belief.",
    price: 4200,
    specs: "52mm depth | 21mm internal width | 990g/pair",
  },
  {
    id: "dt-swiss-arc-1100",
    name: "ARC 1100 Dicut 62",
    brand: "DT Swiss",
    description: "Swiss precision engineering. 62mm deep aero profile with DT Swiss's legendary hub reliability and the smoothest bearings in the industry.",
    price: 1900,
    specs: "62mm depth | 20.8mm internal width | 1,540g/pair",
  },
  {
    id: "hunt-60-aero",
    name: "60 Limitless Aero Disc",
    brand: "Hunt",
    description: "Outstanding value-to-performance ratio. 60mm deep carbon clincher with a wide rim profile optimized for 25-32mm tyres.",
    price: 1100,
    specs: "60mm depth | 21mm internal width | 1,640g/pair",
  },
];

// ─── TYRES ────────────────────────────────────────────────────────────────────
export const TYRES: ComponentOption[] = [
  {
    id: "continental-gp5000-s-tr",
    name: "Grand Prix 5000 S TR",
    brand: "Continental",
    description: "The benchmark road tyre. BlackChili compound, Vectran Breaker puncture protection, and the lowest rolling resistance of any clincher tyre.",
    price: 160,
    specs: "28mm | TL-Ready | 200-250g | Road",
  },
  {
    id: "pirelli-p-zero-race",
    name: "P Zero Race TLR",
    brand: "Pirelli",
    description: "Formula 1 DNA in a road tyre. SmartEVO compound, Aramid belt, and a supple casing that delivers exceptional cornering grip.",
    price: 180,
    specs: "28mm | TL-Ready | 195g | Road",
  },
  {
    id: "vittoria-corsa-pro",
    name: "Corsa Pro TLR",
    brand: "Vittoria",
    description: "Graphene 2.0 compound, cotton casing, and a ride feel that reminds you why you fell in love with cycling. The pro peloton's choice.",
    price: 200,
    specs: "28mm | TL-Ready | 190g | Road",
  },
  {
    id: "schwalbe-pro-one",
    name: "Pro One TLE",
    brand: "Schwalbe",
    description: "German engineering at its finest. MicroSkin casing, V-Guard protection, and a supple ride quality that makes every road feel smooth.",
    price: 150,
    specs: "28mm | TL-Easy | 225g | Road",
  },
  {
    id: "panaracer-agilest",
    name: "Agilest TLR",
    brand: "Panaracer",
    description: "Japanese precision. Ultra-light casing, ZSG compound, and a price point that makes tubeless accessible to every rider.",
    price: 120,
    specs: "28mm | TL-Ready | 185g | Road",
  },
  {
    id: "goodyear-eagle-f1",
    name: "Eagle F1 SuperSport",
    brand: "Goodyear",
    description: "Motorsport heritage in a road tyre. Dynamic:RSC compound, Pentaforce casing, and a tread pattern that channels water away in the wet.",
    price: 170,
    specs: "28mm | TL-Ready | 205g | Road",
  },
];

// ─── FINISHING — BAR / STEM ──────────────────────────────────────────────────
export interface BarStemOption extends ComponentOption {
  barWidths: string[];   // e.g. ["38cm","40cm","42cm","44cm"]
  stemLengths: string[]; // e.g. ["90mm","100mm","110mm","120mm"]
}

export const BAR_STEM_OPTIONS: BarStemOption[] = [
  {
    id: "enve-ses-ar",
    name: "SES AR Bar/Stem Combo",
    brand: "ENVE",
    description: "Fully integrated aero cockpit. Internal cable routing, 3K carbon weave, and a fit range that works for every rider. Made in the USA.",
    price: 1200,
    specs: "Integrated Bar/Stem | 31.8mm clamp",
    barWidths: ["38cm", "40cm", "42cm", "44cm"],
    stemLengths: ["90mm", "100mm", "110mm", "120mm", "130mm"],
  },
  {
    id: "zipp-sl-speed",
    name: "SL Speed Carbon Cockpit",
    brand: "Zipp",
    description: "Aero-optimized handlebar and stem combo. 3K carbon, internal routing, and a shape that reduces drag without sacrificing comfort.",
    price: 900,
    specs: "Integrated Bar/Stem | 31.8mm clamp",
    barWidths: ["38cm", "40cm", "42cm", "44cm"],
    stemLengths: ["80mm", "90mm", "100mm", "110mm", "120mm"],
  },
  {
    id: "pro-vibe-superlight",
    name: "Vibe Superlight Carbon",
    brand: "PRO",
    description: "Shimano's premium cockpit brand. Superlight carbon bar and stem, internal routing, and a classic round bar shape.",
    price: 650,
    specs: "Separate Bar/Stem | 31.8mm clamp",
    barWidths: ["38cm", "40cm", "42cm", "44cm"],
    stemLengths: ["80mm", "90mm", "100mm", "110mm", "120mm"],
  },
  {
    id: "ritchey-wcs-carbon",
    name: "WCS Carbon Evo Curve",
    brand: "Ritchey",
    description: "Trusted by pros for decades. Toray carbon, classic compact drop, and a reliability record that speaks for itself.",
    price: 480,
    specs: "Separate Bar/Stem | 31.8mm clamp",
    barWidths: ["38cm", "40cm", "42cm", "44cm"],
    stemLengths: ["80mm", "90mm", "100mm", "110mm"],
  },
  {
    id: "deda-elementi-superleggera",
    name: "Superleggera DCR",
    brand: "Deda Elementi",
    description: "Italian carbon cockpit with internal cable routing. Lightweight, stiff, and beautifully finished for the discerning rider.",
    price: 750,
    specs: "Integrated Bar/Stem | 31.8mm clamp",
    barWidths: ["38cm", "40cm", "42cm", "44cm"],
    stemLengths: ["90mm", "100mm", "110mm", "120mm"],
  },
];

// ─── FINISHING — SADDLE ───────────────────────────────────────────────────────
export const SADDLE_OPTIONS: ComponentOption[] = [
  {
    id: "fizik-antares-r1",
    name: "Antares R1 Adaptive",
    brand: "Fizik",
    description: "The saddle of choice for the world's best riders. 3D-printed padding, carbon rail, and a shape that works for aggressive race positions.",
    price: 450,
    specs: "Carbon Rail | 145/155mm width | 196g",
  },
  {
    id: "selle-italia-slr-boost",
    name: "SLR Boost Kit Carbonio",
    brand: "Selle Italia",
    description: "Italian saddle craftsmanship. Idmatch technology, carbon shell, and a Boost geometry that works with modern short-reach frames.",
    price: 380,
    specs: "Carbon Rail | 145mm width | 145g",
  },
  {
    id: "specialized-power-mirror",
    name: "Power Mirror",
    brand: "Specialized",
    description: "Engineered with Body Geometry science. Mirror foam adapts to your sit bones for all-day comfort in an aggressive position.",
    price: 320,
    specs: "Carbon Rail | 143/155mm width | 168g",
  },
  {
    id: "smp-composit",
    name: "Composit",
    brand: "SMP",
    description: "The iconic Italian saddle with a central cutout that relieves pressure on soft tissue. Loved by riders who spend long hours in the saddle.",
    price: 280,
    specs: "Carbon Rail | 130mm width | 185g",
  },
  {
    id: "prologo-dimension-ndr",
    name: "Dimension NDR",
    brand: "Prologo",
    description: "Nack technology for superior grip and comfort. Tirox rail, compact shape, and a price point that makes premium accessible.",
    price: 240,
    specs: "Tirox Rail | 143mm width | 210g",
  },
];

// ─── FINISHING — BAR TAPE ─────────────────────────────────────────────────────
export const BAR_TAPE_OPTIONS: ComponentOption[] = [
  {
    id: "fizik-vento-microtex",
    name: "Vento Microtex Tacky",
    brand: "Fizik",
    description: "Ultra-thin 2mm tape with a tacky surface for maximum grip. The choice of WorldTour professionals.",
    price: 45,
    specs: "2mm | Microtex | Multiple colours",
  },
  {
    id: "supacaz-super-sticky-kush",
    name: "Super Sticky Kush",
    brand: "Supacaz",
    description: "Bold colours, premium feel. Galaxy-print or solid options with a 3.5mm cushioned feel that absorbs road vibration.",
    price: 55,
    specs: "3.5mm | Silicone gel | Multiple colours",
  },
  {
    id: "lizardskins-dsp",
    name: "DSP 3.2mm",
    brand: "Lizard Skins",
    description: "Durasoft Polymer construction. Exceptional grip in wet and dry conditions, and a durability that outlasts the competition.",
    price: 40,
    specs: "3.2mm | DSP | Multiple colours",
  },
  {
    id: "cinelli-cork",
    name: "Cork Ribbon",
    brand: "Cinelli",
    description: "The classic. Natural cork feel, excellent vibration damping, and a timeless look that suits any build.",
    price: 25,
    specs: "2.5mm | Cork | Multiple colours",
  },
  {
    id: "pro-gravel-tape",
    name: "Gravel Comfort Tape",
    brand: "PRO",
    description: "Extra thick 4mm tape designed for long days in the saddle. Perfect for endurance and gravel builds.",
    price: 35,
    specs: "4mm | EVA foam | Multiple colours",
  },
];

// ─── FINISHING — CAGES ────────────────────────────────────────────────────────
export const CAGE_OPTIONS: ComponentOption[] = [
  {
    id: "elite-custom-race",
    name: "Custom Race",
    brand: "Elite",
    description: "Lightweight polycarbonate cage with a secure hold and easy release. The standard choice for road racing.",
    price: 35,
    specs: "Polycarbonate | 28g | Side entry",
  },
  {
    id: "arundel-mandible",
    name: "Mandible Cage",
    brand: "Arundel",
    description: "Carbon fibre cage with a unique mandible design that grips bottles securely even on rough roads.",
    price: 75,
    specs: "Carbon | 18g | Side entry",
  },
  {
    id: "tacx-deva",
    name: "Deva Carbon",
    brand: "Tacx",
    description: "Woven carbon construction, minimal weight, and a secure hold that works with any bottle shape.",
    price: 65,
    specs: "Carbon | 22g | Top/side entry",
  },
  {
    id: "king-cage-titanium",
    name: "Titanium Cage",
    brand: "King Cage",
    description: "Hand-bent titanium wire cage. Virtually indestructible, beautifully simple, and made in the USA.",
    price: 55,
    specs: "Titanium | 32g | Side entry",
  },
];

// ─── FINISHING — EXTRAS ───────────────────────────────────────────────────────
export const EXTRAS_OPTIONS: ComponentOption[] = [
  {
    id: "garmin-edge-840",
    name: "Edge 840 Solar",
    brand: "Garmin",
    description: "GPS cycling computer with solar charging, ClimbPro, and full navigation. The benchmark for road cycling computers.",
    price: 650,
    specs: "GPS | Solar charging | 3.5\" touchscreen",
  },
  {
    id: "wahoo-elemnt-roam",
    name: "ELEMNT ROAM V2",
    brand: "Wahoo",
    description: "Clean interface, turn-by-turn navigation, and seamless integration with Strava, TrainingPeaks, and Zwift.",
    price: 480,
    specs: "GPS | 3.7\" colour display | 17hr battery",
  },
  {
    id: "sram-axs-power-meter",
    name: "Quarq DZero Power Meter",
    brand: "SRAM",
    description: "Dual-sided power measurement integrated into the crank spider. Accurate to ±1.5% and compatible with all SRAM groupsets.",
    price: 750,
    specs: "Dual-sided | ±1.5% accuracy | ANT+/BLE",
  },
  {
    id: "shimano-pd-r9100",
    name: "PD-R9100 Dura-Ace Pedals",
    brand: "Shimano",
    description: "The lightest Shimano road pedal. Titanium axle, carbon composite body, and a large platform for efficient power transfer.",
    price: 320,
    specs: "Titanium axle | 228g/pair | SPD-SL",
  },
  {
    id: "speedplay-zero",
    name: "Zero Stainless Pedals",
    brand: "Speedplay",
    description: "Dual-sided entry, adjustable float, and the lowest stack height in road cycling. Loved by riders with knee issues.",
    price: 260,
    specs: "Stainless | 230g/pair | Dual-sided entry",
  },
  {
    id: "silca-pump",
    name: "SuperPista Ultimate Floor Pump",
    brand: "Silca",
    description: "The finest floor pump ever made. Machined aluminium, Italian craftsmanship, and a gauge accurate to ±0.5 PSI.",
    price: 220,
    specs: "Max 220 PSI | Dual chuck | Made in USA",
  },
];

// ─── FINISHING SELECTION STATE ────────────────────────────────────────────────
export interface BarStemSelection {
  item: BarStemOption;
  barWidth: string;
  stemLength: string;
}

export interface FinishingSelections {
  barStem: BarStemSelection | null;
  saddle: ComponentOption | null;
  barTape: ComponentOption | null;
  cages: ComponentOption | null;   // one cage option (qty handled at checkout)
  extras: ComponentOption[];       // multiple extras allowed
}

export const EMPTY_FINISHING: FinishingSelections = {
  barStem: null,
  saddle: null,
  barTape: null,
  cages: null,
  extras: [],
};

export function calcFinishingTotal(f: FinishingSelections): number {
  return (
    (f.barStem?.item.price ?? 0) +
    (f.saddle?.price ?? 0) +
    (f.barTape?.price ?? 0) +
    (f.cages?.price ?? 0) +
    f.extras.reduce((sum, e) => sum + e.price, 0)
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export type BuildState = {
  frame: BikeFrame | null;
  color: ColorOption | null;
  groupset: ComponentOption | null;
  wheels: ComponentOption | null;
  tyres: ComponentOption | null;
  finishing: FinishingSelections;
};

export function calcTotal(build: BuildState): number {
  return (
    (build.frame?.basePrice ?? 0) +
    (build.color?.price ?? 0) +
    (build.groupset?.price ?? 0) +
    (build.wheels?.price ?? 0) +
    (build.tyres?.price ?? 0) +
    calcFinishingTotal(build.finishing)
  );
}
