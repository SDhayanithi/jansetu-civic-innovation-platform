import { districts } from "@/data/seed";

const districtCenters: Record<string, { lat: number; lng: number }> = {
  Ranchi: { lat: 23.3441, lng: 85.3096 },
  Dhanbad: { lat: 23.7957, lng: 86.4304 },
  "East Singhbhum": { lat: 22.8046, lng: 86.2029 },
  "West Singhbhum": { lat: 22.5539, lng: 85.8077 },
  Hazaribagh: { lat: 23.9966, lng: 85.3691 },
  Bokaro: { lat: 23.6693, lng: 86.1511 },
  Giridih: { lat: 24.1914, lng: 86.2996 },
  Dumka: { lat: 24.2678, lng: 87.2486 },
  Deoghar: { lat: 24.4852, lng: 86.6948 },
  Ramgarh: { lat: 23.6345, lng: 85.521 },
  Koderma: { lat: 24.4677, lng: 85.5934 },
  Chatra: { lat: 24.2065, lng: 84.87 },
  Palamu: { lat: 24.042, lng: 84.0907 },
  Garhwa: { lat: 24.1549, lng: 83.7996 },
  Latehar: { lat: 23.7446, lng: 84.4994 },
  Lohardaga: { lat: 23.433, lng: 84.6799 },
  Gumla: { lat: 23.0441, lng: 84.5379 },
  Simdega: { lat: 22.6154, lng: 84.5021 },
  Khunti: { lat: 23.076, lng: 85.278 },
  Jamtara: { lat: 23.963, lng: 86.8024 },
  Pakur: { lat: 24.6337, lng: 87.8498 },
  Sahibganj: { lat: 25.2381, lng: 87.6454 },
  Godda: { lat: 24.827, lng: 87.2127 },
  "Saraikela Kharsawan": { lat: 22.699, lng: 85.931 },
};

const aliases: Record<string, string> = {
  jamshedpur: "East Singhbhum",
  chaibasa: "West Singhbhum",
  medininagar: "Palamu",
  saraikela: "Saraikela Kharsawan",
  seraikela: "Saraikela Kharsawan",
};

export function districtFromAddress(address: Record<string, unknown> | undefined) {
  if (!address) return null;
  const haystack = Object.values(address)
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
  const exact = districts.find((name) => haystack.includes(name.toLowerCase()));
  if (exact) return exact;
  const alias = Object.entries(aliases).find(([name]) => haystack.includes(name));
  return alias?.[1] ?? null;
}

export function nearestJharkhandDistrict(lat: number, lng: number) {
  let result = "Ranchi";
  let best = Number.POSITIVE_INFINITY;
  for (const [name, center] of Object.entries(districtCenters)) {
    const distance = Math.hypot(
      lat - center.lat,
      (lng - center.lng) * Math.cos((lat * Math.PI) / 180),
    );
    if (distance < best) {
      best = distance;
      result = name;
    }
  }
  return result;
}
