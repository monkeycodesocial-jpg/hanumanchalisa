export const EVENT = {
  title: "विश्वव्यापी श्री हनुमान चालीसा महाअभियान",
  subtitle: "एक साथ • एक समय • एक संकल्प",
  date: "26 May 2026",
  time: "7:00 PM IST",
  occasion: "Purushottam Maas Special",
  activities: [
    "Hanuman Chalisa Path",
    "Shri Ram Naam Jap",
    "Deep Prajwalan",
    "Collective Prayer",
    "Prasad Distribution",
  ],
};

export const IMAGE_COMPRESS_THRESHOLD_KB = 200;

export const BLOCKED_EXTENSIONS = [
  ".exe",
  ".bat",
  ".cmd",
  ".com",
  ".msi",
  ".scr",
  ".ps1",
  ".sh",
  ".dll",
  ".apk",
  ".jar",
  ".vbs",
  ".js",
  ".html",
  ".htm",
];

export const DAILY_QUOTES = [
  { text: "जो राम का हो गया, वो संसार का हो गया।", source: "श्री रामचरितमानस" },
  { text: "संकट कटै मिटै सब पीरा, जो सुमिरै हनुमत बलबीरा।", source: "श्री हनुमान चालीसा" },
  { text: "राम नाम मनि दीप धरु, जीह देहरीं द्वार।", source: "श्री रामचरितमानस" },
  { text: "भज ले रे मन, श्री रामचन्द्र को, जगत गुरु जगदीश्वर को।", source: "भक्ति गीत" },
  { text: "सब सुख लहै तुम्हारी सरना, तुम रक्षक काहू को डरना।", source: "श्री हनुमान चालीसा" },
  { text: "जय श्री राम — धर्म की जय, सत्य की जय, भक्ति की जय।", source: "सनातन धर्म" },
];

export function getDailyQuote() {
  const day = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  return DAILY_QUOTES[day % DAILY_QUOTES.length];
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
