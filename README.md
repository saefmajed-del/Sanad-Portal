# سـند — Sanad

**Saudi Internal Audit AI Assistant · First Module of the راصد · RASSED Platform**

Built by **Savvy World × Raqeem for Smart Solutions** for the Royal Commission for Jubail and Yanbu's **Internal Audit Day · 2026-05-20**.

---

## What is this?

**Sanad** is an AI internal audit assistant designed *with* auditors, not against them. It reads internal policies in Arabic, compares them against COSO 2013, IIA Standards, and Saudi PDPL, then surfaces governance gaps with precise citations.

This repository contains:
- The live **product demo** (Vite + React + TypeScript)
- The **90-Second Customer Journey** experience (`From Signal to Governance`)
- The **booth design** spec for the Internal Audit Day expo
- The **executive brief** (printable A4 PDF)
- The **pitch script**, the **email drafts**, the **build report**

It is part of a larger vision: راصد · RASSED — a Saudi platform for governance intelligence combining AI, robotics (PUDU), and device governance (SOTI).

---

## Run locally

```bash
npm install
npm run dev          # → http://localhost:5173
npx tsc --noEmit     # type check
```

---

## Print the brief / open the booth view

Open in any browser:
- `BRIEF.html` — 2-page executive brief (Ctrl+P → Save as PDF)
- `BOOTH.html` — booth floor plan + zone breakdown

---

## Repository structure

```
.
├── src/
│   ├── App.tsx               Main app shell — Hero · Demo · HowItWorks · Journey · Roadmap · Launch · Footer
│   ├── journey.tsx           90-Second Customer Journey + 6 SVG visualizations
│   ├── data.ts               Sample policy, findings, recommendations, journey steps
│   ├── index.css             Tailwind + custom utilities
│   └── main.tsx              Entry
├── BRIEF.html                2-page executive brief (printable)
├── BOOTH.html                Booth design — visual page
├── BOOTH-DESIGN.md           Booth design — full text spec
├── PITCH-SCRIPT.md           60-second pitch + Q&A prep
├── EMAIL-RAQEEM.md           Email drafts for the Raqeem stakeholder
├── REPORT.md                 English build report for human team review
└── capture-screenshots.mjs   Playwright script for 4K screenshots
```

---

## The 90-Second Journey · "From Signal to Governance"

| Act | Beat | What happens |
|---|---|---|
| Discovery | Governance Gap Surfaces | Sanad finds a missing policy clause + finance flags the transaction that exploits it |
| Discovery | Risk Profile Snapshot | Severity scored, escalated to the audit manager |
| Verification | Chain of Custody (PUDU) | Sealed dossier moves between departments with tamper-proof Hash |
| Verification | Device Fleet Integrity (SOTI) | 16 devices checked — 14 compliant, 1 alerted, 1 quarantined |
| Governance | Human Auditor Decides | Auditor reviews evidence and signs off — AI cannot proceed without approval |
| Governance | Policy Amended · Loop Closed | The specific policy clause is updated, the loophole closes, monitoring continues |

---

## Stack

- **Vite** 8 · **React** 19 · **TypeScript** strict
- **Tailwind CSS** 3 with custom navy + warm gold palette
- **Framer Motion** for cinematic transitions
- **lucide-react** for clean line icons (no emojis)
- **Playwright** for screenshot automation
- Arabic-first typography: **IBM Plex Sans Arabic** + **Noto Naskh Arabic** + **Inter** + **JetBrains Mono**

---

## License

Proprietary · Savvy World 2026
