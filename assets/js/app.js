/* ═══════════════════════════════════════════════════════════
   VPN DISCOUNTER — app.js
   Зависимости (CDN, подключены в index.html): GSAP, ScrollTrigger, Lenis
   ═══════════════════════════════════════════════════════════ */

/* ┌────────────────────────────────────────────────────────┐
   │  КОНТАКТЫ — всё меняется только здесь                  │
   │  .js-cta     → бот (регистрация, оплата, выбор тарифа) │
   │  .js-support → живая техподдержка в Telegram           │
   │  .js-mail    → почта поддержки                         │
   └────────────────────────────────────────────────────────┘ */
const TG_BOT        = "https://t.me/VPNDISCOUNTERBOT";
const TG_SUPPORT    = "https://t.me/OnYouOn";
const SUPPORT_EMAIL = "stritvpn@gmail.com";

/* Сервис геолокации по IP. Бесплатный лимит ~1000 запросов/день.
   Альтернативы: https://ipwho.is/ , https://api.country.is/ , https://ipinfo.io/json?token=… */
const GEO_API = "https://ipapi.co/json/";

(() => {
"use strict";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TOUCH   = matchMedia("(hover: none)").matches;
const MOBILE  = innerWidth < 760;
const hasGSAP = typeof gsap !== "undefined";

if (hasGSAP && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ═══ 1. Ссылки ═══ */
const wire = (sel, href, blank = true) => $$(sel).forEach(a => {
  a.href = href;
  if (blank){ a.target = "_blank"; a.rel = "noopener"; }
});
wire(".js-cta",     TG_BOT);
wire(".js-support", TG_SUPPORT);
wire(".js-mail",    "mailto:" + SUPPORT_EMAIL, false);
$$(".js-mail-text").forEach(el => el.textContent = SUPPORT_EMAIL);
$("#year").textContent = new Date().getFullYear();

/* ═══ 2. i18n ═══ */
const LANG_KEY = "vpnd_lang";
let lang = "ru";                                  // русский — основной
try { lang = localStorage.getItem(LANG_KEY) || "ru"; } catch(e){}
if (!window.I18N[lang]) lang = "ru";

function t(key){ return (window.I18N[lang] && window.I18N[lang][key]) ?? window.I18N.ru[key] ?? key; }

function applyLang(next){
  lang = window.I18N[next] ? next : "ru";
  try { localStorage.setItem(LANG_KEY, lang); } catch(e){}
  document.documentElement.lang = lang;

  $$("[data-i18n]").forEach(el => {
    const val = t(el.dataset.i18n);
    const attr = el.dataset.i18nAttr;
    if (attr) el.setAttribute(attr, val);
    else if (el.tagName === "TITLE") document.title = val;
    else el.textContent = val;
  });

  $$(".lang__btn").forEach(b => b.classList.toggle("is-on", b.dataset.lang === lang));
  $$(".pin").forEach((p,i) => p.setAttribute("aria-label", window.SERVERS[i][lang] || window.SERVERS[i].ru));
  renderChips();
  updateCalc(+$("#calcRange").value, true);
  paintGeo();
  paintCounters();
  if (isOn) {                                  // статус в актуальном языке
    geoOut.textContent = t("toggle.masked");
    statusEl.querySelector("span:last-child").textContent = t("toggle.on");
  }
  ScrollTriggerRefresh();
}
$$(".lang__btn").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));

/* ═══ 3. Плавный скролл (Lenis) + ScrollTrigger ═══ */
let lenis = null;
if (!REDUCED && typeof Lenis !== "undefined"){
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
  if (hasGSAP){
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
function ScrollTriggerRefresh(){ if (hasGSAP && window.ScrollTrigger) ScrollTrigger.refresh(); }

/* якорные ссылки */
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const id = a.getAttribute("href");
  if (id.length < 2) return;
  const el = $(id); if (!el) return;
  e.preventDefault();
  closeMenu();
  if (lenis) lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
}));

