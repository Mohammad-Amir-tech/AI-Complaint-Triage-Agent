# Screenshot Checklist — Before Submission

Capture these in order. Use browser zoom at 100% and a clean window (no unrelated tabs/extensions visible) for a professional look.

- [ ] **Empty dashboard** — fresh app load, form visible, dashboard showing the "No complaints filed yet" empty state.
- [ ] **Filled-in form** — all three fields (name, district, description) completed with a realistic sample complaint, right before submitting.
- [ ] **Analyzing state** — the submit button showing the "Analyzing…" spinner (may need a quick screenshot reflex or screen recording frame grab).
- [ ] **Case report modal** — the full generated report for one complaint: priority badge, category, confidence %, department, executive summary, and the numbered action plan.
- [ ] **Dashboard with multiple complaints** — at least 4–5 complaints across different categories/priorities, so the colored priority badges and stats strip are visible together.
- [ ] **Search in action** — search bar with a query typed in and matching results shown.
- [ ] **Filters in action** — priority filter and/or category filter dropdown selected, showing a filtered card set.
- [ ] **Priority badge close-up** — a zoomed-in or cropped shot clearly showing all four badge colors (Critical/High/Medium/Low) side by side if possible.
- [ ] **Mobile/responsive view** — browser resized to ~375px width (or DevTools device toolbar) showing the stacked, single-column layout.
- [ ] **localStorage evidence** — DevTools → Application tab → Local Storage → `act_complaints_v1` key expanded, showing stored JSON.
- [ ] **Deployed live URL** — browser address bar visible showing the deployed link (Vercel/Netlify), not `localhost`.
- [ ] **Short demo recording** (~1–2 min) — file a complaint end-to-end, show the analysis result, show it on the dashboard, refresh the page to prove persistence.

## Tips for judging-quality captures

- Use realistic, varied sample complaints (different districts, categories, and urgency levels) so the AI analysis differences are obvious across screenshots.
- Keep at least one **Critical** and one **Low** priority example visible somewhere in your evidence so judges can see the range of outputs.
- If recording a video, keep it under 2 minutes and lead with the problem statement in one sentence before demoing.
- Export screenshots as `.png` for clarity (avoid heavily compressed `.jpg`).
