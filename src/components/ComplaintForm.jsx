import { useState } from 'react'
import { User, MapPin, FileText, Sparkles, Loader2, Send } from 'lucide-react'

const DISTRICTS = [
  'Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Ghaziabad',
  'Noida', 'Bareilly', 'Gorakhpur', 'Jhansi', 'Aligarh', 'Moradabad', 'Other',
]

const initialState = { name: '', district: '', description: '' }

export default function ComplaintForm({ onSubmit, isAnalyzing }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Complainant name is required'
    if (!form.district.trim()) next.district = 'District is required'
    if (!form.description.trim() || form.description.trim().length < 15) {
      next.description = 'Please provide at least 15 characters describing the issue'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    setForm(initialState)
  }

  return (
    <div className="bg-white border border-navy-900/10 rounded-lg shadow-card">
      <div className="px-6 py-5 border-b border-navy-900/10 bg-navy-900 rounded-t-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center shrink-0">
            <FileText size={17} className="text-gold-400" />
          </div>
          <div>
            <h2 className="font-serif text-lg text-white leading-tight">File a Grievance</h2>
            <p className="text-xs text-parchment-200/70 mt-0.5">Form GRV-01 · Public Grievance Registration</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">
            <User size={13} /> Complainant Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition-shadow ${
              errors.name ? 'border-priority-critical/60' : 'border-navy-900/15 focus:border-navy-700'
            }`}
          />
          {errors.name && <p className="text-xs text-priority-critical mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">
            <MapPin size={13} /> District
          </label>
          <select
            value={form.district}
            onChange={(e) => handleChange('district', e.target.value)}
            className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition-shadow ${
              errors.district ? 'border-priority-critical/60' : 'border-navy-900/15 focus:border-navy-700'
            }`}
          >
            <option value="">Select district</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.district && <p className="text-xs text-priority-critical mt-1">{errors.district}</p>}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">
            <FileText size={13} /> Complaint Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe the issue in detail — what happened, where, and since when..."
            rows={5}
            className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition-shadow resize-none ${
              errors.description ? 'border-priority-critical/60' : 'border-navy-900/15 focus:border-navy-700'
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.description ? (
              <p className="text-xs text-priority-critical">{errors.description}</p>
            ) : (
              <p className="text-xs text-navy-900/40">Minimum 15 characters</p>
            )}
            <p className="text-xs text-navy-900/40">{form.description.length} chars</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-md py-3 transition-colors"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing complaint…
            </>
          ) : (
            <>
              <Sparkles size={16} className="text-gold-400" />
              Analyze &amp; Submit
              <Send size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