/* ═══ 4. Шапка / бургер ═══ */
const nav = $("#nav"), burger = $("#burger"), links = $(".nav__links");
addEventListener("scroll", () => nav.classList.toggle("is-stuck", scrollY > 24), { passive:true });
function closeMenu(){ links.classList.remove("is-open"); burger.setAttribute("aria-expanded","false"); }
burger.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});

/* ═══ 5. Свечение за курсором + магнитные кнопки ═══ */
if (!REDUCED && !TOUCH){
  const glow = $("#cursorGlow");
  let gx = innerWidth/2, gy = innerHeight/2, cx = gx, cy = gy;
  addEventListener("pointermove", e => { gx = e.clientX; gy = e.clientY; glow.classList.add("is-on"); }, { passive:true });
  (function loop(){
    cx += (gx - cx) * .12; cy += (gy - cy) * .12;
    glow.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    requestAnimationFrame(loop);
  })();

  $$("[data-magnetic]").forEach(btn => {
    let raf = 0;
    btn.addEventListener("pointermove", e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width/2) * .28;
      const dy = (e.clientY - r.top - r.height/2) * .38;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { btn.style.transform = `translate(${dx}px,${dy}px)`; });
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });
}

/* ═══ 6. ГЕРОЙ: видео → canvas-лучи ═══════════════════════
   Промо играет один раз, замирает на последнем кадре
   (под ним лежит тот же кадр картинкой), затем эстафету
   принимает бесконечная canvas-анимация лучей.           */
const rays = { speed: 1, target: 1 };

const video = $("#heroVideo");
if (video && !REDUCED) try {
  video.src = MOBILE ? "assets/video/promo-mobile.mp4" : "assets/video/promo.mp4";
  const p = video.play();
  // автоплей может быть заблокирован — тогда просто остаётся статичный кадр
  if (p && p.catch) p.catch(() => {});
  const handover = () => {
    video.pause();
    const c = $("#rays");
    if (hasGSAP){
      gsap.to(c,     { opacity:1, duration:1.2, ease:"none" });
      gsap.to(video, { opacity:0, duration:1.0, ease:"none", delay:.2 });
    } else { c.style.opacity = 1; video.style.opacity = 0; }
  };
  video.addEventListener("ended", handover, { once:true });
  video.addEventListener("error", handover, { once:true });
  // страховка: если ended не прилетел (кэш/кодек) — переключаемся по таймеру
  setTimeout(() => { if (video.currentTime < .1 || !video.paused) handover(); }, 11000);
} catch(e){ /* видео недоступно — герой остаётся со стоп-кадром */ }

/* лучи на canvas */
(function raysCanvas(){
  const cvs = $("#rays"); if (!cvs || REDUCED) return;
  const ctx = cvs.getContext("2d");
  let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2), beams = [];
  const N = MOBILE ? 90 : 170;

  function resize(){
    const r = cvs.getBoundingClientRect();
    W = cvs.width  = Math.max(1, r.width  * dpr);
    H = cvs.height = Math.max(1, r.height * dpr);
  }
  function mk(){
    return { a: Math.random()*Math.PI*2, r: Math.random()*.25, len:.05+Math.random()*.22,
             v: .0018+Math.random()*.006, w: .6+Math.random()*2.2, o: .25+Math.random()*.75 };
  }
  function frame(){
    rays.speed += (rays.target - rays.speed) * .06;
    ctx.clearRect(0,0,W,H);
    const cx = W/2, cy = H/2, R = Math.hypot(W,H)/2;
    for (const b of beams){
      b.r += b.v * rays.speed;
      if (b.r > 1.25){ Object.assign(b, mk()); b.r = 0; }
      const x1 = cx + Math.cos(b.a)*b.r*R,        y1 = cy + Math.sin(b.a)*b.r*R;
      const x2 = cx + Math.cos(b.a)*(b.r+b.len)*R, y2 = cy + Math.sin(b.a)*(b.r+b.len)*R;
      const g = ctx.createLinearGradient(x1,y1,x2,y2);
      const a = Math.min(1, b.r*2.2) * b.o * .85;
      g.addColorStop(0, "rgba(139,205,47,0)");
      g.addColorStop(.5,`rgba(163,230,53,${a})`);
      g.addColorStop(1, "rgba(139,205,47,0)");
      ctx.strokeStyle = g; ctx.lineWidth = b.w*dpr; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
    requestAnimationFrame(frame);
  }
  resize(); addEventListener("resize", resize, { passive:true });
  beams = Array.from({ length:N }, () => { const b = mk(); b.r = Math.random()*1.2; return b; });
  frame();
})();

