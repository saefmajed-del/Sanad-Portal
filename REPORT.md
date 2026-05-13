# SANAD — Internal Audit Day Edition
## Build Report for Human Team Review

**Author:** Claude (ASUS-Claude, Sonnet for SM/Savvy World)
**Date:** 2026-05-13
**Status:** Working prototype running locally at `http://localhost:5175/`
**Source:** `C:\Users\saefm\Dev\sanad\`
**Event Target:** 2026-05-20 (Internal Audit Day · 7 days out)

---

## 1. Executive Summary

We were briefed by Rami (SM) that **Raqeem** had contacted Savvy World to develop an AI solution + humanoid robot integration for the Royal Commission's **Internal Audit Day** on May 20, 2026. Across this session, the initial framing was challenged twice and corrected, and a working prototype was delivered.

**What was built:**
- A single-page Vite + React + TypeScript + Tailwind + Framer Motion application titled **سـند (Sanad)** — "AI Internal Audit Assistant"
- **Five focused sections:** Hero, Live Demo (working analyzer), How-It-Works, Launch Moment, Footer
- Premium dark navy + warm gold palette (deliberately NOT Palantir-cyber, NOT cartoonish)
- Arabic-first design with mixed RTL/LTR typography
- Working demo analyzes a sample procurement policy and returns 6 realistic findings + recommendations with citations to COSO, IIA, PDPL standards

> **Note on scope:** An earlier draft of this build included a 90-Second Customer Journey section based on a parallel brief from SM's human team. That section has been **archived** at SM's direction (`src/journey.tsx.archived`). SM is exploring the human-team concept in a separate project to compare approaches. The final Sanad build is intentionally narrow: one product, one demo, one launch.

**What is still pending validation from Raqeem:**
1. Confirmation that the calling company is in fact **Rqeem for Smart Solutions** (RCJY-owned tech arm) and not one of three other Saudi companies with similar names
2. Confirmation that the event is a launch-within-awareness-month (our working hypothesis) vs. pure showcase, pure tribute, or vendor pitch
3. Sample real policy documents from RCJY to replace mocked content
4. Audience composition (internal only vs. mixed external) — drives booth scale and tone

---

## 2. Project Context

### 2.1 The Brief (as relayed by SM)

> The Royal Commission's tech-arm contacted me. They have an event called Internal Audit Day next Wednesday (2026-05-20). They want us to deliver an AI solution that makes internal audit fully or mostly AI-driven, AND they want a humanoid robot in the night. I'm not sure where to fit the robot, or whether to show this as a dashboard, customer journey video, or something else. Be a full marketing team.

### 2.2 Why this matters

- **Stakeholder visibility:** Royal Commission (RCJY) is a major Saudi government client. Savvy World's reputation rides on this.
- **Tight timeline:** 7 days to delivery.
- **Hardware involvement:** Live G1 humanoid robot deployment carries operational risk (motion control, motion-gate safety rules).
- **Brand risk:** SM has previously been let down by AI tooling in stakeholder-facing demos. Zero tolerance for "wow"-without-substance.

### 2.3 What we already had on the shelf at Savvy World

- **Savvy Voice POC** — Arabic AI agent (Claude Sonnet 4.6 + RAG) with custom voice (rami_ivc_v3) — built 2026-05-10 for selling G1 to Saudi customers.
- **3LLAM (G1 unit)** — third dedicated G1 robot already configured with ALLaM-7B onboard and `g1_safe_motions` HTTP gateway at `127.0.0.1:8765`.
- **Super-savvy** — local LLM fallback (Ollama + Qwen2.5) on ASUS for offline mode.

These three assets shape what's realistic in 7 days: we are NOT building Arabic AI from scratch; we are RE-PURPOSING it for the audit use case.

---

## 3. Client Intelligence — Who is Raqeem?

Web research conducted 2026-05-13 confirmed:

**Rqeem for Smart Solutions** (`https://rqeem.sa`)

