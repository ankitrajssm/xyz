// Central event content repository for Tarang '26.
// Keep all content, schedules, rules, and festival metadata in this single source of truth.

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

/**
 * All 9 Flagship Festival Events.
 * Fully detailed with problem statements, rules, judging criteria, prizes, and what to carry.
 * Contacts use generic event coordination team without personal names or email addresses.
 */
export const EVENTS = [
  {
    id: 1,
    day: 1,
    date: '20 Nov 2026',
    time: '09:00',
    title: 'Pixel Rush Hackathon',
    cat: 'Tech',
    venue: 'Lab Complex',
    prize: '₹30,000',
    desc: 'Build a working web app in 24 hours. Teams of 2–3.',
    problemStatement:
      'Develop a functional software application solving one of three festival tracks: Smart Campus Navigation & Accessibility, Student Collaboration & Resource Sharing, or Sustainable Energy Tracking. Solutions must feature a functional frontend, an operational backend or structured mock API, and a deployable prototype demonstrating real user value.',
    format: '24-hour continuous on-site build with mentor checkpoint evaluations at Hour 8 and Hour 16.',
    duration: '24 Hours (09:00 AM Day 1 to 09:00 AM Day 2)',
    teamSize: '2–3 Members per team',
    eligibility: 'All undergraduate and diploma engineering / BCA / MCA / design students with valid college photo ID.',
    rules: [
      'All source code, designs, and architectural setup must be authored during the 24-hour hackathon window.',
      'Public open-source libraries, frameworks, and packages are permitted provided they are disclosed during check-in.',
      'Pre-built proprietary products, turnkey templates, or previously completed projects will lead to immediate disqualification.',
      'Teams must push incremental commits to a public Git repository created during the opening hour.',
      'Each team must deliver a live 3-minute product pitch followed by a 2-minute jury Q&A session.',
    ],
    judging: [
      'Technical architecture, code quality & problem difficulty (30%)',
      'Originality, innovation & real-world utility (30%)',
      'User experience, aesthetic polish & responsiveness (25%)',
      'Pitch delivery, live demo stability & defense during Q&A (15%)',
    ],
    prizes: {
      first: '₹18,000 + Winner Trophy & Certificates',
      second: '₹8,000 + Runner-up Shield & Certificates',
      third: '₹4,000 + Special Commendation & Certificates',
    },
    carry: [
      'Personal laptops and chargers/adapters',
      'Surge-protected power strip / extension cord per team',
      'Physical college ID card for every member',
      'Pre-configured software dev environments and Git accounts',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 2,
    day: 1,
    date: '20 Nov 2026',
    time: '11:30',
    title: 'Robo Wars',
    cat: 'Tech',
    venue: 'Workshop Arena',
    prize: '₹20,000',
    desc: 'Remote-controlled bots fight in a steel cage. Last bot moving wins.',
    problemStatement:
      'Design, fabricate, and operate a robust wired or wireless combat robot capable of withstanding heavy impact and immobilizing opposing machines inside a reinforced steel combat arena.',
    format: '1v1 double-elimination knockout tournament inside the safety-shielded steel arena.',
    duration: '3-Minute rounds with 90-second pit repair timeouts between bracket bouts.',
    teamSize: '2–4 Members per bot',
    eligibility: 'Open to diploma, polytechnic, and undergraduate engineering students.',
    rules: [
      'Maximum robot weight must not exceed 15 kg (including on-board batteries and weapon modules).',
      'Arena dimensions are 16 ft x 16 ft surrounded by high-impact polycarbonate safety walls.',
      'Permitted active weapons include spinning drums, lifters, wedges, and flippers. Liquid, fire, and entangling netting are strictly prohibited.',
      'All bots must pass safety inspections and demonstrate a functional emergency kill switch 45 minutes prior to match 1.',
      'A machine is declared knocked out if it remains immobile for 10 continuous seconds or is pushed out of the boundary ring.',
    ],
    judging: [
      'Direct aggression & tactical arena control (35%)',
      'Impact damage inflicted on opponent (35%)',
      'Mobility, structural durability & driver handling skill (30%)',
    ],
    prizes: {
      first: '₹12,000 + Combat Champions Trophy',
      second: '₹5,000 + Runner-up Shield',
      third: '₹3,000 + Bronze Citation',
    },
    carry: [
      'Combat robot and spare motors/batteries',
      'Protective safety goggles and workshop toolkit',
      'Radio controller transmitter & receiver set',
      'Valid college ID cards',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 3,
    day: 1,
    date: '20 Nov 2026',
    time: '18:00',
    title: 'Inauguration & DJ Night',
    cat: 'Music',
    venue: 'Open Air Theatre',
    prize: 'Free entry',
    desc: 'Lamp lighting, welcome act and a DJ set under the stars.',
    problemStatement:
      'Celebratory opening night gathering marking the official launch of Tarang \'26. Features the festival lamp-lighting ceremony, faculty address, student musical overture, and an electrifying open-air DJ set under the autumn night sky.',
    format: 'Open-air amphitheatre festival concert and community evening.',
    duration: '3.5 Hours (06:00 PM to 09:30 PM)',
    teamSize: 'Open to all registered attendees and delegates',
    eligibility: 'All students holding valid festival badges or registration receipts.',
    rules: [
      'Gates open at 5:30 PM; entrance requires physical or digital Tarang \'26 pass verification.',
      'College ID card is compulsory for security check-in at the Main Gate.',
      'Backpacks, glass bottles, and outside commercial food/beverages are not permitted inside the amphitheatre.',
      'Attendees must remain within designated spectator zones and adhere to student security volunteer instructions.',
    ],
    judging: [
      'Non-competitive celebratory showcase featuring student acoustic ensembles followed by the guest artist set.',
    ],
    prizes: {
      first: 'Complimentary Festival All-Access Pass',
      second: 'Featured Guest Artist Memento',
      third: 'Campus Delegation Commendation',
    },
    carry: [
      'Tarang \'26 digital registration confirmation receipt',
      'Physical college photo ID card',
      'Light jacket or warm clothing for open-air seating',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 4,
    day: 2,
    date: '21 Nov 2026',
    time: '10:00',
    title: 'Code Sprint',
    cat: 'Tech',
    venue: 'Computer Centre',
    prize: '₹15,000',
    desc: 'Solve 6 problems in 2 hours. Speed and accuracy both count.',
    problemStatement:
      'Solve six progressively challenging algorithmic and data structures problems under high-pressure time limits. Problems range from graph traversals and dynamic programming to string manipulations and computational geometry.',
    format: 'Individual speed programming contest conducted on an isolated campus testing server.',
    duration: '2 Hours (10:00 AM to 12:00 PM)',
    teamSize: 'Solo (1 Participant)',
    eligibility: 'All undergraduate and diploma students with basic programming proficiency.',
    rules: [
      'Supported programming languages: C++ (GCC), Java (OpenJDK), Python 3, and Rust.',
      'Internet access is strictly sandboxed to the contest problem portal and official language documentation.',
      'Any code sharing, electronic devices, or chat applications will trigger automatic disqualification.',
      'Ranking is computed based on number of test cases cleared; ties are resolved by total submission time plus wrong-attempt penalties.',
    ],
    judging: [
      'Automated test suite verification (60%)',
      'Execution time efficiency & low memory consumption (25%)',
      'Speed of final submission (15%)',
    ],
    prizes: {
      first: '₹8,000 + Gold Medal & Merit Certificate',
      second: '₹4,000 + Silver Medal & Merit Certificate',
      third: '₹3,000 + Bronze Medal & Merit Certificate',
    },
    carry: [
      'College ID card',
      'Pen and scratch paper (provided at desk, personal pens allowed)',
      'Pre-registered student roll number',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 5,
    day: 2,
    date: '21 Nov 2026',
    time: '14:00',
    title: 'Valorant Arena',
    cat: 'Gaming',
    venue: 'Seminar Hall',
    prize: '₹25,000',
    desc: '5v5 knockout bracket with casters and a big screen.',
    problemStatement:
      'Compete in a high-stakes 5v5 tactical first-person shooter tournament. Teams execute site strategies, coordinate agent abilities, and trade frags across competitive tournament maps projected live on the auditorium screen.',
    format: 'Single-elimination bracket; Quarterfinals & Semifinals Best of 1, Grand Finals Best of 3.',
    duration: '4.5 Hours (02:00 PM to 06:30 PM)',
    teamSize: '5 Players + 1 Optional Substitute',
    eligibility: 'College students with clean Riot Games accounts in good competitive standing.',
    rules: [
      'Matches played on the official live server using standard competitive rules and overtime formats.',
      'Map selection determined via alternating team bans 10 minutes prior to match schedule.',
      'Personal peripherals (mouse, keyboard, headset, mousepad) are permitted after coordinator inspection.',
      'Each team is granted one 60-second tactical timeout per map.',
      'Unsportsmanlike behavior, hate speech, or third-party macro scripts will lead to instant match forfeit.',
    ],
    judging: [
      'Official in-game match victory scores according to tournament brackets.',
    ],
    prizes: {
      first: '₹15,000 + Champions Shield & Gaming Accessories',
      second: '₹7,000 + Runner-up Plaque',
      third: '₹3,000 + Gaming Medals',
    },
    carry: [
      'Personal gaming mouse, keyboard, and audio headset (optional)',
      'Valid college ID cards for all 5 team players',
      'Verified Riot Games account credentials',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 6,
    day: 2,
    date: '21 Nov 2026',
    time: '19:00',
    title: 'Battle of Bands',
    cat: 'Music',
    venue: 'Main Stage',
    prize: '₹25,000',
    desc: 'Eight bands, twelve minutes each, one winner.',
    problemStatement:
      'Live student band showcase celebrating indie, rock, fusion, and original compositions. Bands perform on the festival main stage with professional stage acoustics, intelligent lighting, and a roaring student crowd.',
    format: 'Live stage performance with 5-minute technical soundcheck and 12-minute performance set.',
    duration: '3 Hours (07:00 PM to 10:00 PM)',
    teamSize: '3–8 Band Members',
    eligibility: 'Student bands from colleges or universities with valid student credentials.',
    rules: [
      'Total stage time is strictly 17 minutes (5 min soundcheck + 12 min performance set).',
      'A standard 5-piece acoustic drum kit, bass amplifier, and two guitar stage amplifiers are provided.',
      'Bands must bring their personal guitars, basses, effect pedals, keyboards, and drumsticks.',
      'No pre-recorded vocal tracks or backing synthesizer sequences are permitted; all music must be performed live.',
      'Derogatory or offensive lyrics will incur immediate point deductions from jury scorecards.',
    ],
    judging: [
      'Tightness, rhythmic cohesion & musical timing (30%)',
      'Vocal dynamics & instrumental technical proficiency (25%)',
      'Originality of arrangement & stage presence (25%)',
      'Crowd response & overall performance aura (20%)',
    ],
    prizes: {
      first: '₹15,000 + Golden Riff Band Trophy',
      second: '₹7,000 + Runner-up Shield',
      third: '₹3,000 + Acoustic Excellence Citation',
    },
    carry: [
      'Guitars, basses, effect processors, and instrument quarter-inch cables',
      'Keyboard/synthesizers and personal stands (if needed)',
      'Drumsticks, cymbals, and drum accessories',
      'Setlist and channel requirement chart for audio engineers',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 7,
    day: 3,
    date: '22 Nov 2026',
    time: '10:30',
    title: 'Design Duel',
    cat: 'Tech',
    venue: 'Design Studio',
    prize: '₹10,000',
    desc: 'Redesign a real app screen in 90 minutes. Judged live.',
    problemStatement:
      'Participants receive a live UX teardown prompt addressing a flawed digital flow in a popular consumer app (e.g., ticket booking, healthcare scheduling, or campus canteen ordering). Within 90 minutes, participants must research user pain points, re-architect the flow, and craft high-fidelity responsive screens.',
    format: 'Solo or duo rapid digital UI/UX sprint conducted live in the Design Studio.',
    duration: '90 Minutes (10:30 AM to 12:00 PM)',
    teamSize: '1–2 Members',
    eligibility: 'Open to all students interested in user interface design, product architecture, and human-computer interaction.',
    rules: [
      'Design brief and persona constraints are revealed on screen at 10:30 AM sharp.',
      'Approved design tools: Figma, Penpot, Sketch, or Adobe XD.',
      'Full pre-made templates or copied UI kits are strictly prohibited. Standard open icon sets and typography are allowed.',
      'Submissions must include a viewable prototype link and an annotated user flow diagram.',
      'A 2-minute live defense to the design jury follows immediately after submission.',
    ],
    judging: [
      'Problem diagnosis, user empathy & UX logic (30%)',
      'Information architecture, hierarchy & ease of navigation (30%)',
      'Visual typography, color contrast & aesthetic finish (25%)',
      'Clarity of rationale during jury review (15%)',
    ],
    prizes: {
      first: '₹6,000 + Design Excellence Trophy',
      second: '₹3,000 + Silver Shield',
      third: '₹1,000 + Commendation Certificate',
    },
    carry: [
      'Laptop with battery charger and design software installed',
      'Digital stylus / drawing tablet (optional)',
      'Valid student photo ID card',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 8,
    day: 3,
    date: '22 Nov 2026',
    time: '15:00',
    title: 'Street Play & Bhangra',
    cat: 'Cultural',
    venue: 'Central Lawn',
    prize: '₹20,000',
    desc: 'Nukkad natak followed by a bhangra and giddha face-off.',
    problemStatement:
      'Vibrant open-air cultural competition bringing socially conscious street theatre (Nukkad Natak) and high-energy traditional Punjabi folk arts (Bhangra & Giddha) to the campus central amphitheatre lawns.',
    format: 'Open-air circle stage performance judged live in front of the festival audience.',
    duration: '3 Hours (03:00 PM to 06:00 PM)',
    teamSize: '8–16 Members per troupe',
    eligibility: 'College dramatics, dance, and cultural societies.',
    rules: [
      'Performance duration limit is 15 minutes per troupe (including setup and clearing).',
      'Nukkad Natak must rely solely on acoustic percussion (dhol, dholak, dafli, harmonium) without electric amplification.',
      'Bhangra and Giddha dance teams may use recorded tracks provided to sound coordinators on a USB drive 1 hour prior.',
      'Props must be safe and eco-friendly; fire, water, colored powders, and sharp props are banned on the lawn.',
      'Scripts should focus on constructive social awareness with dignified dialogue.',
    ],
    judging: [
      'Script originality, depth of social message & storytelling (30%)',
      'Vocal clarity, synchronization & physical expressiveness (30%)',
      'Choreography, energy & traditional authenticity (25%)',
      'Crowd engagement & creative prop utilization (15%)',
    ],
    prizes: {
      first: '₹12,000 + Tarang Cultural Rolling Trophy',
      second: '₹5,000 + Cultural Runner-up Shield',
      third: '₹3,000 + Folk Art Medals',
    },
    carry: [
      'Traditional team costumes, dupattas, and props',
      'Acoustic percussion instruments',
      'High-quality audio track on a clean USB flash drive (for dance teams)',
      'College ID cards for all performers',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
  {
    id: 9,
    day: 3,
    date: '22 Nov 2026',
    time: '19:30',
    title: 'Grand Finale & Awards',
    cat: 'Cultural',
    venue: 'Main Stage',
    prize: 'Free entry',
    desc: 'Prize distribution and a headline performance.',
    problemStatement:
      'The festival climax: honoring three days of hard work, coding breakthroughs, and artistic mastery. Includes announcement of category winners, presentation of the overall institutional trophy, and a stellar headlining musical performance.',
    format: 'Auditorium gala, trophy ceremony, and headline performance.',
    duration: '2.5 Hours (07:30 PM to 10:00 PM)',
    teamSize: 'All registered participants, faculty, and visiting delegations',
    eligibility: 'All students holding valid festival registration receipts or ID cards.',
    rules: [
      'Auditorium doors open for seating at 7:00 PM on a first-come, first-seated basis.',
      'Winners must present college ID cards at the podium to verify certificates and awards.',
      'Institution rolling trophies will be presented to designated team leads or faculty advisors.',
      'Spectators must remain seated during awards announcements to facilitate smooth stage proceedings.',
    ],
    judging: [
      'Cumulative tournament points accrued across all 8 competitive events determine the Overall Institutional Champion.',
    ],
    prizes: {
      first: 'Tarang \'26 Institutional Rolling Trophy & Champion Banner',
      second: 'Runner-up Institutional Trophy',
      third: 'Best Outstation Delegation Shield',
    },
    carry: [
      'Festival registration confirmation receipt',
      'College ID card',
      'Event participation tokens for prize collection',
    ],
    contact: {
      name: 'Event Coordination Team',
      email: '',
    },
  },
]

export const FAQS = [
  ['Who can participate?', 'Diploma and undergraduate students from any college. Cross-college teams are welcome.'],
  ['Is there a registration fee?', 'Event registration is free. Accommodation and refund details will be announced by the organisers.'],
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
    desc: 'Bring your valid college ID card on event day to check in at the Registration & Help Desk at the Main Gate.',
  },
]

// Partners & Patrons placeholder slots
export const SPONSORS = [
  { id: 'p1', label: 'Your brand here' },
  { id: 'p2', label: 'Your brand here' },
  { id: 'p3', label: 'Your brand here' },
  { id: 'p4', label: 'Your brand here' },
  { id: 'p5', label: 'Your brand here' },
  { id: 'p6', label: 'Your brand here' },
]

// Festival atmosphere highlights rendered with bespoke vector graphics
export const GALLERY_HIGHLIGHTS = [
  {
    id: 'g1',
    eventId: 1,
    title: '24-Hour Code Sprint',
    track: 'Tech',
    desc: 'Overnight software build where ideas turn into functional prototypes.',
    theme: 'code',
  },
  {
    id: 'g2',
    eventId: 2,
    title: 'Steel Arena Robo Wars',
    track: 'Tech',
    desc: 'High-torque remote-controlled machines clashing in an enclosed cage.',
    theme: 'bot',
  },
  {
    id: 'g3',
    eventId: 5,
    title: 'Esports Bracket Final',
    track: 'Gaming',
    desc: 'Tactical matches with live casters and auditorium crowd cheers.',
    theme: 'gaming',
  },
  {
    id: 'g4',
    eventId: 3,
    title: 'Starry Open-Air DJ Night',
    track: 'Music',
    desc: 'High-energy beats, ambient lights, and an electric night crowd.',
    theme: 'music',
  },
  {
    id: 'g5',
    eventId: 8,
    title: 'Bhangra & Street Theatre',
    track: 'Cultural',
    desc: 'High-impact nukkad natak stories and vibrant folk dance beats.',
    theme: 'theatre',
  },
  {
    id: 'g6',
    eventId: 7,
    title: 'Live App Design Duel',
    track: 'Tech',
    desc: 'Ninety minutes to ideate, prototype, and defend real product designs.',
    theme: 'design',
  },
]

// General Festival Rules, Eligibility, Code of Conduct & Refund policies
export const GENERAL_RULES = {
  guidelines: [
    'A valid physical college photo ID card is mandatory for campus entry and all competition venues at all times.',
    'Participants must report to their respective venue at least 30 minutes before the scheduled start time for registration and briefing.',
    'Possession, distribution, or consumption of alcohol, tobacco, e-cigarettes, or any prohibited substances is strictly forbidden.',
    'Participants are responsible for their personal belongings, laptops, and equipment at all times.',
    'Decisions made by the event judging panels, student arbiters, and festival coordinators are final and binding.',
  ],
  eligibility: [
    'Currently enrolled undergraduate and diploma students from any recognized college, institute, or university are eligible.',
    'Cross-college teams are permitted for all group events (Hackathon, Robo Wars, Gaming, Band, and Cultural troupes).',
    'Participants may register for multiple events as long as schedules do not directly conflict on the timetable.',
    'There is no maximum limit on the total number of participants or teams an institution can field.',
  ],
  codeOfConduct: [
    'Tarang \'26 is committed to maintaining a welcoming, harassment-free environment for everyone regardless of gender, identity, or background.',
    'Academic honesty is paramount. Plagiarism, unauthorized external code libraries, or pre-built assets will lead to immediate disqualification.',
    'Participants must treat campus facilities, lab gear, audio equipment, botanical lawns, and volunteers with care and respect.',
  ],
  feeAndRefund: [
    'Event registration is free.',
    'Accommodation and refund details will be announced by the organisers.',
  ],
}

// Help desk and physical coordinator contacts
export const HELPDESK = {
  venue: 'Registration & Help Desk (exact spot announced on event day)',
  hours: '8:00 AM – 9:30 PM (All 3 festival days)',
  emergency: 'Campus Health Centre & Security Control Room (Ext. 101)',
}

// Derive stats strictly from data arrays above (no invented numbers)
export function getDerivedStats() {
  const totalPrizeNumeric = EVENTS.reduce((sum, item) => {
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