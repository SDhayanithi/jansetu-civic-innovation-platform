export const districts = [
  "Ranchi",
  "Dhanbad",
  "East Singhbhum",
  "West Singhbhum",
  "Hazaribagh",
  "Bokaro",
  "Giridih",
  "Dumka",
  "Deoghar",
  "Ramgarh",
  "Koderma",
  "Chatra",
  "Palamu",
  "Garhwa",
  "Latehar",
  "Lohardaga",
  "Gumla",
  "Simdega",
  "Khunti",
  "Jamtara",
  "Pakur",
  "Sahibganj",
  "Godda",
  "Saraikela Kharsawan",
];
export type Problem = {
  id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  priority: "Critical" | "Complex" | "Routine";
  status: string;
  lat: number;
  lng: number;
  date: string;
  population: number;
  support: number;
  sdg: number;
  sdgTitle: string;
  sdgScore: number;
  aiExplanation: string;
  duplicate?: string | undefined;
  image?: string | undefined;
  rejectionReason?: string | undefined;
};
export type Solution = {
  id: string;
  problemId: string;
  title: string;
  university: string;
  author: string;
  approach: string;
  budget: string;
  timeline: string;
  impact: string;
  sdg: number;
  status: string;
  success: number;
  funding: string;
  attachment?: string | undefined;
  partnership?: string | undefined;
  mentorship?: string | undefined;
  understanding?: string | undefined;
};
export const seedProblems: Problem[] = [
  {
    id: "JS1024",
    title: "Broken drinking water pipeline",
    description: "Drinking water pipeline is broken and dirty water is entering the street.",
    category: "Water",
    district: "Ranchi",
    priority: "Critical",
    status: "Pending Verification",
    lat: 23.3441,
    lng: 85.3096,
    date: "08 Sep 2026",
    population: 2400,
    support: 184,
    sdg: 6,
    sdgTitle: "Clean Water and Sanitation",
    sdgScore: 92,
    aiExplanation: "Essential drinking water is contaminated and may affect many residents.",
    duplicate: "87% similar report found 1.2 km away",
  },
  {
    id: "JS1023",
    title: "Primary health centre lacks medicines",
    description: "Essential medicines unavailable for two weeks.",
    category: "Healthcare",
    district: "Dhanbad",
    priority: "Critical",
    status: "Verified",
    lat: 23.7957,
    lng: 86.4304,
    date: "07 Sep 2026",
    population: 5600,
    support: 241,
    sdg: 3,
    sdgTitle: "Good Health and Well-being",
    sdgScore: 94,
    aiExplanation: "Interrupts essential healthcare for a large population.",
  },
  {
    id: "JS1022",
    title: "Damaged rural school roof",
    description: "Monsoon damage has made two classrooms unsafe.",
    category: "Education",
    district: "Bokaro",
    priority: "Complex",
    status: "University Matching",
    lat: 23.6693,
    lng: 86.1511,
    date: "05 Sep 2026",
    population: 380,
    support: 96,
    sdg: 4,
    sdgTitle: "Quality Education",
    sdgScore: 88,
    aiExplanation: "Requires coordinated structural repair.",
  },
  {
    id: "JS1021",
    title: "Blocked irrigation canal",
    description: "Silt blocks irrigation for nearby farms.",
    category: "Agriculture",
    district: "Hazaribagh",
    priority: "Complex",
    status: "Solution Submitted",
    lat: 23.9966,
    lng: 85.3691,
    date: "03 Sep 2026",
    population: 1200,
    support: 132,
    sdg: 2,
    sdgTitle: "Zero Hunger",
    sdgScore: 86,
    aiExplanation: "Affects livelihoods and seasonal crop output.",
  },
  {
    id: "JS1020",
    title: "Uncollected market waste",
    description: "Waste is accumulating beside the market.",
    category: "Environment",
    district: "Deoghar",
    priority: "Routine",
    status: "Under Review",
    lat: 24.4852,
    lng: 86.6948,
    date: "01 Sep 2026",
    population: 700,
    support: 68,
    sdg: 11,
    sdgTitle: "Sustainable Cities and Communities",
    sdgScore: 79,
    aiExplanation: "Localized issue suitable for routine municipal action.",
  },
  {
    id: "JS1019",
    title: "Unsafe bridge approach road",
    description: "Deep erosion beside bridge creates accident risk.",
    category: "Infrastructure",
    district: "Giridih",
    priority: "Critical",
    status: "Testing",
    lat: 24.1914,
    lng: 86.2996,
    date: "29 Aug 2026",
    population: 3200,
    support: 207,
    sdg: 9,
    sdgTitle: "Industry, Innovation and Infrastructure",
    sdgScore: 91,
    aiExplanation: "Immediate road safety risk on a key access route.",
  },
];
export const seedSolutions: Solution[] = [
  {
    id: "SOL201",
    problemId: "JS1021",
    title: "Solar-assisted canal desilting system",
    university: "BIT Sindri",
    author: "Aditi Kumari · Faculty Team",
    approach: "Solar pump monitoring with community-led desilting and sensor alerts.",
    budget: "₹8,40,000",
    timeline: "16 weeks",
    impact: "Restore irrigation to 430 hectares and reduce crop loss.",
    sdg: 2,
    status: "Under Review",
    success: 84,
    funding: "Open",
  },
  {
    id: "SOL200",
    problemId: "JS1022",
    title: "Rapid modular classroom roof retrofit",
    university: "NIT Jamshedpur",
    author: "Civil Innovation Lab",
    approach: "Locally fabricated lightweight truss retrofit with rainwater routing.",
    budget: "₹5,20,000",
    timeline: "10 weeks",
    impact: "Safe classrooms for 380 learners.",
    sdg: 4,
    status: "Approved",
    success: 88,
    funding: "Seeking Partner",
  },
];