| Attribute | Detail |
|---|---|
| Identity | Wholly owned by the **Royal Commission for Jubail and Yanbu (RCJY)** |
| Founded | Mid-2021 |
| Self-positioning | "Technical arm and digital enabler" supporting industrial investors |
| HQ | Riyadh (Al-Hadaa, King Khaled St) + branches in Jubail, Yanbu, Jazan |
| Contact | info@rqeem.sa · +966 11 264 9090 · @rqeemsa |
| End customers | Industrial investors across 4 RCJY cities: Jubail, Yanbu, Ras Al-Khair (mining), Jazan |
| Services portfolio | Digital maturity assessments, industrial cybersecurity, consultancy, smart-cities platforms, Industry 4.0 / 4IR, training (Cooperative, Employment, Tamheer) |
| Strategic partners | Google Cloud · Trend Micro · Disrupt-X (ALEF IoT, Oct 2023) |
| Recent milestone | Carrier Service Provider License (2024) |

**Key strategic implication:** Raqeem is NOT an audit firm. They are a sophisticated B2B digital-transformation buyer. They contacted Savvy because their existing partner stack (Google, Trend Micro, IoT vendors) **lacks three things**: (1) Saudi-Arabic AI agent, (2) embodied/humanoid robot presence, (3) 100% Saudi IP.

Three other unrelated Saudi companies use the name "Raqeem" — a machinery valuation firm, an accounting/audit firm (raqeem-ksa.com), and a Lean healthcare product. The RCJY tech-arm is the most likely match given SM's description ("تبع الهيئة الملكية"), but this **should be confirmed by SM before any printed material goes out.**

---

## 4. Event Understanding — Iterative Refinement

The event's true nature went through three interpretations during this session. Documenting all three because each one shifts the deliverable significantly.

### Interpretation 1 — "Tech Expo Booth" (initial, rejected)

**Assumed:** RCJY's auditors are throwing a tech expo and want a vendor showcase.
**Built artifact:** A dashboard with a cinematic 90-second journey, three "professionals" sidebar, dark Palantir-cyan palette, multiple visuals.
**Why rejected by SM:** "ما عجبني ولا شي" — the framing missed the actual client. Also: the language and visual style were wrong for the audience (gov officials, not Palantir users).

### Interpretation 2 — "Industry 4.0 Co-Innovation Pitch" (rejected after deeper research)

**Assumed:** Raqeem wants a white-label AI audit product to sell to industrial investors in Jubail/Yanbu factories.
**Why partially wrong:** SM pointed out that no previous Internal Audit Day events had been organized by Raqeem on social media — suggesting our understanding might be off entirely. Research confirmed: **May is International Internal Audit Awareness Month (IIA Global)**. Saudi entities mirror this — GCA held its 5th forum on May 12, 2024; SAIA held a 550-person program May 11, 2025; Ministry of Education activates the month in May. So **the event is most likely a tribute/awareness day, not an industrial pitch.**

### Interpretation 3 — "Launch Moment within Awareness Month" (current working hypothesis)

SM pushed further: *if it were purely tribute, why would they ask for a real AI solution?* This sharpened the model:

> The event = a **launch moment** for a real AI tool, wrapped in the rhetoric and symbolism of **Internal Audit Awareness Month**.

**This is what the build is designed for:**
- The product (سند / Sanad) is **real and demonstrable today**
- Its unveiling on May 20 is the **symbolic gift to the auditors** during their month
- The robot becomes the **revealer**, not the centerpiece
- Tone: respect first (tribute), capability second (live demo), vision third (90-second journey)

**Important nuance:** The reframe is still a working hypothesis. We have one clarifying question pending to Raqeem (see §10).

---

## 5. Final Strategic Positioning

### One-liner
> **"In your day, we hand you a new colleague — not a replacement."**
> "في يومكم، نُهديكم زميلاً جديداً — لا بديلاً."

### Three pillars

| Pillar | Translation | How it shows up in the build |
|---|---|---|
| **Tribute** | Honor the profession of internal audit | Hero quote, tribute eyebrow chip, footer dedication |
| **Capability** | One narrow but real working tool | Live demo: policy → 6 findings + recs in 3 minutes |
| **Vision** | Bigger picture Raqeem can grow into | 90-Second Customer Journey + Final Screen |

