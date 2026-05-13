# راصد · RASSED — Booth Design Spec
## Internal Audit Day · 2026-05-20 · Royal Commission for Jubail and Yanbu

> **Audience:** RCJY internal auditors, Royal Commission management, Raqeem leadership, possibly industrial investors and government peers.
> **Booth slot:** 3m × 3m standard, or 3m × 4m if available (recommended).
> **Setup window:** 2026-05-19 evening · 4 hours.
> **Live window:** 2026-05-20 · 09:00–17:00 (8 hours).

---

## 1. Booth Concept — Three-Zone Architecture

The booth is **NOT a single counter** — it's a **3-zone journey** that mirrors the on-screen journey, so the visitor's walk-through is itself a tribute to the 3-layer platform (AI · Robotics · Devices).

```
                        ┌──────────────────────────────────────┐
                        │           BACK WALL (3m)             │
                        │   ┌──────────────────────────────┐   │
                        │   │  85" 4K MAIN SCREEN (hero)   │   │
                        │   │  Auto-loops the 90s Journey  │   │
                        │   └──────────────────────────────┘   │
                        │     RASSED · حوكمة سعودية ذكية         │
                        ├──────────────────────────────────────┤
                        │                                      │
                        │ ZONE 3                ZONE 2         │
                        │ [DECIDE]              [VERIFY]       │
                        │                                      │
                        │  Touch        [Visitor Path]         │
                        │  Tablet                              │
                        │  (Sanad        ┌─────────┐           │
                        │   live)        │ G1 Host │           │
                        │                │  (📍)   │           │
                        │                └─────────┘           │
                        │ ZONE 1                               │
                        │ [DISCOVER]    PUDU FlashBot          │
                        │               (live or video loop)   │
                        │                                      │
                        ├──────────────────────────────────────┤
                        │      [ ENTRY · ENTRY · ENTRY ]       │
                        │       Visitor flow → → →             │
                        └──────────────────────────────────────┘
                                  Floor area: 3m × 3m
```

### Zone 1 — DISCOVER (right side, entry side)
Where the visitor first sees something happen.
- **G1 humanoid robot** as host greeter
- Welcomes visitors in Arabic, points to the main screen, hands a printed business card or brief
- Audio + LED + 1 pre-recorded safe gesture only
- **No live motion** — pre-approved gestures only (3-approval gate)

### Zone 2 — VERIFY (center)
Where the platform's heart is shown.
- **85-inch 4K screen** on back wall — auto-loops the 90-second Journey
- **PUDU FlashBot** on floor (if available) or **video loop on side screen** if PUDU not yet on-site
- If PUDU is present: it carries a **sealed dossier** between two small lockers (set up as Zone-1 locker and Zone-3 locker) to demonstrate Chain of Custody live
- A small **QR-locked locker** as a prop visitors can scan with their phones

### Zone 3 — DECIDE (left side)
Where the visitor becomes the **human auditor**.
- **27-inch touch tablet** (or iPad on stand) running the sanad demo
- Visitor pastes a sample policy → sees Sanad analyze → sees findings → **clicks "Approve"** themselves
- This makes them feel the "human-in-the-loop" personally
- Takes ~60 seconds

---

## 2. Hardware Inventory

