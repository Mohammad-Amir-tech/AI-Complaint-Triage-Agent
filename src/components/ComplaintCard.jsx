import { MapPin, Building2, Clock, ChevronRight, AlertTriangle, TrendingUp, Minus, ArrowDown } from 'lucide-react'

const PRIORITY_STYLES = {
  Critical: {
    badge: 'bg-priority-critical/10 text-priority-critical border-priority-critical/30',
    dot: 'bg-priority-critical',
    icon: AlertTriangle,
    ring: 'ring-priority-critical/20',
  },
  High: {
    badge: 'bg-priority-high/10 text-priority-high border-priority-high/30',
    dot: 'bg-priority-high',
    icon: TrendingUp,
    ring: 'ring-priority-high/15',
  },
  Medium: {
    badge: 'bg-priority-medium/10 text-priority-medium border-priority-medium/30',
    dot: 'bg-priority-medium',
    icon: Minus,
    ring: 'ring-priority-medium/15',
  },
  Low: {
    badge: 'bg-priority-low/10 text-priority-low border-priority-low/30',
    dot: 'bg-priority-low',
    icon: ArrowDown,
    ring: 'ring-priority-low/15',
  },
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function ComplaintCard({ complaint, onView }) {
  const style = PRIORITY_STYLES[complaint.priority] || PRIORITY_STYLES.Low
  const Icon = style.icon

  return (
    <button
      onClick={() => onView(complaint)}
      className={`animate-rise text-left w-full bg-white border border-navy-900/10 rounded-lg shadow-card hover:shadow-cardHover hover:border-navy-900/20 transition-all p-5 flex flex-col gap-3.5 group`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] text-navy-900/40 tracking-wide">{complaint.caseId}</p>
          <h3 className="font-serif text-base text-navy-900 mt-0.5 leading-snug">{complaint.name}</h3>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
          <Icon size={11} />
          {complaint.priority}
        </span>
      </div>

      <p className="text-sm text-navy-900/70 line-clamp-2 leading-relaxed">{complaint.description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-navy-900/55">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {complaint.district}
        </span>
        <span className="flex items-center gap-1">
          <Building2 size={12} /> {complaint.department}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-navy-900/8">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-navy-700 bg-navy-900/5 px-2 py-1 rounded">
          {complaint.category}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-navy-900/45">
            <Clock size={11} /> {timeAgo(complaint.createdAt)}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-medium text-navy-700 group-hover:gap-1.5 transition-all">
            View <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </button>
  )
}