### Why these three together

- Tribute alone = nothing to sell.
- Capability alone = disrespectful intrusion into a celebratory day.
- Vision alone = vaporware concern, especially after SM's prior stakeholder burn.

Together they form: **"We celebrate you with a real gift you can use Monday, inside a vision you can grow with for 2 years."**

---

## 6. Product Delivered — "سـند" (Sanad)

### 6.1 Name & meaning

**سند (Sanad)** — Arabic for "support / backing / documentary evidence." In Islamic and audit terminology, *sanad* specifically refers to a chain of supporting evidence. It conveys "I support you, I'm your backbone" — perfectly aligned with the positioning.

Alternative names considered: ضبط (Dabt — control), المُدقّق (Mudaqqiq — the auditor), فاحص (Fahis — examiner), تثبّت (Tathabbut — confirmation). Sanad chosen for warmth + audit-domain authenticity.

### 6.2 Tagline

**Arabic:** «مساعدك في كل مراجعة، ولن يحل محلك أبداً»
**English:** "Your companion in every audit. Never your replacement."

### 6.3 Co-branding

Header treats Sanad as a joint product: **RAQEEM × SAVVY WORLD**. This deliberately positions Raqeem as the primary owner (it's their event, their audience, their portfolio). Savvy is "the technology and robot partner."

---

## 7. Technical Implementation

### 7.1 Stack

| Layer | Tool | Version |
|---|---|---|
| Build tool | Vite | 8.0.12 |
| Framework | React | 19 (TypeScript) |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 12.x |
| Icons | lucide-react | latest (no emojis) |
| Fonts | IBM Plex Sans Arabic + Noto Naskh Arabic + Inter + JetBrains Mono | Google Fonts |

Total install: ~145 npm packages, ~110 MB node_modules. Production bundle size estimate: under 200 KB gzipped.

### 7.2 File inventory

```
C:\Users\saefm\Dev\sanad\
├── tailwind.config.js          (theme colors, fonts, animations)
├── postcss.config.js           (Tailwind + autoprefixer)
├── vite.config.ts              (Vite defaults)
├── tsconfig.json               (strict TS)
├── index.html                  (RTL Arabic root)
├── public/                     (static assets)
└── src/
    ├── main.tsx                (entry)
    ├── index.css               (Tailwind + custom utilities, ~150 lines)
    ├── data.ts                 (sample policy, findings, recs, ~340 lines)
    ├── journey.tsx.archived    (90-Second Journey — ARCHIVED per SM, not compiled)
    └── App.tsx                 (shell + Hero + Demo + How + Launch + Footer, ~720 lines)
```

### 7.3 What works today (verified)

- ✅ TypeScript compiles clean with strict mode (`npx tsc --noEmit` passes)
- ✅ Dev server runs at `http://localhost:5175/` (Vite picked port 5175 because 5173/5174 were occupied by older builds)
- ✅ Demo analyzer animates through 5 phases and reveals real findings/recommendations
- ✅ Launch countdown ticks live to 2026-05-20 09:00 +03:00
- ✅ Full RTL Arabic typography with Naskh serif for the product name

### 7.4 What does NOT work yet (deliberately)

- ❌ No real LLM API connection. The demo simulates AI analysis with timed phase reveals + pre-written findings. The findings ARE realistic and standards-aligned, but they are not produced by the model live.
  - **Why mocked:** (a) bandwidth/API uncertainty at the venue, (b) audit demos must be deterministic in front of stakeholders, (c) 7-day timeline.
  - **Wiring real API:** straightforward — replace `setTimeout` ladder with `fetch` to Claude API + parse JSON. Estimated 4 hours of work once we have a sample real policy.
- ❌ No export. The "Export Full Report" button is a visual element — wiring it to PDF generation needs a render path (estimate: 1 day with `react-pdf` or server-side).
- ❌ No robot integration. The G1 (3LLAM unit) integration is a separate workstream — the dashboard does not yet trigger robot speech or motion.

---

## 8. Design Rationale

### 8.1 Color palette decisions

| Color | Hex | Where used | Why |
|---|---|---|---|
| Deep navy | `#070B14` | Background | Gov-tech authority, premium feel, NOT cyber |
| Surface navy | `#101A2E` | Cards | Subtle depth |
| Warm gold | `#C4A572` | Primary accent | Saudi formal, tribute tone, not flashy |
| Saudi green | `#00C281` | Success states | National identity nod, distinct from gold |
| Amber | `#E8B339` | Warnings | Standard severity ladder |
| Red | `#E5526B` | High-severity findings | Soft enough not to feel alarming |
| Paper white | `#F5F2EB` | Primary text | Warm white, easier on eyes than pure white |

**Explicitly avoided:** Palantir cyan (#00D9FF), neon greens, gaming aesthetics, emoji-led icons. Lucide-react provides clean line icons throughout.

### 8.2 Typography decisions

- **Product name (سند):** Noto Naskh Arabic — classical Arabic calligraphy feel, lends gravitas
- **Arabic body:** IBM Plex Sans Arabic — modern, readable, designed for UI
- **English/Latin:** Inter — clean, neutral, premium UI standard
- **Numbers and code:** JetBrains Mono with tabular-nums for clean number alignment

### 8.3 Information architecture

The page order follows the **demo → vision → commitment** narrative arc:

1. **Hero** = tribute + name recognition (3 seconds to "I get what this is")
2. **Live Demo** = proof of capability TODAY (60 seconds of interaction)
3. **How Sanad Works** = mental model in 3 words (10 seconds)
4. **Launch Card** = commitment and date (10 seconds)
5. **Footer** = tribute echo, closes the emotional loop

The flow puts the **working demo immediately after the tribute** — so by the time the viewer hits "Launch," they've already touched something real and stopped doubting.

---

## 9. (Removed) — 90-Second Customer Journey

A 90-Second Customer Journey section was previously included based on a parallel brief from SM's human team. SM directed it to be **removed from this build** because the merged narrative was muddled — the human-team concept is being explored in a **separate project** for a clean A/B comparison.

The archived implementation remains on disk at `src/journey.tsx.archived` (not compiled, not imported) in case it's useful for reference later. The active Sanad build is intentionally narrow: tribute → working demo → 3-step mental model → launch.

---

## 10. Open Questions Pending Raqeem's Confirmation

Before any printed material, marketing assets, or final rehearsals, these need answers:

### 10.1 Identity verification
Is the calling company **Rqeem for Smart Solutions** (rqeem.sa, RCJY-owned tech arm)? Three other Saudi companies share variants of the name. **Confirm via the phone number SM was contacted from.**

### 10.2 Event nature
Three possible event types, each shifting the deliverable's tone by ~20%:
- **Launch Moment** (our working assumption): Sanad is unveiled formally on May 20 as Raqeem's gift to RCJY auditors
- **Pilot Day**: Auditors test Sanad live and provide feedback; less "launch" tone, more "co-creation"
- **Vendor Pitch Day**: We're competing against alternatives; more salesy, less tribute

**One-line question to send Raqeem:**
> "هل يوم ٢٠ مايو هو لحظة الإطلاق الرسمية لمبادرة المساعد الذكي، أم يوم تجربة قبل الإطلاق؟ وهل نستطيع الحصول على عينة سياسات داخلية من RCJY عشان النموذج يشتغل على بيانات حقيقية؟"

### 10.3 Audience composition
- All-internal RCJY/Raqeem? → Smaller booth, intimate engagement station, no external press materials
- Mixed (industrial investors, gov peers, press)? → Larger production, English handouts, photo opportunity infrastructure

### 10.4 Sample policy documents
Can Raqeem share 2–3 NDA-safe sample internal policies from RCJY (anonymized or redacted)? This is the highest-leverage ask — having Sanad analyze a *real* RCJY policy on stage is dramatically more impactful than analyzing our synthetic sample.

### 10.5 Robot integration scope
- Is the G1 (3LLAM unit) used only as a greeter/storyteller (audio + LED + 1 safe gesture), or expected to perform full live interactions?
- **Hard constraint:** All motion requires SM's 3-approval gate per session. No live motion at event without rehearsal-day approvals.

---

## 11. Recommended Next Steps

### Day 1 (today — 2026-05-13, remaining hours)
- [x] Build prototype ✓
- [ ] SM sends one-line clarifying question to Raqeem (§10.2)
- [ ] SM walks through the prototype and gives feedback on tone, copy, naming

### Day 2 (2026-05-14)
- [ ] Request sample policies from Raqeem
- [ ] Lock product name (confirm "سند" or pivot)
- [ ] Begin wiring Claude API to replace mocked analyzer
- [ ] Draft robot dialog script (greeter / storyteller / handoff)

### Day 3–4 (2026-05-15/16)
- [ ] Wire real Claude API + RAG over IIA/COSO/PDPL reference set
- [ ] Build PDF export
- [ ] Record hero film (90s narrated walkthrough — optional but high-impact)

### Day 5 (2026-05-17)
- [ ] First robot rehearsal (audio + LED + 1 pre-recorded safe gesture)
- [ ] Full end-to-end run through the booth flow

### Day 6 (2026-05-18)
- [ ] Dry run #1 — measure timing, fix friction points

### Day 7 (2026-05-19)
- [ ] On-site setup
- [ ] Dry run #2 — final motion approvals locked

### Day 8 (2026-05-20)
- [ ] Internal Audit Day — launch

---

## 12. Risks and Mitigations

| Risk | Likelihood | Mitigation in place |
|---|---|---|
| Identity mismatch (wrong Raqeem) | Low–Med | One verification call before any printed material |
| Event nature mis-framed | Med | Working hypothesis documented; one question to Raqeem will resolve |
| Robot fails on stage | Med | All motion pre-recorded; audio-only fallback ready; super-savvy local fallback |
| Internet weak at venue | Med | Local LLM fallback (super-savvy/Ollama) is on the same machine |
| Sample policy unrealistic | Low | Standards citations are accurate; replacing sample with real RCJY policy is a 1-hour update |
| SM stakeholder vigilance triggered | Always-on | Tribute frame defuses the "AI replaces you" risk; mocked-but-realistic findings ensure no live failure on stage |
| Copy reads as Khaleeji not Najdi | Low | All hand-written in Saudi register; SM to review before lock |

---

## 13. Appendix — How to Run This

```bash
cd C:\Users\saefm\Dev\sanad
npm install            # if not done
npm run dev            # starts dev server on first available port (5173/5174/5175)
```

Then open the URL Vite prints. The current session is running at **http://localhost:5175/**.

To stop: kill the background process (process ID `bfl03yz7x` in the current Claude session).

**Type checking:**
```bash
npx tsc --noEmit       # currently passes clean
```

**Production build:**
```bash
npm run build          # outputs to dist/
npm run preview        # serve the production build
```

---

## 14. Decisions That Need a Human Sign-Off

Marked with **[NEEDS SIGNOFF]** for clarity:

1. **[NEEDS SIGNOFF]** Product name: "سند / Sanad" — or alternative
2. **[NEEDS SIGNOFF]** Co-branding: "RAQEEM × SAVVY WORLD" — does Raqeem want this billing, or "RAQEEM · powered by Savvy"?
3. **[NEEDS SIGNOFF]** Tribute frame: is this the right tone for the audience? Or should we lean harder into "launch" energy?
4. **[NEEDS SIGNOFF]** The single use case demoed (procurement policy + control gaps). Should we add a second use case before May 20 (e.g., contract analysis, transaction anomaly), or keep depth over breadth?
5. **[NEEDS SIGNOFF]** Whether to record a 90-second hero film for the booth's main screen (high-impact, but ~1 day of effort)
6. **[NEEDS SIGNOFF]** A/B comparison plan vs. the human-team's separate Customer-Journey project — when both are ready, decide which becomes canonical or whether they combine.

---

*End of report. Prototype is live at `http://localhost:5175/` for review. All source in `C:\Users\saefm\Dev\sanad\`.*
