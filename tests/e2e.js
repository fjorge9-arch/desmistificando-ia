// E2E test for desmistificando-ia
// Usage: node e2e.js <BASE_URL>
//   ex: node e2e.js http://127.0.0.1:8765
//       node e2e.js https://desmistificando-ia.fjorge9.workers.dev

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = (process.argv[2] || 'http://127.0.0.1:8765').replace(/\/$/, '');
const HEADLESS = process.env.HEADLESS !== 'false';

// Extract lesson files from estudos/content.js (regex on raw source)
const contentJs = fs.readFileSync(path.join(__dirname, '..', 'estudos', 'content.js'), 'utf8');
const LESSON_FILES = [...contentJs.matchAll(/file:\s*"([^"]+)"/g)].map(m => m[1]);
const LESSON_TITLES = [...contentJs.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);

console.log(`\n=== E2E :: ${BASE} ===`);
console.log(`Lessons declared in content.js: ${LESSON_FILES.length}\n`);

const results = {
  base: BASE,
  startedAt: new Date().toISOString(),
  pages: {},
  lessons: { passed: [], failed: [] },
  tabs: {},
  i18n: {},
  consoleErrors: [],
  networkErrors: [],
  pageErrors: [],
};

function rec(label, ok, extra) {
  const icon = ok ? '✓' : '✗';
  console.log(`  ${icon} ${label}${extra ? ' — ' + extra : ''}`);
}

