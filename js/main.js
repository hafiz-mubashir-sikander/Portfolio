/* ==========================================================================
   Portfolio behaviour. Plain JS, no dependencies.
   Data lives in js/projects.js (P, SK, Q, F, FACTS, FORM_ENDPOINT, CONTACT_EMAIL).
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const R = document.documentElement;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (n, c = "i sm") => `<svg class="${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const raf = fn => { let t = 0; return (...a) => { if (t) return; t = requestAnimationFrame(() => { t = 0; fn(...a); }); }; };

  /* ---------- theme ---------- */
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  const effTheme = () => R.dataset.theme || (sysDark.matches ? "dark" : "light");
  const metaTheme = () => { const m = $('meta[name="theme-color"]'); if (m) m.content = effTheme() === "dark" ? "#070a14" : "#f5f6fb"; };
  function toggleTheme() {
    document.body.classList.add("theme-anim");
    const next = effTheme() === "dark" ? "light" : "dark";
    R.dataset.theme = next;
    try { localStorage.setItem("th", next); } catch (e) {}
    metaTheme();
    setTimeout(() => document.body.classList.remove("theme-anim"), 450);
  }
  $$("#theme,#theme2").forEach(b => b.addEventListener("click", toggleTheme));
  sysDark.addEventListener && sysDark.addEventListener("change", metaTheme);
  metaTheme();

  /* ---------- derived facts ---------- */
  const now = new Date();
  const months = (now.getFullYear() - FACTS.careerStart[0]) * 12 + now.getMonth() + 1 - FACTS.careerStart[1];
  const yrs = Math.max(1, Math.floor(months / 12));
  const count = k => k === "all" ? P.length : P.filter(p => p.c.includes(k)).length;
  const onStores = P.filter(p => p.plat === "android" || p.plat === "ios" || p.plat === "both").length;
  const awards = 2; // Honors & awards (2) on LinkedIn
  $("#yr").textContent = now.getFullYear();
  $("#expsub").textContent = `${yrs}+ year${yrs > 1 ? "s" : ""} at VirtueNetz since April 2025, plus a BS in Computer Science from KFUEIT.`;

  /* ---------- tech tiles (icon over monogram fallback) ---------- */
  const DV = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
  const TECH = {
    Flutter: ["flutter/flutter-original", "#54C5F8"], Dart: ["dart/dart-original", "#2CB7F6"], Firebase: ["firebase/firebase-plain", "#FFCA28"],
    Unity: ["unity/unity-original", "#9aa3c7", 1], "C#": ["csharp/csharp-original", "#9B4F96"], Java: ["java/java-original", "#F89820"],
    "C++": ["cplusplus/cplusplus-original", "#00599C"], MySQL: ["mysql/mysql-original", "#4479A1"], Git: ["git/git-original", "#F05032"],
    GitHub: ["github/github-original", "#9aa3c7", 1], "Android development": ["android/android-original", "#3DDC84"]
  };
  const PALETTE = ["#8b7bff", "#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#60a5fa"];
  function tech(name, size = 22, idx = 0) {
    const t = TECH[name], col = t ? t[1] : PALETTE[idx % PALETTE.length];
    const ch = esc(name.replace(/[^A-Za-z0-9#+]/g, "").slice(0, 2));
    const img = t ? `<img src="${DV + t[0]}.svg" alt="" loading="lazy" decoding="async" ${t[2] ? 'class="inv"' : ""} onload="this.className+=' ok';this.parentNode.classList.add('ok')" onerror="this.remove()">` : "";
    return `<span class="ti" style="--sz:${size}px;--tc:${col}" aria-hidden="true">${ch}${img}</span>`;
  }

  /* ---------- hero ---------- */
  // headline: character-level reveal for plain words (gradient word reveals as a unit)
  (function () {
    const h = $("#name"); if (!h || RM) return;
    let c = 0;
    $$(".w", h).forEach(w => {
      if (w.querySelector(".gw")) return;
      const t = w.textContent; w.textContent = "";
      [...t].forEach(ch => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--c", c++); s.textContent = ch; s.setAttribute("aria-hidden", "true"); w.appendChild(s); });
    });
    $$(".gw", h).forEach(g => g.setAttribute("aria-hidden", "true"));
  })();

  // stats in hero (derived)
  $("#hstats").innerHTML = [[P.length, "Projects"], [onStores, "On app stores"], [awards, "Awards in 2026"]].map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");

  // role switcher
  (function () {
    const el = $("#role"); let i = 0, c = 0, del = false;
    if (RM) { let k = 0; el.textContent = ROLES[0]; setInterval(() => { k = (k + 1) % ROLES.length; el.textContent = ROLES[k]; }, 2600); return; }
    el.textContent = "";
    (function step() {
      const w = ROLES[i]; el.textContent = w.slice(0, c); let d = del ? 32 : 68;
      if (!del && c === w.length) { del = true; d = 1500; el.setAttribute("aria-label", w); }
      else if (del && c === 0) { del = false; i = (i + 1) % ROLES.length; d = 320; }
      else c += del ? -1 : 1;
      setTimeout(step, d);
    })();
  })();

  // orbiting tech (decorative)
  $("#orbit").innerHTML = ["Flutter", "Unity", "Firebase", "Dart"].map(n => `<div class="orb"><span>${tech(n, 22)}</span></div>`).join("");

  // pointer lighting in hero (desktop only)
  if (FINE && !RM) {
    const hs = $("#home"), hl = $("#hlight");
    const mv = raf(e => { const r = hs.getBoundingClientRect(); hl.style.setProperty("--hx", (e.clientX - r.left) + "px"); hl.style.setProperty("--hy", (e.clientY - r.top) + "px"); });
    hs.addEventListener("pointermove", mv, { passive: true });
  }

  /* ---------- stats (count up once) ---------- */
  (function () {
    const S = [
      [P.length, "", "Projects in this portfolio", "var(--p)"],
      [count("mobile"), "", "Mobile apps", "var(--c)"],
      [count("games"), "", "Games", "var(--a)"],
      [yrs, "+", "Years at VirtueNetz", "var(--g)"],
      [awards, "", "Awards in 2026", "var(--k)"]
    ];
    $("#stats").innerHTML = S.map(s => `<div class="stat" style="--ac:${s[3]}"><div class="num" data-to="${s[0]}" data-suf="${s[1]}">${RM ? s[0] + s[1] : 0}</div><div class="lb">${s[2]}</div></div>`).join("");
    if (RM) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, t0 = performance.now();
      (function tick(t) { const p = Math.min((t - t0) / 1000, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + el.dataset.suf; if (p < 1) requestAnimationFrame(tick); })(t0);
    }), { threshold: .6 });
    $$(".num").forEach(n => io.observe(n));
  })();

  /* ---------- projects ---------- */
  const platTag = p => p.plat === "both" ? "Android · iOS" : p.plat === "android" ? "Android" : p.plat === "ios" ? "iOS" : "Private";
  const mock = p => `<div class="mock ${p.form === "wide" ? "wide" : "phone"}" aria-hidden="true"><span class="glyph">${esc(p.n[0])}</span><small>Preview placeholder</small></div>`;

  $("#feat").innerHTML = P.filter(p => p.ft).map((p, i) => `
    <button class="card fcard travel glow spot tilt shine rv" type="button" data-open="${p.id}" style="--ac:${p.ac};--tc:${p.ac};--i:${i}" aria-label="Open case study: ${esc(p.n)}">
      <div class="fprev">${mock(p)}</div>
      <div class="fbody">
        <span class="st">${esc(p.st)}</span>
        <h3>${esc(p.n)}</h3><div class="cat">${esc(p.cat)}</div>
        <p>${esc(p.d)}</p>
        <div class="chips">${p.t.slice(0, 3).map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <div class="role"><b>My role:</b> <span>${esc(p.role)}</span></div>
        <div class="cta">View case study ${icon("arrow-right", "i sm arr")}</div>
      </div>
    </button>`).join("");

  $("#filters").innerHTML = F.map(f => `<button class="f${f[0] === "all" ? " on" : ""}" type="button" data-k="${f[0]}" aria-pressed="${f[0] === "all"}">${esc(f[1])}<small>${count(f[0])}</small></button>`).join("");

  $("#pg").innerHTML = P.map((p, i) => `
    <button class="card pc spot tilt" type="button" data-open="${p.id}" data-id="${p.id}" style="--ac:${p.ac}" aria-label="Open case study: ${esc(p.n)}">
      <div class="pimg"><span class="glyph" aria-hidden="true">${esc(p.n[0])}</span><span class="chip plat">${platTag(p)}</span></div>
      <div class="pbody">
        <span class="st">${esc(p.st)}</span>
        <h3>${esc(p.n)}</h3><div class="cat">${esc(p.cat)}</div>
        <p>${esc(p.d)}</p>
        <div class="chips">${p.t.slice(0, 3).map(x => `<span class="chip">${esc(x)}</span>`).join("")}${p.t.length > 3 ? `<span class="chip">+${p.t.length - 3}</span>` : ""}</div>
        <div class="role"><b>My role:</b> <span>${esc(p.role)}</span></div>
        <div class="cta">View case study ${icon("arrow-right", "i sm arr")}</div>
      </div>
    </button>`).join("");

  let cur = "all";
  function filt() {
    const q = $("#sq").value.toLowerCase().trim(); let n = 0;
    $$(".pc").forEach(el => {
      const p = P.find(x => x.id === el.dataset.id);
      const ok = (cur === "all" || p.c.includes(cur)) && (!q || (p.n + " " + p.cat + " " + p.d + " " + p.t.join(" ")).toLowerCase().includes(q));
      const was = !el.classList.contains("hide");
      el.classList.toggle("hide", !ok);
      if (ok && !was && !RM) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
      n += ok;
    });
    $("#none").classList.toggle("hide", n > 0);
    $("#pstat").textContent = `${n} project${n === 1 ? "" : "s"} shown`;
  }
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest(".f"); if (!b) return; cur = b.dataset.k;
    $$(".f").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); }); filt();
  });
  $("#sq").addEventListener("input", filt);

  /* ---------- case-study dialog ---------- */
  const dl = $("#dl"); let lastFocus = null;
  const lk = l => {
    const n = l[0].toLowerCase();
    const ic = n.includes("play") && !n.includes("store") || n.includes("video") ? "play" : n.includes("app store") ? "smartphone" : n.includes("github") ? "github" : n.includes("privacy") ? "shield" : "globe";
    return ic === "github" ? '<svg class="i sm fill" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-github"/></svg>' : icon(ic);
  };
  function openProject(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    lastFocus = document.activeElement; dl.style.setProperty("--ac", p.ac);
    dl.innerHTML = `
      <div class="dscroll">
        <div class="dh"><button class="ibtn dclose" type="button" data-close aria-label="Close case study">${icon("x")}</button>
          <span class="st" style="--ac:${p.ac}">${esc(p.st)}</span><h2 id="dl-title">${esc(p.n)}</h2><div class="mu">${esc(p.cat)}</div></div>
        <div class="dgrid">
          <div class="dmain">
            <div><h4>Overview</h4><p>${esc(p.d)}</p></div>
            <div><h4>The problem</h4><p>${esc(p.why)}</p></div>
            <div><h4>The solution</h4><p>${esc(p.sol)}</p></div>
            <div><h4>My role</h4><p>${esc(p.role)}. ${esc(p.note)}</p></div>
            <div><h4>Key features</h4><ul>${p.f.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
            <div class="dshot">No screenshots are published here yet. Nothing on this page is a mock-up of the real app.</div>
          </div>
          <aside class="daside" aria-label="Project details">
            <div><h4>Platform</h4><span class="chip">${platTag(p)}</span></div>
            <div><h4>Technologies</h4><div class="chips">${p.t.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div></div>
            ${p.l.length ? `<div><h4>Links</h4><div class="links">${p.l.map((x, i) => `<a class="btn sm${i ? "" : " pri"}" href="${esc(x[1])}" target="_blank" rel="noopener">${lk(x)}${esc(x[0])}<span class="sr"> (opens in a new tab)</span></a>`).join("")}</div></div>` : `<div><h4>Links</h4><p class="mu" style="font-size:var(--fs-sm)">No public links for this project.</p></div>`}
          </aside>
        </div>
      </div>`;
    document.body.style.overflow = "hidden";
    dl.showModal();
    $(".dscroll", dl).scrollTop = 0;
    history.replaceState(null, "", "#project-" + id);
  }
  function closeDl() { if (dl.open) dl.close(); }
  dl.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search + "#projects");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  });
  dl.addEventListener("click", e => { if (e.target === dl || e.target.closest("[data-close]")) closeDl(); });
  // delegated opener (cards + footer links)
  document.addEventListener("click", e => { const b = e.target.closest("[data-open]"); if (b) { e.preventDefault(); openProject(b.dataset.open); } });

  /* ---------- skills ---------- */
  (function () {
    const used = n => P.filter(p => p.t.some(t => t.toLowerCase() === n.toLowerCase())).map(p => p.n);
    let idx = 0;
    $("#sk").innerHTML = SK.map((s, i) => {
      const accent = PALETTE[i % PALETTE.length];
      return `<article class="card skc spot rv" style="--ac:${accent};--i:${i % 3}">
        <h3><span class="ico">${icon(s[3], "i sm")}</span>${esc(s[0])}</h3><p class="note">${esc(s[2])}</p>
        <div class="tiles">${s[1].map(n => { const u = used(n); const tip = u.length ? "Used in " + u.join(", ") : "Listed on my LinkedIn profile"; idx++;
          return `<span class="tile" tabindex="0" style="--tc:${TECH[n] ? TECH[n][1] : accent}" aria-label="${esc(n)}. ${esc(tip)}">${tech(n, 22, idx)}${esc(n)}<span class="tip" role="tooltip" aria-hidden="true">${esc(tip)}</span></span>`; }).join("")}</div>
      </article>`;
    }).join("");
  })();

  /* ---------- recommendations carousel (no autoplay, swipe, keys) ---------- */
  (function () {
    const track = $("#rtrack"), view = $("#rview"), dots = $("#rdots"); let i = 0;
    const ini = n => n.split(" ").map(w => w[0]).slice(0, 2).join("");
    track.innerHTML = Q.map((q, k) => `<div class="rslide" role="group" aria-roledescription="slide" aria-label="${k + 1} of ${Q.length}" ${k ? 'aria-hidden="true"' : ""}>
      <figure class="card rcard spot" style="margin:0;--ac:var(--p)">${icon("quote", "i qm")}
        <blockquote>${q.t.map(t => `<p>${esc(t)}</p>`).join("")}</blockquote>
        <figcaption class="rwho"><span class="av" aria-hidden="true">${esc(ini(q.n))}</span><span><b>${esc(q.n)}</b><span>${esc(q.r)}</span><span>${esc(q.rel)}</span></span></figcaption>
      </figure></div>`).join("");
    dots.innerHTML = Q.map((q, k) => `<button type="button" aria-label="Show recommendation ${k + 1} from ${esc(q.n)}" ${k === 0 ? 'aria-current="true"' : ""}></button>`).join("");
    function go(n) {
      i = (n + Q.length) % Q.length; track.style.transform = `translateX(${-i * 100}%)`;
      $$(".rslide", track).forEach((s, k) => { k === i ? s.removeAttribute("aria-hidden") : s.setAttribute("aria-hidden", "true"); });
      $$("button", dots).forEach((b, k) => k === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current"));
    }
    $("#qn").onclick = () => go(i + 1); $("#qp").onclick = () => go(i - 1);
    dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) go($$("button", dots).indexOf(b)); });
    $("#rec").addEventListener("keydown", e => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); });
    let sx = null, sy = 0;
    view.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    view.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
  })();

  /* ---------- footer: projects + links (from data) ---------- */
  $("#f-projects").innerHTML = P.map(p => `<li><button class="lk" type="button" data-open="${p.id}">${esc(p.n)}</button></li>`).join("");
  (function () {
    const want = ["Google Play", "App Store", "Website", "Privacy policy"], out = [];
    P.forEach(p => p.l.forEach(l => { if (want.includes(l[0])) out.push([p.n + " · " + l[0], l[1]]); }));
    $("#f-links").innerHTML = out.map(o => `<li><a href="${esc(o[1])}" target="_blank" rel="noopener">${esc(o[0])}${icon("arrow-ur", "i")}<span class="sr"> (opens in a new tab)</span></a></li>`).join("");
  })();

  /* ---------- local time (Pakistan) ---------- */
  (function () {
    const els = [$("#localtime"), $("#ftime")].filter(Boolean);
    const f = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", timeZone: FACTS.timeZone, timeZoneName: "short" });
    const upd = () => els.forEach(e => e.textContent = f.format(new Date()));
    upd(); setInterval(upd, 30000);
  })();

  /* ---------- copy email (only when configured) ---------- */
  (function () {
    if (!window.CONTACT_EMAIL) return;
    $("#emailtxt").textContent = CONTACT_EMAIL; $("#copyemail").classList.remove("hide");
    const fe = $("#f-email"); fe.textContent = CONTACT_EMAIL; $("#f-email-row").classList.remove("hide");
    const copy = async btn => {
      try { await navigator.clipboard.writeText(CONTACT_EMAIL); } catch (e) { const t = document.createElement("textarea"); t.value = CONTACT_EMAIL; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
      const sm = btn.querySelector("small"); if (sm) { const o = sm.textContent; sm.textContent = "Copied to clipboard"; setTimeout(() => sm.textContent = o, 1800); }
      const u = $("#copyico use"); if (u && btn.id === "copyemail") { u.setAttribute("href", "#i-check"); setTimeout(() => u.setAttribute("href", "#i-copy"), 1800); }
    };
    $("#copyemail").onclick = e => copy(e.currentTarget);
    fe.onclick = e => { const o = fe.textContent; copy(e.currentTarget); fe.textContent = "Copied"; setTimeout(() => fe.textContent = o, 1500); };
  })();

  /* ---------- contact form ---------- */
  (function () {
    const f = $("#cf"), fs = $("#fs"), sb = $("#sb"), sbt = $("#sbt");
    const show = (type, msg, ic) => { fs.hidden = false; fs.className = "fstatus " + type; fs.innerHTML = `${icon(ic)}<span>${esc(msg)}</span>`; };
    const setErr = (id, msg) => { $("#e-" + id).textContent = msg; const inp = $("#f-" + id); inp.setAttribute("aria-invalid", msg ? "true" : "false"); };
    if (!window.FORM_ENDPOINT) { $("#alt").classList.remove("hide"); }
    function validate() {
      let ok = true;
      const n = f.name.value.trim(), m = f.email.value.trim(), g = f.message.value.trim();
      setErr("name", n.length < 2 ? (ok = false, "Please enter your name.") : "");
      setErr("email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m) ? (ok = false, "Please enter a valid email address.") : "");
      setErr("msg", g.length < 10 ? (ok = false, "Please write at least 10 characters.") : "");
      if (!ok) { const first = $('[aria-invalid="true"]', f); first && first.focus(); }
      return ok;
    }
    ["name", "email", "msg"].forEach(k => $("#f-" + k).addEventListener("input", () => { if ($("#f-" + k).getAttribute("aria-invalid") === "true") validate(); }));
    f.addEventListener("submit", async e => {
      e.preventDefault(); if (f.website.value) return; fs.hidden = true;
      if (!validate()) return;
      if (!window.FORM_ENDPOINT) { show("warn", "The contact form isn’t connected yet, so nothing was sent. Please message me on LinkedIn instead.", "alert"); $("#alt").classList.remove("hide"); return; }
      sb.disabled = true; sbt.textContent = "Sending…"; show("ok", "Sending your message…", "clock");
      try {
        const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
        if (!r.ok) throw new Error(r.status);
        f.reset(); show("ok", "Thanks, your message is on its way. I’ll reply as soon as I can.", "check");
      } catch (err) { show("bad", "Couldn’t send your message. Please try again or use LinkedIn.", "alert"); $("#alt").classList.remove("hide"); }
      sb.disabled = false; sbt.textContent = "Send message";
    });
  })();

  /* ---------- mobile menu ---------- */
  const menu = $("#menu"), nl = $("#nlinks");
  function setMenu(open) { nl.classList.toggle("open", open); menu.setAttribute("aria-expanded", open); menu.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  menu.addEventListener("click", () => { const o = !nl.classList.contains("open"); setMenu(o); if (o) { const a = $("a", nl); a && a.focus(); } });
  nl.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nl.classList.contains("open")) { setMenu(false); menu.focus(); }
    if (e.key === "Tab" && nl.classList.contains("open") && matchMedia("(max-width:859px)").matches) {
      const f = [menu, ...$$("a", nl)], a = document.activeElement, i = f.indexOf(a);
      if (e.shiftKey && a === f[0]) { f[f.length - 1].focus(); e.preventDefault(); } else if (!e.shiftKey && a === f[f.length - 1]) { f[0].focus(); e.preventDefault(); }
    }
  });
  document.addEventListener("click", e => { if (nl.classList.contains("open") && !e.target.closest(".nav")) setMenu(false); });

  /* ---------- active section + sliding indicator ---------- */
  const links = $$("a", nl), ind = $("#nind");
  function moveInd(a) {
    if (!a || matchMedia("(max-width:859px)").matches) return;
    ind.style.width = a.offsetWidth + "px"; ind.style.transform = `translateX(${a.offsetLeft}px)`; ind.style.opacity = 1;
  }
  let activeId = "";
  function setActive(id) {
    if (id === activeId) return; activeId = id;
    links.forEach(a => { const on = a.getAttribute("href") === "#" + id; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); if (on) moveInd(a); });
    if (!id) ind.style.opacity = 0;
  }
  const secs = $$("main section[id]");
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
  secs.forEach(s => so.observe(s));
  addEventListener("resize", raf(() => moveInd($("a.on", nl))), { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveInd($("a.on", nl)));

  /* ---------- scroll: progress, navbar state, timeline, back-to-top ---------- */
  const prog = $("#prog"), navw = $("#navw"), tl = $("#tl"), totop = $("#totop");
  const onScroll = raf(() => {
    const h = R.scrollHeight - innerHeight, y = scrollY;
    prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    navw.classList.toggle("scrolled", y > 24);
    totop.classList.toggle("show", y > innerHeight * .9 && y < h - 360);
    const r = tl.getBoundingClientRect();
    tl.style.setProperty("--pr", Math.max(0, Math.min(r.height - 16, innerHeight * .6 - r.top)) + "px");
  });
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- reveal on scroll (once) with stagger ---------- */
  const rvs = $$(".rv");
  if (RM || !("IntersectionObserver" in window)) rvs.forEach(el => el.classList.add("in"));
  else {
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    rvs.forEach(el => ro.observe(el));
  }

  /* ---------- pause decorative loops off-screen ---------- */
  (function () {
    const live = $$("[data-live]"), foot = $("#footer"); if (!("IntersectionObserver" in window)) return;
    const po = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("off", !e.isIntersecting)), { rootMargin: "80px" });
    live.forEach(s => po.observe(s));
    // travelling borders sit on cards across the page — pause each when out of view
    $$(".travel").forEach(t => po.observe(t));
  })();

  /* ---------- pointer effects: spotlight, tilt, magnetic (fine pointers only) ---------- */
  if (FINE && !RM) {
    let tgt = null;
    const move = raf(e => {
      const t = e.target.closest && e.target.closest(".spot,.mag");
      if (!t) return;
      const r = t.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (t.classList.contains("spot")) { t.style.setProperty("--mx", x + "px"); t.style.setProperty("--my", y + "px"); }
      if (t.classList.contains("tilt")) { t.style.setProperty("--ry", ((x / r.width - .5) * 6).toFixed(2) + "deg"); t.style.setProperty("--rx", ((.5 - y / r.height) * 6).toFixed(2) + "deg"); }
      if (t.classList.contains("mag")) { t.style.transform = `translate(${((x / r.width - .5) * 8).toFixed(1)}px,${((y / r.height - .5) * 6).toFixed(1)}px)`; }
      tgt = t;
    });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", e => {
      const t = e.target.closest && e.target.closest(".tilt,.mag"); if (!t || t.contains(e.relatedTarget)) return;
      t.style.removeProperty("--rx"); t.style.removeProperty("--ry"); if (t.classList.contains("mag")) t.style.transform = "";
    }, { passive: true });
  }

  /* ---------- deep link to a case study (#project-id) ---------- */
  if (location.hash.startsWith("#project-")) setTimeout(() => openProject(location.hash.slice(9)), 50);
})();
