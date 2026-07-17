import { useEffect, useMemo, useState } from 'react'
import { Landmark, Search, SlidersHorizontal, Inbox, ShieldAlert, TrendingUp, Minus, ArrowDown, ClipboardList } from 'lucide-react'
import ComplaintForm from './components/ComplaintForm.jsx'
import ComplaintCard from './components/ComplaintCard.jsx'
import ComplaintDetail from './components/ComplaintDetail.jsx'
import { analyzeComplaint } from './utils/aiAnalyzer.js'
import { loadComplaints, saveComplaints, generateCaseId } from './utils/storage.js'

const PRIORITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 }

export default function App() {
  const [complaints, setComplaints] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    setComplaints(loadComplaints())
  }, [])

  function persist(next) {
    setComplaints(next)
    saveComplaints(next)
  }

  async function handleSubmit(form) {
    setIsAnalyzing(true)
    // Simulate AI processing latency for a realistic "analyzing" experience
    await new Promise((r) => setTimeout(r, 1100))

    const analysis = analyzeComplaint(form)
    const record = {
      id: crypto.randomUUID(),
      caseId: generateCaseId(complaints.length),
      name: form.name.trim(),
      district: form.district,
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
      ...analysis,
    }

    const next = [record, ...complaints]
    persist(next)
    setIsAnalyzing(false)
    setSelected(record)
  }

  function handleDelete(id) {
    persist(complaints.filter((c) => c.id !== id))
    setSelected(null)
  }

  const categories = useMemo(() => {
    const set = new Set(complaints.map((c) => c.category))
    return ['All', ...Array.from(set)]
  }, [complaints])

  const filtered = useMemo(() => {
    return complaints
      .filter((c) => (priorityFilter === 'All' ? true : c.priority === priorityFilter))
      .filter((c) => (categoryFilter === 'All' ? true : c.category === categoryFilter))
      .filter((c) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return (
          c.name.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.caseId.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || new Date(b.createdAt) - new Date(a.createdAt))
  }, [complaints, search, priorityFilter, categoryFilter])

  const stats = useMemo(() => {
    const total = complaints.length
    const critical = complaints.filter((c) => c.priority === 'Critical').length
    const high = complaints.filter((c) => c.priority === 'High').length
    const medium = complaints.filter((c) => c.priority === 'Medium').length
    const low = complaints.filter((c) => c.priority === 'Low').length
    return { total, critical, high, medium, low }
  }, [complaints])

  return (
    <div className="min-h-screen">
      {/* Header / letterhead */}
      <header className="bg-navy-900 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-seal border border-gold-400/50 flex items-center justify-center shrink-0">
            <Landmark size={22} className="text-gold-400" />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl text-white tracking-tight">AI Complaint Triage Agent</h1>
            <p className="text-xs sm:text-sm text-parchment-200/60 mt-0.5">Automated Grievance Classification &amp; Routing System · District Administration</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Left: form */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ComplaintForm onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
        </div>

        {/* Right: dashboard */}
        <div className="space-y-6 min-w-0">
          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <StatCard label="Total Cases" value={stats.total} icon={ClipboardList} accent="text-navy-800" />
            <StatCard label="Critical" value={stats.critical} icon={ShieldAlert} accent="text-priority-critical" />
            <StatCard label="High" value={stats.high} icon={TrendingUp} accent="text-priority-high" />
            <StatCard label="Medium" value={stats.medium} icon={Minus} accent="text-priority-medium" />
            <StatCard label="Low" value={stats.low} icon={ArrowDown} accent="text-priority-low" />
          </div>

          {/* Filters */}
          <div className="bg-white border border-navy-900/10 rounded-lg shadow-card p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-900/35" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, district, case ID, or keyword…"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-navy-900/15 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-navy-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-navy-900/40 hidden sm:block" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-sm rounded-md border border-navy-900/15 px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              >
                {['All', 'Critical', 'High', 'Medium', 'Low'].map((p) => (
                  <option key={p} value={p}>{p === 'All' ? 'All priorities' : p}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-sm rounded-md border border-navy-900/15 px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/40 max-w-[160px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-dashed border-navy-900/20 rounded-lg py-16 flex flex-col items-center justify-center text-center px-6">
              <Inbox size={30} className="text-navy-900/25 mb-3" />
              <p className="text-navy-900/60 text-sm font-medium">
                {complaints.length === 0 ? 'No complaints filed yet' : 'No complaints match your filters'}
              </p>
              <p className="text-navy-900/40 text-xs mt-1">
                {complaints.length === 0 ? 'Submit a complaint using the form to see AI triage in action.' : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((c) => (
                <ComplaintCard key={c.id} complaint={c} onView={setSelected} />
              ))}
            </div>
          )}
        </div>
      </main>

      <ComplaintDetail complaint={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
    </div>
  )
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="bg-white border border-navy-900/10 rounded-lg shadow-card px-4 py-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-navy-900/45 uppercase tracking-wide">{label}</p>
        <Icon size={14} className={accent} />
      </div>
      <p className="font-serif text-2xl text-navy-900 mt-1">{value}</p>
    </div>
  )
}