(async () => {
  const browser = await chromium.launch({ headless: HEADLESS });
  const ctx = await browser.newContext({ locale: 'pt-BR' });
  const page = await ctx.newPage();

  // Capture console + network + page errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ text: msg.text(), location: msg.location() });
    }
  });
  page.on('pageerror', err => {
    results.pageErrors.push({ message: err.message, stack: err.stack });
  });
  page.on('response', resp => {
    const url = resp.url();
    const status = resp.status();
    if (status >= 400 && url.startsWith(BASE)) {
      results.networkErrors.push({ url, status });
    }
  });

  // === 1) Home /
  console.log('[1] Home /');
  try {
    const resp = await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
    results.pages['/'] = { status: resp.status() };
    rec('GET /', resp.ok(), `HTTP ${resp.status()}`);
    const title = await page.title();
    rec('has <title>', !!title, JSON.stringify(title));
  } catch (e) {
    rec('GET /', false, e.message);
    results.pages['/'] = { error: e.message };
  }

  // === 2) /estudos/
  console.log('\n[2] /estudos/');
  try {
    const resp = await page.goto(BASE + '/estudos/', { waitUntil: 'load', timeout: 30000 });
    results.pages['/estudos/'] = { status: resp.status() };
    rec('GET /estudos/', resp.ok(), `HTTP ${resp.status()}`);
    // wait for app shell to render
    await page.waitForSelector('nav.tabs', { timeout: 10000 });
    rec('nav.tabs presente', true);
    await page.waitForSelector('.tab[data-view="licoes"]', { timeout: 5000 });
    rec('aba Lições presente', true);
  } catch (e) {
    rec('GET /estudos/', false, e.message);
    results.pages['/estudos/'] = { error: e.message };
  }

  // === 3) Abrir Lições e validar lista
  console.log('\n[3] Aba Lições');
  try {
    await page.click('.tab[data-view="licoes"]');
    await page.waitForSelector('.lesson-item', { timeout: 5000 });
    const itemCount = await page.locator('.lesson-item').count();
    rec(`itens .lesson-item renderizados`, itemCount === LESSON_FILES.length, `${itemCount} / ${LESSON_FILES.length}`);
    results.tabs.licoes = { count: itemCount, expected: LESSON_FILES.length };
  } catch (e) {
    rec('aba Lições', false, e.message);
    results.tabs.licoes = { error: e.message };
  }

  // === 4) Cada lição: click → conteúdo renderiza
  console.log(`\n[4] Validando ${LESSON_FILES.length} lições (click + render)`);
  for (let i = 0; i < LESSON_FILES.length; i++) {
    const file = LESSON_FILES[i];
    const title = LESSON_TITLES[i] || file;
    try {
      // CSS attribute selector needs escaping for special chars; use evaluate-based click instead
      const clicked = await page.evaluate(targetFile => {
        const el = Array.from(document.querySelectorAll('.lesson-item'))
          .find(d => d.getAttribute('data-file') === targetFile);
        if (!el) return false;
        el.click();
        return true;
      }, file);
      if (!clicked) throw new Error('.lesson-item nao encontrado');

      // Wait for either .lesson-prose (ok) or .lesson-load-error (fail)
      await page.waitForFunction(() => {
        return !!document.querySelector('.lesson-prose') ||
               !!document.querySelector('.lesson-load-error');
      }, { timeout: 15000 });

      const errorVisible = await page.locator('.lesson-load-error').count();
      if (errorVisible > 0) {
        results.lessons.failed.push({ file, title, reason: 'lesson-load-error' });
        rec(`(${i + 1}/${LESSON_FILES.length}) ${title}`, false, 'load-error');
      } else {
        // check rendered content has substantive length
        const proseLen = await page.locator('.lesson-prose').first().innerText().then(t => t.length).catch(() => 0);
        if (proseLen < 50) {
          results.lessons.failed.push({ file, title, reason: `prose too short (${proseLen} chars)` });
          rec(`(${i + 1}/${LESSON_FILES.length}) ${title}`, false, `prose ${proseLen} chars`);
        } else {
          results.lessons.passed.push({ file, title, proseLen });
          // Don't spam — only print every 10th OK
          if ((i + 1) % 5 === 0 || i === LESSON_FILES.length - 1) {
            rec(`(${i + 1}/${LESSON_FILES.length}) ok`, true);
          }
        }
      }
    } catch (e) {
      results.lessons.failed.push({ file, title, reason: e.message });
      rec(`(${i + 1}/${LESSON_FILES.length}) ${title}`, false, e.message);
    }
  }

  // === 5) Quiz
  console.log('\n[5] Aba Quiz');
  try {
    await page.click('.tab[data-view="quiz"]');
    await page.waitForTimeout(500);
    const hasQuizContent = await page.locator('#app').innerText().then(t => t.length > 50);
    rec('Quiz renderizou conteúdo', hasQuizContent);
    results.tabs.quiz = { rendered: hasQuizContent };
  } catch (e) {
    rec('Quiz', false, e.message);
    results.tabs.quiz = { error: e.message };
  }

  // === 6) Simulado
  console.log('\n[6] Aba Simulado');
  try {
    await page.click('.tab[data-view="simulado"]');
    await page.waitForTimeout(500);
    const hasContent = await page.locator('#app').innerText().then(t => t.length > 50);
    rec('Simulado renderizou conteúdo', hasContent);
    results.tabs.simulado = { rendered: hasContent };
  } catch (e) {
    rec('Simulado', false, e.message);
    results.tabs.simulado = { error: e.message };
  }

  // === 7) Histórico
  console.log('\n[7] Aba Histórico');
  try {
    await page.click('.tab[data-view="historico"]');
    await page.waitForTimeout(500);
    const hasContent = await page.locator('#app').innerText().then(t => t.length > 20);
    rec('Histórico renderizou conteúdo', hasContent);
    results.tabs.historico = { rendered: hasContent };
  } catch (e) {
    rec('Histórico', false, e.message);
    results.tabs.historico = { error: e.message };
  }

  // === 8) Idiomas
  console.log('\n[8] Troca de idioma (PT/EN/ES)');
  for (const lang of ['en', 'es', 'pt']) {
    try {
      await page.click(`.lang-btn[data-lang="${lang}"]`);
      await page.waitForTimeout(300);
      const html = await page.locator('html').getAttribute('lang');
      const tabText = await page.locator('.tab[data-view="licoes"]').innerText();
      results.i18n[lang] = { htmlLang: html, licoesLabel: tabText.trim() };
      rec(`troca para ${lang}`, !!tabText, `html.lang=${html}, label="${tabText.trim()}"`);
    } catch (e) {
      rec(`troca para ${lang}`, false, e.message);
      results.i18n[lang] = { error: e.message };
    }
  }

  // === Resumo
  console.log('\n=== Resumo ===');
  console.log(`Lições OK:    ${results.lessons.passed.length} / ${LESSON_FILES.length}`);
  console.log(`Lições FALHA: ${results.lessons.failed.length}`);
  console.log(`Console errors: ${results.consoleErrors.length}`);
  console.log(`Page errors:    ${results.pageErrors.length}`);
  console.log(`Network 4xx/5xx: ${results.networkErrors.length}`);

  if (results.lessons.failed.length) {
    console.log('\nFalhas de lições:');
    for (const f of results.lessons.failed) console.log(`  - ${f.title}: ${f.reason}`);
  }
  if (results.consoleErrors.length) {
    console.log('\nConsole errors:');
    for (const e of results.consoleErrors.slice(0, 10)) console.log(`  - ${e.text}`);
  }
  if (results.networkErrors.length) {
    console.log('\nNetwork 4xx/5xx:');
    for (const e of results.networkErrors.slice(0, 20)) console.log(`  - ${e.status} ${e.url}`);
  }

  // Save full JSON
  const tag = BASE.includes('127.0.0.1') ? 'local' : 'prod';
  const outPath = path.join(__dirname, `report-${tag}.json`);
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nRelatório completo: ${outPath}`);

  await browser.close();

  const failed = results.lessons.failed.length + results.pageErrors.length;
  process.exit(failed > 0 ? 1 : 0);
})().catch(e => {
  console.error('FATAL:', e);
  process.exit(2);
});
