import { X, MapPin, Building2, Clock, User, ListChecks, FileSignature, Gauge, Trash2 } from 'lucide-react'

const PRIORITY_COLORS = {
  Critical: 'text-priority-critical bg-priority-critical/10 border-priority-critical/30',
  High: 'text-priority-high bg-priority-high/10 border-priority-high/30',
  Medium: 'text-priority-medium bg-priority-medium/10 border-priority-medium/30',
  Low: 'text-priority-low bg-priority-low/10 border-priority-low/30',
}

export default function ComplaintDetail({ complaint, onClose, onDelete }) {
  if (!complaint) return null
  const priorityClass = PRIORITY_COLORS[complaint.priority] || PRIORITY_COLORS.Low

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-navy-950/60 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto">
      <div className="bg-parchment-50 w-full sm:max-w-2xl sm:rounded-lg shadow-2xl border border-navy-900/10 my-0 sm:my-auto max-h-full sm:max-h-[90vh] flex flex-col animate-rise">
        {/* Letterhead */}
        <div className="bg-navy-900 px-6 py-5 sm:rounded-t-lg flex items-start justify-between shrink-0">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gold-400/90 font-semibold">Grievance Redressal Cell</p>
            <h2 className="font-serif text-xl text-white mt-1">Case Report</h2>
            <p className="font-mono text-xs text-parchment-200/60 mt-1">{complaint.caseId}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-thin px-6 py-5 space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${priorityClass}`}>
              <Gauge size={13} /> {complaint.priority} Priority
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-navy-900/5 text-navy-800 border border-navy-900/10">
              {complaint.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-navy-900/50">
              Confidence: {complaint.confidence}%
            </span>
          </div>

          {/* Complainant details */}
          <div className="grid grid-cols-2 gap-3 bg-white border border-navy-900/10 rounded-md p-4">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-navy-900/40 font-semibold flex items-center gap-1"><User size={11}/> Complainant</p>
              <p className="text-sm text-navy-900 mt-1 font-medium">{complaint.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-navy-900/40 font-semibold flex items-center gap-1"><MapPin size={11}/> District</p>
              <p className="text-sm text-navy-900 mt-1 font-medium">{complaint.district}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-wide text-navy-900/40 font-semibold flex items-center gap-1"><Building2 size={11}/> Assigned Department</p>
              <p className="text-sm text-navy-900 mt-1 font-medium">{complaint.department}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-navy-900/40 font-semibold flex items-center gap-1"><Clock size={11}/> Est. Resolution Time</p>
              <p className="text-sm text-navy-900 mt-1 font-medium">{complaint.resolutionTime}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-navy-900/40 font-semibold">Filed On</p>
              <p className="text-sm text-navy-900 mt-1 font-medium">{new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Original description */}
          <div>
            <p className="text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">Original Complaint</p>
            <p className="text-sm text-navy-900/75 leading-relaxed bg-white border border-navy-900/10 rounded-md p-4">
              {complaint.description}
            </p>
          </div>

          {/* Executive summary */}
          <div>
            <p className="text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <FileSignature size={13} /> AI Executive Summary
            </p>
            <p className="text-sm text-navy-900/80 leading-relaxed bg-gold-500/5 border border-gold-500/25 rounded-md p-4">
              {complaint.executiveSummary}
            </p>
          </div>

          {/* Action plan */}
          <div>
            <p className="text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <ListChecks size={13} /> Recommended Action Plan
            </p>
            <ol className="bg-white border border-navy-900/10 rounded-md divide-y divide-navy-900/8">
              {complaint.actionPlan.map((step, i) => (
                <li key={i} className="flex gap-3 px-4 py-3 text-sm text-navy-900/80">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-navy-900 text-white text-[11px] font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-t border-navy-900/10 px-6 py-4 flex items-center justify-between shrink-0 bg-parchment-50 sm:rounded-b-lg">
          <button
            onClick={() => onDelete(complaint.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-priority-critical/80 hover:text-priority-critical transition-colors"
          >
            <Trash2 size={13} /> Delete case
          </button>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-md px-4 py-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