/* ═══ 7. Тумблер VPN + определение IP ═══ */
const box = $("#vpnBox"), sw = $("#vpnSwitch"), ipOut = $("#ipOut"),
      geoOut = $("#geoOut"), statusEl = $("#vpnStatus");
let realIP = null, realGeo = null, geoFailed = false, isOn = false;

function paintGeo(){
  if (isOn) return;
  ipOut.textContent = realIP || "—";
  if (geoFailed)      geoOut.textContent = t("toggle.failed");
  else if (realGeo)   geoOut.textContent = realGeo;
  else                geoOut.textContent = t("toggle.detecting");
}

if (typeof fetch === "function"){
  fetch(GEO_API, { cache:"no-store" })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d => {
      if (!d || !d.ip) throw 0;
      realIP  = d.ip;
      const city = d.city || "", region = d.country_name || d.country || "";
      realGeo = [city, region].filter(Boolean).join(" · ") || null;
    })
    .catch(() => { geoFailed = true; })
    .finally(paintGeo);
} else {
  geoFailed = true; paintGeo();               // очень старый браузер — просто без IP
}

/* «схлопывание» IP в маску */
function scramble(to, done){
  const chars = "0123456789•·#*";
  const from = ipOut.textContent;
  const len = Math.max(from.length, to.length);
  let i = 0;
  const id = setInterval(() => {
    let s = "";
    for (let k = 0; k < len; k++){
      s += k < i ? (to[k] ?? "") : chars[(Math.random()*chars.length)|0];
    }
    ipOut.textContent = s;
    if (i++ >= len){ clearInterval(id); ipOut.textContent = to; done && done(); }
  }, 34);
}

function setVPN(on){
  isOn = on;
  sw.setAttribute("aria-checked", String(on));
  box.classList.toggle("is-on", on);
  rays.target = on ? 3.4 : 1;

  const label = statusEl.querySelector("span:last-child");
  statusEl.dataset.state = on ? "on" : "off";

  if (on){
    if (REDUCED) ipOut.textContent = "10.8.•••.•••";
    else scramble("10.8.•••.•••");
    geoOut.textContent = t("toggle.masked");
    label.textContent  = t("toggle.on");
    if (hasGSAP) gsap.fromTo("#heroShield", { scale:1 }, { scale:1.12, duration:.32, yoyo:true, repeat:1, ease:"power2.out" });
  } else {
    if (REDUCED) paintGeo();
    else scramble(realIP || "—", paintGeo);
    label.textContent = t("toggle.off");
  }
}
sw.addEventListener("click", () => setVPN(!isOn));