| # | Item | Quantity | Spec | Notes |
|---|---|---:|---|---|
| 1 | 85-inch 4K display | 1 | Samsung QM85R or equivalent · HDMI · 60Hz | Back wall mount, eye-level center |
| 2 | 27-inch touch tablet | 1 | Lenovo Yoga / iPad Pro 13" on adjustable stand | Visitor-operated |
| 3 | Side display (10-15") | 1 | Optional — for PUDU live route view or fallback video | Side wall |
| 4 | G1 robot (3LLAM unit) | 1 | Owned by Savvy World | Host greeter |
| 5 | PUDU FlashBot | 1 | If partner ships in time | Live custody demo |
| 6 | Small QR-locked locker (prop) | 2 | Off-the-shelf parcel lockers, branded | Zone 2 |
| 7 | Mini-PC for main screen | 1 | Intel NUC or similar · Chrome kiosk mode · 32GB RAM | Pre-loaded with offline cache |
| 8 | Wi-Fi router (booth-only) | 1 | LTE-backup capable | Critical — venue Wi-Fi cannot be trusted |
| 9 | USB-C extension hub | 2 | For tablet + auxiliary | |
| 10 | Battery backup (UPS) | 1 | 1500VA minimum | Power resilience |
| 11 | LED accent strip (gold) | ~6m | Warm 2700K, adhesive | Wraps booth perimeter |
| 12 | Carpet (charcoal/navy) | 9m² | Booth flooring | Matches dark aesthetic |

---

## 3. Signage Plan — Arabic First, English Echo

| Position | Arabic (large) | English (small) | Mounted on |
|---|---|---|---|
| **Top header (back wall)** | راصد · RASSED | Saudi Governance Intelligence | Back wall above 85" screen |
| **Above Zone 1 (G1)** | اكتشف | DISCOVER · أكتشف | Vertical stand |
| **Above Zone 2 (PUDU)** | تحقّق | VERIFY · تحقّق | Vertical stand |
| **Above Zone 3 (Tablet)** | قرّر | DECIDE · قرّر | Vertical stand |
| **Below main screen** | من إشارة إلى حوكمة — ٩٠ ثانية | From Signal to Governance — 90 seconds | Vinyl strip |
| **Floor decal (entry)** | ابدأ هنا → | START HERE → | Floor decal |
| **Side panel (right)** | رقيم × Savvy World | RAQEEM × SAVVY WORLD | Vinyl panel |
| **Side panel (left)** | بمناسبة شهر التوعية الدولي بالمراجعة الداخلية | Internal Audit Awareness Month 2026 | Vinyl panel |

**Typography stack for print:**
- Arabic: **Noto Naskh Arabic Bold** (titles) + **IBM Plex Sans Arabic** (body)
- English: **Inter Bold** (titles) + **Inter Regular** (body)
- Mono: **JetBrains Mono** (codes / IDs)
**Colors (CMYK for print):**
- Navy: `#0A1428` (background panels)
- Warm gold: `#C4A572` (accent / headers)
- Paper white: `#F5F2EB` (light panels)
- Saudi green: `#00A86B` (success accents — used sparingly)

---

## 4. Visitor Flow — The 60-Second Engagement Loop

```
T+0:00   Visitor crosses booth threshold
              ↓
T+0:05   G1 greets: "أهلاً، تبي تعرف كيف الذكاء الاصطناعي 
         يخدم المراجع الداخلي في ٩٠ ثانية؟"
              ↓
T+0:10   G1 gestures to main screen (pre-recorded safe motion)
              ↓
T+0:15-1:30  Visitor watches the 90s Journey on the main screen
              ↓
T+1:30   Visitor turns to Zone 3 (touch tablet)
              ↓
T+1:35-2:30  Visitor pastes/uses sample policy in sanad demo,
             sees findings, clicks "اعتماد" themselves
              ↓
T+2:30   Visitor receives:
           • Printed 2-page brief (BRIEF.pdf)
           • QR card linking to the live dashboard
           • Business card from on-booth host
              ↓
T+2:45   Visitor exits. G1 thanks them by audio.
```

**Throughput:** ~30 visitors/hour at full engagement, 60+/hour for walk-by views of the main screen.

---

## 5. Personnel Required

| Role | Count | Skills | When |
|---|---|---|---|
| **Booth lead** (SM or designee) | 1 | Saudi business Arabic, technical depth | Full day |
| **Demo host** (Arabic-speaker) | 1 | Greeting visitors, walking through demo | Full day · rotating with lead |
| **G1 operator** | 1 | Trained on G1 motion gate, audio cues | Half-day shifts |
| **Tech ops** | 1 | Network / hardware troubleshooting | On-call |
| **Photo / press** | 1 | DSLR + content capture | First 2 hours + VIP visits |

---

## 6. Fallback & Resilience Plan

| Failure mode | Likelihood | Mitigation |
|---|---|---|
| Venue Wi-Fi dies | HIGH | Booth has own LTE router + local cache of dashboard. Demo runs offline. |
| Main screen freezes | MED | Auto-restart loop (already built into journey.tsx). Tech ops carries spare HDMI cable. |
| Touch tablet unresponsive | MED | Spare iPad mirrored to same demo URL. |
| G1 motion fails | MED | Audio-only host mode. G1 stays stationary; pre-recorded greeting plays. |
| PUDU doesn't ship in time | MED | Side-display loops a video of PUDU FlashBot operating in a similar Saudi corporate setting. Signage still references "Active Partnership." |
| AI demo hangs on a stranger's input | MED | Demo uses mocked outputs (deterministic); never relies on live LLM API at the booth. |
| Power outage | LOW | UPS keeps mini-PC + main screen up for 15 minutes. G1 has its own battery. |
| VIP unexpected visit | ALWAYS | SM/booth lead has 60-second pitch memorized (`PITCH-SCRIPT.md`). Brief PDF on hand. |

---

## 7. Setup Timeline · 2026-05-19 Evening

| Time | Activity | Owner |
|---|---|---|
| 16:00 | Hardware arrival at venue | Logistics |
| 16:30 | Carpet + back wall + perimeter LED | Booth crew |
| 17:30 | 85" screen mount + cable management | Tech ops |
| 18:00 | Mini-PC + touch tablet + Wi-Fi setup | Tech ops |
| 19:00 | G1 staging + motion test (3-approval gate triggered) | G1 operator + SM |
| 20:00 | PUDU staging + route test (if available) | PUDU tech + booth crew |
| 20:30 | Signage install + adhesive checks | Booth crew |
| 21:00 | Full dry-run: 3 visitors walk through end-to-end | Whole team |
| 22:00 | Fix list compiled; quick fixes deployed | Tech ops |
| 22:30 | Booth lock + photos for record | SM |

---

## 8. Materials Checklist (Printed / Physical)

- [ ] **BRIEF.pdf** — 50 copies, full-color, 2-page A4
- [ ] **QR cards** — 200 cards, business-card size, linking to live dashboard
- [ ] **SM business cards** — 100 cards, navy + gold
- [ ] **Sample policy printouts** — 20 copies of the procurement policy used in the demo
- [ ] **Press kit** — 5 copies, in folder, with Saudi-formal one-page company intro
- [ ] **Vision 2030 alignment certificate** (decorative, A3 frame) — 1 on back wall
- [ ] **NDA forms** — 10 copies, for serious interested parties

---

## 9. Two Photo Moments to Engineer for Press

The booth is also a **content factory**. Engineer these two shots:

**📸 Shot 1: "The Human Approves the Machine"**
A visitor (ideally an RCJY auditor) stands at Zone 3, finger on the "اعتماد" button, with the main screen showing the human-decision beat behind them. Frame: 16:9 horizontal. Best for press release.

**📸 Shot 2: "The Future Saudi Auditor"**
G1 robot in foreground, PUDU FlashBot rolling past in mid-ground, main screen with Vision 2030 badge in background. Frame: vertical 9:16 for social. Best for X/LinkedIn.

---

## 10. Post-Event Deliverables

Within 48 hours of event close, package and send to Raqeem:
- Video reel (60-90s) of booth experience + visitor reactions
- Photo set (20+ images)
- Engagement metrics: visitor count, demo completion rate, brief pickups, NDA signings
- "Heatmap of Interest" — which zones got the most dwell time
- Top 5 questions asked (qualitative)
- One-page **after-action summary** with recommended next steps for the partnership

---

## 11. Cost Envelope (Rough)

| Bucket | Estimated SAR |
|---|---|
| Hardware rental (screens, tablet, NUC) | 8,000 – 12,000 |
| Booth fabrication (back wall, signage, vinyl) | 12,000 – 18,000 |
| LED + carpet + furniture | 4,000 – 6,000 |
| Printed materials (briefs, cards, sample docs) | 2,000 – 3,000 |
| Personnel (3 days × 5 people) | 6,000 – 10,000 |
| Logistics (transport, install/teardown) | 3,000 – 5,000 |
| Buffer (10–15%) | 4,000 – 6,000 |
| **TOTAL ESTIMATED** | **39,000 – 60,000 SAR** |

*Excludes robot acquisition/lease (G1 owned, PUDU partnership covers their unit). Excludes hosting/cloud (already in place).*

---

## 12. Approval Checkpoints

| Decision | Owner | Deadline |
|---|---|---|
| Final booth dimensions confirmed by Raqeem | Raqeem PM | 2026-05-15 |
| PUDU availability locked (live or video) | SM + PUDU contact | 2026-05-16 |
| Print materials approved & sent to print | SM + Raqeem brand | 2026-05-17 |
| G1 motion sequences pre-approved (3 gestures max) | SM | 2026-05-18 |
| Final dry-run | Full team | 2026-05-19 evening |
| **EVENT** | — | **2026-05-20** |

---

*This booth is not a product showcase — it is a 3-zone tribute to the auditor's craft, where AI, robotics, and devices are introduced as their new colleagues.*

— Savvy World × Raqeem · 2026-05-14
