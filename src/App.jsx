import { useEffect, useState } from 'react'
import { EVENT, EVENTS, CATS, FAQS } from './data/Eventdata'

const NAV = ['schedule', 'activities', 'venue', 'register', 'faq']
const BTN = 'inline-block px-7 py-3 rounded-full font-bold bg-[var(--gold)] text-[var(--ink)] hover:-translate-y-1 transition-transform'

function useCountdown(t) {
  const calc = () => {
    const d = Math.max(0, new Date(t) - new Date())
    return { Days: Math.floor(d / 864e5), Hours: Math.floor(d / 36e5) % 24, Mins: Math.floor(d / 6e4) % 60, Secs: Math.floor(d / 1e3) % 60 }
  }
  const [v, setV] = useState(calc)
  useEffect(() => { const i = setInterval(() => setV(calc), 1000); return () => clearInterval(i) }, [])
  return v
}

function Nav() {
  const [o, setO] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-[var(--ink)]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="display text-xl text-[var(--gold)]">{EVENT.name}{EVENT.year}</a>
        <button className="sm:hidden text-2xl" aria-label="Menu" onClick={() => setO(!o)}>{o ? '✕' : '☰'}</button>
        <div className={`${o ? 'flex' : 'hidden'} sm:flex absolute sm:static top-14 inset-x-0 flex-col sm:flex-row gap-4 p-4 sm:p-0 bg-[var(--ink)] sm:bg-transparent capitalize`}>
          {NAV.map(n => <a key={n} href={`#${n}`} onClick={() => setO(false)} className="hover:text-[var(--gold)]">{n}</a>)}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const c = useCountdown(EVENT.date)
  return (
    <header id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-14 text-center">
      <svg className="spin absolute w-[130vmin] h-[130vmin] opacity-25" viewBox="-100 -100 200 200" fill="none" stroke="var(--gold)" strokeWidth=".6" aria-hidden="true">
        {[...Array(12)].map((_, i) => <rect key={i} x="-70" y="-70" width="140" height="140" transform={`rotate(${i * 7.5})`} stroke={i % 2 ? 'var(--red)' : 'var(--gold)'} />)}
        <circle r="30" stroke="var(--teal)" />
      </svg>
      <div className="relative">
        <p className="text-[var(--teal)] font-semibold mb-2">{EVENT.dates} · {EVENT.address}</p>
        <h1 className="display headline text-[22vw] sm:text-[11rem] leading-none" aria-label={EVENT.name + EVENT.year}>
          {(EVENT.name + EVENT.year).split('').map((ch, i) => <span key={i} className="drop" style={{ animationDelay: `${i * 110}ms` }}>{ch}</span>)}
        </h1>
        <p className="text-lg sm:text-2xl mt-2 mb-8 pop" style={{ animationDelay: '1s' }}>{EVENT.tagline}</p>
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 pop" style={{ animationDelay: '1.2s' }}>
          {Object.entries(c).map(([k, v]) => (
            <div key={k} className="card w-16 sm:w-24 py-3">
              <div className="display text-2xl sm:text-4xl tabular-nums">{String(v).padStart(2, '0')}</div>
              <div className="text-xs text-[var(--teal)]">{k}</div>
            </div>
          ))}
        </div>
        <a href="#register" className={BTN}>Register now</a>
      </div>
    </header>
  )
}

function Marquee() {
  const w = ['Hackathon', 'Robo Wars', 'Live music', 'Esports', 'Bhangra', 'Workshops', 'DJ night']
  return (
    <div className="overflow-hidden bg-[var(--gold)] text-[var(--ink)] py-3" aria-hidden="true">
      <div className="marquee display text-xl">{[...w, ...w, ...w, ...w].map((x, i) => <span key={i} className="px-6">{x} ✦</span>)}</div>
    </div>
  )
}

