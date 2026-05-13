// Capture cinematic 4K-style screenshots of the RASSED dashboard + brief
// for fallback use in tomorrow's meeting.
import { chromium } from "playwright";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOTS_DIR = path.join(__dirname, "screenshots");

const DASH_URL = "http://localhost:5175/";
const BRIEF_URL = "file:///" + path.join(__dirname, "BRIEF.html").replace(/\\/g, "/");

const VIEWPORT = { width: 1920, height: 1080 };

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

async function captureDashboard(browser) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // 4K effective resolution
  });
  const page = await context.newPage();

  console.log("→ navigating to dashboard...");
  await page.goto(DASH_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // let fonts + animations settle

  const sections = [
    { name: "01-hero", selector: "h1.ar-serif", offset: -100 },
    { name: "02-demo-idle", text: "جرّب سـند الآن", offset: -100 },
  ];

  for (const s of sections) {
    console.log(`→ capturing ${s.name}...`);
    if (s.selector) {
      await page.locator(s.selector).first().scrollIntoViewIfNeeded();
    } else if (s.text) {
      await page.getByText(s.text).first().scrollIntoViewIfNeeded();
    }
    await page.evaluate((off) => window.scrollBy(0, off || 0), s.offset);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(SHOTS_DIR, `${s.name}.png`),
      fullPage: false,
    });
  }

  // Click "حلّل بسـند" and wait for results
  console.log("→ triggering analyzer...");
  const analyzeBtn = page.locator('button:has-text("حلّل بسـند")').first();
  if (await analyzeBtn.isVisible()) {
    await analyzeBtn.scrollIntoViewIfNeeded();
    await analyzeBtn.click();
    await page.waitForTimeout(5500); // wait for full analysis + auto-scroll
    console.log("→ capturing demo-results...");
    await page.screenshot({
      path: path.join(SHOTS_DIR, "03-demo-results.png"),
      fullPage: false,
    });
    // capture the findings further down
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SHOTS_DIR, "04-demo-findings.png"),
      fullPage: false,
    });
  }

  // How It Works
  console.log("→ scrolling to How It Works...");
  await page.getByText("ثلاث خطوات. دقيقة واحدة. تقرير موثَّق.").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -100));
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "05-how-it-works.png"),
    fullPage: false,
  });

  // 90-Second Journey — header view
  console.log("→ scrolling to Journey section...");
  await page.getByText("من إشارة إلى حوكمة — ٩٠ ثانية").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -80));
  await page.waitForTimeout(2200); // let the journey auto-start a bit
  await page.screenshot({
    path: path.join(SHOTS_DIR, "06a-journey-start.png"),
    fullPage: false,
  });

  // Journey — mid-flight (a few seconds in, beats 2-3)
  console.log("→ capturing journey mid-flight...");
  await page.waitForTimeout(8000);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "06b-journey-midflight.png"),
    fullPage: false,
  });

  // Journey — near final
  console.log("→ capturing journey near-final...");
  await page.waitForTimeout(20000);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "06c-journey-final.png"),
    fullPage: false,
  });

  // Roadmap section header
  console.log("→ scrolling to Roadmap...");
  await page.getByText("راصد ليست أداة واحدة — منظومة كاملة").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -100));
  await page.waitForTimeout(1100);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "06-roadmap.png"),
    fullPage: false,
  });

  // Closing manifesto
  console.log("→ scrolling to manifesto...");
  await page.getByText("ONE PLATFORM").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -200));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "07-manifesto.png"),
    fullPage: false,
  });

  // Launch card
  console.log("→ scrolling to Launch...");
  await page.getByText("إطلاق راصد").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -100));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "08-launch.png"),
    fullPage: false,
  });

  // Footer
  console.log("→ scrolling to Footer...");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "09-footer.png"),
    fullPage: false,
  });

  // Full page (giant — for archival reference)
  console.log("→ capturing full page (archival)...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(SHOTS_DIR, "00-full-page.png"),
    fullPage: true,
  });

  await context.close();
}

async function captureBrief(browser) {
  // A4 portrait at 96dpi = 794x1123 px; for crisp print preview use 2x
  const context = await browser.newContext({
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2.5,
  });
  const page = await context.newPage();
  console.log("→ opening BRIEF.html...");
  await page.goto(BRIEF_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Capture page 1 (first .page element)
  console.log("→ capturing brief page 1...");
  const page1 = page.locator(".page").nth(0);
  await page1.screenshot({ path: path.join(SHOTS_DIR, "10-brief-page-1.png") });

  // Scroll to page 2 and capture
  console.log("→ capturing brief page 2...");
  const page2 = page.locator(".page").nth(1);
  await page2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page2.screenshot({ path: path.join(SHOTS_DIR, "11-brief-page-2.png") });

  await context.close();
}

(async () => {
  await ensureDir(SHOTS_DIR);
  console.log("Launching Chromium...");
  const browser = await chromium.launch({ headless: true });
  try {
    await captureDashboard(browser);
    await captureBrief(browser);
  } finally {
    await browser.close();
  }
  const files = await readdir(SHOTS_DIR);
  console.log(`\n✓ Captured ${files.length} screenshots in:`);
  console.log(`  ${SHOTS_DIR}`);
  for (const f of files.sort()) {
    const s = await stat(path.join(SHOTS_DIR, f));
    console.log(`  ${f}  (${(s.size / 1024).toFixed(0)} KB)`);
  }
})();