/* ═══ 8. Карта серверов ═══ */
(function serverMap(){
  const wrap = $("#mapWrap"), cvs = $("#mapCanvas"), pins = $("#mapPins"),
        svg = $("#mapLinks"), tip = $("#mapTip");
  if (!wrap || !window.WORLD_MASK) return;
  const M = window.WORLD_MASK, ctx = cvs.getContext("2d");
  let dpr = Math.min(devicePixelRatio || 1, 2);

  function draw(){
    const r = wrap.getBoundingClientRect();
    cvs.width = r.width*dpr; cvs.height = r.height*dpr;
    const cw = r.width/M.cols, rad = Math.max(.9, cw*.30);
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.fillStyle = "rgba(139,205,47,.30)";
    for (let y = 0; y < M.rows; y++){
      const line = M.data[y];
      for (let x = 0; x < M.cols; x++){
        if (line[x] !== "1") continue;
        ctx.beginPath();
        ctx.arc(((x+.5)/M.cols)*r.width*dpr, ((y+.5)/M.rows)*r.height*dpr, rad*dpr, 0, 6.284);
        ctx.fill();
      }
    }
  }
  draw();
  addEventListener("resize", draw, { passive:true });

  window.SERVERS.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "pin"; b.type = "button";
    b.style.cssText = `left:${s.x*100}%;top:${s.y*100}%;--d:${(i*.19).toFixed(2)}s`;
    b.setAttribute("aria-label", s[lang] || s.ru);
    b.dataset.i = i;
    const show = () => hot(i, b);
    b.addEventListener("pointerenter", show);
    b.addEventListener("focus", show);
    b.addEventListener("click", show);
    b.addEventListener("pointerleave", cool);
    b.addEventListener("blur", cool);
    pins.appendChild(b);
  });

  function hot(i, el){
    const s = window.SERVERS[i], r = wrap.getBoundingClientRect();
    $$(".pin", pins).forEach(p => p.classList.remove("is-hot"));
    el.classList.add("is-hot");
    tip.innerHTML = `${s[lang] || s.ru} · <b>${s.ping} ${lang === "ru" ? "мс" : "ms"}</b>`;
    tip.style.left = s.x*100 + "%";
    tip.style.top  = s.y*100 + "%";
    tip.style.opacity = 1;
    // линия от центра карты к точке
    svg.innerHTML = "";
    const ln = document.createElementNS("http://www.w3.org/2000/svg","line");
    ln.setAttribute("x1", r.width*.5); ln.setAttribute("y1", r.height*.5);
    ln.setAttribute("x2", r.width*s.x); ln.setAttribute("y2", r.height*s.y);
    const L = Math.hypot(r.width*(s.x-.5), r.height*(s.y-.5));
    ln.setAttribute("stroke-dasharray", L); ln.setAttribute("stroke-dashoffset", L);
    svg.appendChild(ln);
    if (hasGSAP && !REDUCED) gsap.to(ln, { attr:{ "stroke-dashoffset":0 }, duration:.5, ease:"power2.out" });
    else ln.setAttribute("stroke-dashoffset", 0);
    const chip = $(`.chip[data-i="${i}"]`);
    $$(".chip").forEach(c => c.classList.remove("is-hot"));
    if (chip) chip.classList.add("is-hot");
  }
  function cool(){
    tip.style.opacity = 0; svg.innerHTML = "";
    $$(".pin", pins).forEach(p => p.classList.remove("is-hot"));
    $$(".chip").forEach(c => c.classList.remove("is-hot"));
  }
})();

function renderChips(){
  const box = $("#serverChips"); if (!box) return;
  box.innerHTML = window.SERVERS.map((s,i) =>
    `<span class="chip" data-i="${i}">${s[lang] || s.ru} <em>${s.ping}${lang === "ru" ? " мс" : " ms"}</em></span>`
  ).join("");
}
renderChips();

/* ═══ 9. Сервисы: загораются по очереди при скролле ═══ */
if (hasGSAP && window.ScrollTrigger){
  $$(".srv").forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el, start: "top 88%",
      onEnter: () => setTimeout(() => el.classList.add("is-live"), i * 110)
    });
  });
} else {
  $$(".srv").forEach(el => el.classList.add("is-live"));
}

/* ═══ 10. Калькулятор устройств ═══ */
const PLANS = [
  { n:1, price:100, hint:"calc.hintStd"  },
  { n:2, price:150, hint:"calc.hintMob"  },
  { n:3, price:150, hint:"calc.hintMob"  },
  { n:4, price:270, hint:"calc.hintPrem" },
  { n:5, price:270, hint:"calc.hintPrem" }
];
const range = $("#calcRange"), priceOut = $("#calcPrice"), hintOut = $("#calcHint"), ticks = $("#calcTicks");
ticks.innerHTML = PLANS.map(p => `<span data-n="${p.n}">${p.n}</span>`).join("");

