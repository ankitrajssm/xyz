// Central event content repository for Tarang '26.
// Keep all content, schedules, and festival metadata in this single source of truth.

export const EVENT = {
  name: 'TARANG',
  year: "'26",
  tagline: 'Three days of code, music and colour',
  dates: '20 – 22 Nov 2026',
  date: '2026-11-20T09:00:00',
  venue: 'Main Auditorium & Open Air Theatre',
  address: 'Institute Campus, Punjab, India',
}

export const CATS = [
  { name: 'Tech', icon: '💻', desc: 'Hackathon, coding contests, robotics and UI/UX battles.' },
  { name: 'Gaming', icon: '🎮', desc: 'Esports brackets with a live-streamed finals stage.' },
  { name: 'Music', icon: '🎵', desc: 'DJ night, battle of bands and an open-mic hour.' },
  { name: 'Cultural', icon: '🎭', desc: 'Street play, bhangra, giddha and the grand finale.' },
]

export const EVENTS = [
  { id: 1, day: 1, time: '09:00', title: 'Pixel Rush Hackathon', cat: 'Tech', venue: 'Lab Complex', prize: '₹30,000', desc: 'Build a working web app in 24 hours. Teams of 2–3.' },
  { id: 2, day: 1, time: '11:30', title: 'Robo Wars', cat: 'Tech', venue: 'Workshop Arena', prize: '₹20,000', desc: 'Remote-controlled bots fight in a steel cage. Last bot moving wins.' },
  { id: 3, day: 1, time: '18:00', title: 'Inauguration & DJ Night', cat: 'Music', venue: 'Open Air Theatre', prize: 'Free entry', desc: 'Lamp lighting, welcome act and a DJ set under the stars.' },
  { id: 4, day: 2, time: '10:00', title: 'Code Sprint', cat: 'Tech', venue: 'Computer Centre', prize: '₹15,000', desc: 'Solve 6 problems in 2 hours. Speed and accuracy both count.' },
  { id: 5, day: 2, time: '14:00', title: 'Valorant Arena', cat: 'Gaming', venue: 'Seminar Hall', prize: '₹25,000', desc: '5v5 knockout bracket with casters and a big screen.' },
  { id: 6, day: 2, time: '19:00', title: 'Battle of Bands', cat: 'Music', venue: 'Main Stage', prize: '₹25,000', desc: 'Eight bands, twelve minutes each, one winner.' },
  { id: 7, day: 3, time: '10:30', title: 'Design Duel', cat: 'Tech', venue: 'Design Studio', prize: '₹10,000', desc: 'Redesign a real app screen in 90 minutes. Judged live.' },
  { id: 8, day: 3, time: '15:00', title: 'Street Play & Bhangra', cat: 'Cultural', venue: 'Central Lawn', prize: '₹20,000', desc: 'Nukkad natak followed by a bhangra and giddha face-off.' },
  { id: 9, day: 3, time: '19:30', title: 'Grand Finale & Awards', cat: 'Cultural', venue: 'Main Stage', prize: 'Free entry', desc: 'Prize distribution and a headline performance.' },
]

export const FAQS = [
  ['Who can participate?', 'Diploma and undergraduate students from any college. Cross-college teams are welcome.'],
  ['Is there a registration fee?', 'Event entry is free. The festival package covers hostel stay and meals.'],
  ['What should I carry?', 'College ID card, registration receipt, laptop and charger for tech events.'],
  ['Can I join more than one event?', 'Yes, as long as the timings do not clash. Tell the help desk if they do.'],
]

// 3-step participation workflow displayed alongside registration
export const HOW_TO_PARTICIPATE = [
  {
    step: '01',
    title: 'Choose Your Event',
    desc: 'Browse through the 9 flagship events across Tech, Gaming, Music, and Cultural tracks in the schedule.',
  },
  {
    step: '02',
    title: 'Submit Registration',
    desc: 'Fill out the 1-minute registration form with your student contact details. Event entry is completely free.',
  },
  {
    step: '03',
    title: 'Check In On Campus',
    desc: 'Bring your valid college ID card to the help desk at Gate 2 on event day to collect your badge.',
  },
]

// Fictional student fest partners with simple geometric badges (no real company brands)
export const SPONSORS = [
  { id: 's1', name: 'Aether Dynamics', role: 'Innovation Partner', category: 'Robotics & AI' },
  { id: 's2', name: 'CodePulse Labs', role: 'Platform Partner', category: 'Cloud Infrastructure' },
  { id: 's3', name: 'Vortex Gaming', role: 'Esports Partner', category: 'Gaming Hardware' },
  { id: 's4', name: 'Indus Soundworks', role: 'Acoustics Partner', category: 'Live Audio & Stage' },
  { id: 's5', name: 'ByteForge Studio', role: 'Design Partner', category: 'Creative Tools' },
  { id: 's6', name: 'Kavach Systems', role: 'Security Partner', category: 'Cyber Defence' },
]

// Festival atmosphere highlights rendered with bespoke vector graphics
export const GALLERY_HIGHLIGHTS = [
  {
    id: 'g1',
    title: '24-Hour Code Sprint',
    track: 'Tech',
    desc: 'Overnight software build where ideas turn into functional prototypes.',
    theme: 'code',
  },
  {
    id: 'g2',
    title: 'Steel Arena Robo Wars',
    track: 'Tech',
    desc: 'High-torque remote-controlled machines clashing in an enclosed cage.',
    theme: 'bot',
  },
  {
    id: 'g3',
    title: 'Esports Bracket Final',
    track: 'Gaming',
    desc: 'Tactical matches with live casters and auditorium crowd cheers.',
    theme: 'gaming',
  },
  {
    id: 'g4',
    title: 'Starry Open-Air DJ Night',
    track: 'Music',
    desc: 'High-energy beats, ambient lights, and an electric night crowd.',
    theme: 'music',
  },
  {
    id: 'g5',
    title: 'Bhangra & Street Theatre',
    track: 'Cultural',
    desc: 'High-impact nukkad natak stories and vibrant folk dance beats.',
    theme: 'theatre',
  },
  {
    id: 'g6',
    title: 'Live App Design Duel',
    track: 'Tech',
    desc: 'Ninety minutes to ideate, prototype, and defend real product designs.',
    theme: 'design',
  },
]

// Derive stats strictly from data arrays above (no invented numbers)
export function getDerivedStats() {
  const totalPrizeNumeric = EVENTS.reduce((sum, item) => {
    // Extract numeric values from strings like '₹30,000'
    const num = parseInt(item.prize.replace(/[^\d]/g, ''), 10)
    return isNaN(num) ? sum : sum + num
  }, 0)

  const daysSet = new Set(EVENTS.map(e => e.day))
  const categoriesSet = new Set(EVENTS.map(e => e.cat))

  return {
    prizeNumeric: totalPrizeNumeric,
    prizeFormatted: '₹' + totalPrizeNumeric.toLocaleString('en-IN'),
    totalEvents: EVENTS.length,
    totalDays: daysSet.size,
    totalCategories: categoriesSet.size,
  }
}