const Sec = ({ id, title, sub, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 py-20 reveal">
    <h2 className="display text-4xl sm:text-6xl text-center text-[var(--gold)]">{title}</h2>
    <p className="text-center opacity-70 mt-3 mb-10">{sub}</p>
    {children}
  </section>
)

function Schedule({ open }) {
  const [day, setDay] = useState(1)
  const [cat, setCat] = useState('All')
  const list = EVENTS.filter(e => e.day === day && (cat === 'All' || e.cat === cat))
  return (
    <Sec id="schedule" title="Schedule" sub="Pick a day, filter by type, tap an event for details.">
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3].map(d => <button key={d} onClick={() => setDay(d)} className={`px-5 py-2 rounded-full border ${day === d ? 'bg-[var(--gold)] text-[var(--ink)] border-[var(--gold)]' : 'border-white/30'}`}>Day {d}</button>)}
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['All', ...CATS.map(c => c.name)].map(c => <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 text-sm rounded-full ${cat === c ? 'bg-[var(--teal)] text-[var(--ink)]' : 'bg-white/10'}`}>{c}</button>)}
      </div>
      <div className="space-y-3 max-w-3xl mx-auto">
        {list.length ? list.map((e, i) => (
          <button key={e.id} onClick={() => open(e)} style={{ animationDelay: `${i * 70}ms` }} className="card pop w-full text-left p-4 flex gap-4 items-center">
            <span className="display text-[var(--gold)] text-xl w-16 shrink-0">{e.time}</span>
            <span className="flex-1"><b>{e.title}</b><span className="block text-sm opacity-60">{e.venue}</span></span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10">{e.cat}</span>
          </button>
        )) : <p className="text-center opacity-60">No {cat} events on day {day}. Try another filter.</p>}
      </div>
    </Sec>
  )
}

function Activities() {
  return (
    <Sec id="activities" title="Activities" sub="Four tracks. Join as many as the timetable allows.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATS.map(c => (
          <div key={c.name} className="card p-6">
            <div className="text-4xl mb-3">{c.icon}</div>
            <h3 className="display text-2xl text-[var(--gold)]">{c.name}</h3>
            <p className="opacity-70 mt-2">{c.desc}</p>
            <p className="text-sm text-[var(--teal)] mt-3">{EVENTS.filter(e => e.cat === c.name).length} events</p>
          </div>
        ))}
      </div>
    </Sec>
  )
}

function Venue() {
  return (
    <Sec id="venue" title="Venue" sub={`${EVENT.venue}, ${EVENT.address}`}>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 400 260" className="card w-full p-2" role="img" aria-label="Campus map with main stage marked">
          <path d="M0 210 Q100 150 200 195 T400 150" stroke="var(--teal)" strokeWidth="3" fill="none" strokeDasharray="8 6" />
          <rect x="40" y="40" width="100" height="65" rx="8" fill="var(--red)" opacity=".5" />
          <rect x="250" y="40" width="110" height="70" rx="8" fill="var(--gold)" opacity=".45" />
          <circle cx="200" cy="130" r="8" fill="var(--gold)" />
          <circle className="ring" cx="200" cy="130" r="8" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <g fill="var(--cream)" fontSize="12"><text x="58" y="78">Tech Block</text><text x="262" y="80">Open Air Theatre</text><text x="165" y="162">Main Stage</text></g>
        </svg>
        <ul className="space-y-3">
          {[['🚆', 'Nearest railway station is a short taxi or bus ride away'], ['🅿️', 'Free parking at Gate 2'], ['🍛', 'Food court open 8 AM to 10 PM'], ['🏠', 'Hostel stay for outstation teams']].map(([i, t]) => <li key={t} className="card p-4 flex gap-3"><span>{i}</span>{t}</li>)}
        </ul>
      </div>
    </Sec>
  )
}

function Register() {
  const empty = { name: '', email: '', phone: '', college: '', event: EVENTS[0].title }
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const [ok, setOk] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const x = {}
    if (f.name.trim().length < 3) x.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email like name@college.edu'
    if (!/^[6-9]\d{9}$/.test(f.phone)) x.phone = 'Enter a 10-digit mobile number'
    if (!f.college.trim()) x.college = 'Enter your college name'
    setErr(x)
    if (Object.keys(x).length) return
    try {
      const r = JSON.parse(localStorage.getItem('regs') || '[]')
      r.push({ ...f, at: Date.now() })
      localStorage.setItem('regs', JSON.stringify(r))
    } catch { /* storage blocked: still show success */ }
    setOk(true)
  }
  const fields = [['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Mobile number', 'tel'], ['college', 'College', 'text']]
  const inp = 'w-full mt-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20'
  return (
    <Sec id="register" title="Register" sub="Takes one minute. You will get a confirmation on screen.">
      {ok ? (
        <div className="card pop max-w-xl mx-auto p-8 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="display text-2xl text-[var(--gold)]">You are in, {f.name.split(' ')[0]}!</h3>
          <p className="opacity-70 my-3">Registered for {f.event}. Carry your college ID on the day.</p>
          <button className={BTN} onClick={() => { setF(empty); setOk(false) }}>Register another person</button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="card max-w-xl mx-auto p-6 space-y-4">
          {fields.map(([k, l, t]) => (
            <label key={k} className="block">{l}
              <input type={t} value={f[k]} onChange={set(k)} className={inp} aria-invalid={!!err[k]} />
              {err[k] && <span className="text-sm text-[var(--red)]">{err[k]}</span>}
            </label>
          ))}
          <label className="block">Main event
            <select value={f.event} onChange={set('event')} className={inp}>
              {EVENTS.map(e => <option key={e.id} value={e.title} className="text-black">{e.title}</option>)}
            </select>
          </label>
          <button className={BTN + ' w-full'}>Complete registration</button>
        </form>
      )}
    </Sec>
  )
}

function Faq() {
  const [o, setO] = useState(0)
  return (
    <Sec id="faq" title="FAQ" sub="Quick answers before you ask.">
      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="card">
            <button className="w-full text-left p-4 font-semibold flex justify-between" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>
              {q}<span className="transition-transform" style={{ transform: o === i ? 'rotate(45deg)' : 'none' }}>＋</span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${o === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden px-4 opacity-80"><span className="block pb-4">{a}</span></p>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  )
}

function Modal({ e, close }) {
  if (!e) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={close} role="dialog" aria-modal="true" aria-label={e.title}>
      <div className="card pop bg-[var(--ink)] max-w-md w-full p-6" onClick={x => x.stopPropagation()}>
        <p className="text-sm text-[var(--teal)]">Day {e.day} · {e.time} · {e.venue}</p>
        <h3 className="display text-3xl text-[var(--gold)] my-2">{e.title}</h3>
        <p className="opacity-80">{e.desc}</p>
        <p className="mt-3">Prize pool: <b>{e.prize}</b></p>
        <div className="flex gap-3 mt-6">
          <a href="#register" onClick={close} className={BTN}>Register</a>
          <button onClick={close} className="px-5 py-3 rounded-full border border-white/30">Close</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [sel, setSel] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const k = e => e.key === 'Escape' && setSel(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <>
      <Nav /><Hero /><Marquee />
      <main><Schedule open={setSel} /><Activities /><Venue /><Register /><Faq /></main>
      <footer className="text-center py-10 border-t border-white/10 opacity-70">{EVENT.name}{EVENT.year} · {EVENT.dates} · {EVENT.address}</footer>
      <Modal e={sel} close={() => setSel(null)} />
    </>
  )
}