let shownPrice = 100;
function updateCalc(n, instant){
  const p = PLANS[n-1];
  hintOut.textContent = t(p.hint);
  $$("#calcTicks span").forEach(s => s.classList.toggle("is-on", +s.dataset.n <= n));
  const target = p.price;
  if (instant || REDUCED || !hasGSAP){ shownPrice = target; priceOut.textContent = target; return; }
  gsap.to({ v: shownPrice }, {
    v: target, duration: .55, ease: "power2.out",
    onUpdate(){ priceOut.textContent = Math.round(this.targets()[0].v); },
    onComplete(){ shownPrice = target; priceOut.textContent = target; }
  });
  gsap.fromTo(priceOut, { y:-4 }, { y:0, duration:.35, ease:"back.out(3)" });
  // подсветить соответствующий тариф
  const key = target === 100 ? "std" : target === 150 ? "mob" : "prem";
  $$(".plan").forEach(pl => pl.style.outline = pl.dataset.plan === key ? "1px solid rgba(139,205,47,.5)" : "");
}
range.addEventListener("input", () => updateCalc(+range.value));
updateCalc(1, true);

/* ═══ 11. Установка: залипающий iPhone + шаги ═══ */
(function installFlow(){
  const steps = $$(".step"), screens = $$(".scr");
  if (!steps.length) return;
  function activate(i){
    steps.forEach((s,k) => s.classList.toggle("is-active", k === i));
    screens.forEach((s,k) => s.classList.toggle("is-on", k === i));
  }
  activate(0);
  if (hasGSAP && window.ScrollTrigger){
    steps.forEach((s,i) => {
      ScrollTrigger.create({
        trigger: s, start: "top 62%", end: "bottom 45%",
        onEnter: () => activate(i), onEnterBack: () => activate(i)
      });
    });
  } else {
    // без GSAP — просто крутим экраны по клику на шаг
    steps.forEach((s,i) => s.addEventListener("click", () => activate(i)));
  }
})();

/* ═══ 12. Reveal-анимации и счётчики ═══ */
function sfx(el){ return el.dataset.suffixKey ? t(el.dataset.suffixKey) : (el.dataset.suffix || ""); }
function paintCounters(){ $$("[data-count]").forEach(el => { el.textContent = el.dataset.count + sfx(el); }); }

if (hasGSAP && window.ScrollTrigger && !REDUCED){
  $$(".reveal").forEach(el => {
    gsap.fromTo(el, { opacity:0, y:26 }, {
      opacity:1, y:0, duration:.85, ease:"power3.out",
      scrollTrigger:{ trigger: el, start:"top 92%", once:true }
    });
  });
  $$("[data-count]").forEach(el => {
    const to = +el.dataset.count;
    ScrollTrigger.create({ trigger: el, start:"top 96%", once:true, onEnter(){
      gsap.to({ v:0 }, {
        v:to, duration:1.2, ease:"power2.out",
        onUpdate(){ el.textContent = Math.round(this.targets()[0].v) + sfx(el); },
        onComplete(){ el.textContent = to + sfx(el); }
      });
    }});
  });
} else {
  document.body.classList.add("is-ready");   // всё видно сразу
  paintCounters();
}

/* ═══ 13. Модалка документов (заглушки) ═══ */
const modal = $("#docModal");
$$("[data-doc]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  const k = a.dataset.doc;
  $("#docTitle").textContent = t(`doc.${k}.h`);
  $("#docBody").innerHTML = t(`doc.${k}.b`).split("|").map(p => `<p>${p}</p>`).join("");
  modal.classList.add("is-open"); modal.setAttribute("aria-hidden","false");
  $("#docClose").focus();
}));
function closeDoc(){ modal.classList.remove("is-open"); modal.setAttribute("aria-hidden","true"); }
$("#docClose").addEventListener("click", closeDoc);
modal.addEventListener("click", e => { if (e.target === modal) closeDoc(); });
addEventListener("keydown", e => { if (e.key === "Escape"){ closeDoc(); closeMenu(); } });

/* ═══ 14. Старт ═══ */
applyLang(lang);
addEventListener("load", ScrollTriggerRefresh);

})();
