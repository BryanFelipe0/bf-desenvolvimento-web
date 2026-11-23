(() => {
  const P = window.POUSADA;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const brl = (n) => (n == null ? "Consulte" : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }));
  const zap = (msg) => `https://wa.me/${P.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* ---------- textos ---------- */
  P.nomeCompleto = `${P.tipo} ${P.nome}`;
  document.querySelectorAll("[data-bind]").forEach((el) => { el.textContent = P[el.dataset.bind] ?? ""; });

  // fotos no tamanho certo para cada tela (celular baixa a menor)
  const largura = (url, w) => url.replace(/w=\d+/, "w=" + w);
  const srcset = (url, ws) => ws.map((w) => `${esc(largura(url, w))} ${w}w`).join(", ");

  /* ---------- hero ---------- */
  const midia = $("#heroMidia");
  midia.innerHTML = P.heroVideo
    ? `<video src="${esc(P.heroVideo)}" autoplay muted loop playsinline preload="metadata" poster="${esc(largura(P.heroFoto, 1200))}"></video>`
    : `<img src="${esc(largura(P.heroFoto, 1200))}" srcset="${srcset(P.heroFoto, [800, 1200, 1800, 2400])}" sizes="100vw" alt="Vista da ${esc(P.nomeCompleto)}" fetchpriority="high" decoding="async">`;
  const titulo = $(".hero-titulo");
  titulo.innerHTML = P.nome.split(" ").map((p) => `<span class="palavra" style="display:inline-block;white-space:nowrap">${[...p].map((c) => `<span class="letra">${esc(c)}</span>`).join("")}</span>`).join(" ");

  /* ---------- reserva ---------- */
  const hoje = new Date();
  const iso = (n) => { const d = new Date(hoje); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const ci = $("#checkin"), co = $("#checkout");
  ci.min = iso(0); co.min = iso(1); ci.value = iso(14); co.value = iso(17);
  const br = (v) => v.split("-").reverse().join("/");
  const noites = () => Math.max(0, Math.round((new Date(co.value) - new Date(ci.value)) / 864e5));
  const atualiza = () => {
    if (co.value <= ci.value) { const d = new Date(ci.value); d.setDate(d.getDate() + 1); co.value = d.toISOString().slice(0, 10); }
    co.min = ci.value;
    const n = noites();
    $("#noites").textContent = `${n} ${n === 1 ? "noite" : "noites"}`;
  };
  ci.addEventListener("change", atualiza); co.addEventListener("change", atualiza); atualiza();
  $("#reserva").addEventListener("submit", (e) => {
    e.preventDefault();
    window.open(zap(`Olá! Quero consultar disponibilidade na ${P.nomeCompleto}.\nCheck-in: ${br(ci.value)}\nCheck-out: ${br(co.value)} (${noites()} noites)\nHóspedes: ${$("#hospedes").value}`), "_blank", "noopener");
  });
  const geral = zap(`Olá! Vi o site da ${P.nomeCompleto} e quero fazer uma reserva.`);
  $("#zapContato").href = geral; $("#zapFlutuante").href = geral;

  /* ---------- números ---------- */
  $("#numeros").innerHTML = P.numeros.map(([v, r]) => `<div><dt>${esc(v)}</dt><dd>${esc(r)}</dd></div>`).join("");

  /* ---------- suítes (Hotel Showcase) ---------- */
  const lista = $("#listaSuites");
  lista.innerHTML = P.quartos.map((q, i) => `
    <li class="suite">
      <button class="suite-botao" type="button" aria-expanded="false" aria-controls="s${i}" data-i="${i}">
        <span class="suite-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="suite-nome">${esc(q.nome)}</span>
        <span class="suite-preco">${q.preco == null ? "valores" : "a partir de"}<b>${brl(q.preco)}</b></span>
        <span class="suite-mais" aria-hidden="true"></span>
      </button>
      <div class="suite-detalhe" id="s${i}">
        <div><div class="suite-detalhe-grid">
          <img src="${esc(largura(q.foto, 1000))}" srcset="${srcset(q.foto, [600, 1000, 1400])}" sizes="(max-width: 1024px) 100vw, 55vw" alt="${esc(q.nome)}" loading="lazy" decoding="async">
          <div>
            <p>${esc(q.resumo)}</p>
            <div class="chips">${q.itens.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
            <p>${q.preco == null ? "Valores e disponibilidade direto com a pousada." : `<strong style="color:var(--areia);font-size:1.4rem">${brl(q.preco)}</strong> por noite.`}</p>
            <a class="btn btn-ouro" href="${zap(`Olá! Quero saber a disponibilidade da ${q.nome} na ${P.nomeCompleto}.`)}" target="_blank" rel="noopener">Consultar esta suíte</a>
          </div>
        </div></div>
      </div>
    </li>`).join("");
  lista.addEventListener("click", (e) => {
    const b = e.target.closest(".suite-botao"); if (!b) return;
    const li = b.parentElement, aberta = li.classList.toggle("aberta");
    b.setAttribute("aria-expanded", aberta);
  });
  // foto que segue o cursor (só em computador)
  const flut = $("#flutuante"), flutImg = flut.querySelector("img");
  if (window.gsap && !reduz && matchMedia("(hover: hover)").matches) {
    P.quartos.forEach((q) => { const im = new Image(); im.src = largura(q.foto, 700); });
    const xTo = gsap.quickTo(flut, "x", { duration: .6, ease: "power3" });
    const yTo = gsap.quickTo(flut, "y", { duration: .6, ease: "power3" });
    gsap.set(flut, { xPercent: -50, yPercent: -50 });
    window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY); });
    lista.querySelectorAll(".suite-botao").forEach((b) => {
      b.addEventListener("mouseenter", () => {
        if (b.parentElement.classList.contains("aberta")) return;
        flutImg.src = largura(P.quartos[b.dataset.i].foto, 700);
        gsap.to(flut, { opacity: 1, scale: 1, rotate: (b.dataset.i % 2 ? 4 : -4), duration: .45, ease: "power3.out" });
      });
      b.addEventListener("mouseleave", () => gsap.to(flut, { opacity: 0, scale: .8, duration: .35 }));
      b.addEventListener("click", () => gsap.to(flut, { opacity: 0, scale: .8, duration: .2 }));
    });
  }

  /* ---------- galeria: 3D Coverflow (Code Makers), versão sem React ---------- */
  const itens = P.galeria, total = itens.length;
  const palco = $("#palco"), pontos = $("#pontos"), fundo = $("#galeriaFundo");
  let atual = 0, pausado = false;
  palco.innerHTML = itens.map((it, i) => `
    <div class="slide" data-i="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${total}: ${esc(it.t1)} ${esc(it.t2)}">
      <img src="${esc(it.foto)}" alt="${esc(it.t1)} ${esc(it.t2)}" loading="lazy" decoding="async">
      <div class="slide-conteudo">
        <div><h3>${esc(it.t1)}<em>${esc(it.t2)}</em></h3><div class="slide-traco"></div><p>${esc(it.desc)}</p></div>
      </div>
    </div>`).join("");
  pontos.innerHTML = itens.map((_, i) => `<button type="button" aria-label="Ir para a foto ${i + 1}"></button>`).join("");
  const slides = [...palco.children], bolas = [...pontos.children];
  const desenha = () => {
    const estreito = innerWidth < 640, d1 = estreito ? 150 : 285, d2 = estreito ? 250 : 510;
    slides.forEach((s, i) => {
      const off = (i - atual + total) % total;
      let t = "translateX(0) scale(.4)", o = 0, z = 0, f = "brightness(.4) blur(2px)";
      if (off === 0) { t = "translateX(0) scale(1) rotateY(0)"; o = 1; z = 30; f = "brightness(1)"; }
      else if (off === 1) { t = `translateX(${d1}px) scale(.84) rotateY(-24deg)`; o = .65; z = 20; f = "brightness(.75)"; }
      else if (off === 2) { t = `translateX(${d2}px) scale(.68) rotateY(-38deg)`; o = .38; z = 10; f = "brightness(.55) blur(1px)"; }
      else if (off === total - 1) { t = `translateX(-${d1}px) scale(.84) rotateY(24deg)`; o = .65; z = 20; f = "brightness(.75)"; }
      else if (off === total - 2) { t = `translateX(-${d2}px) scale(.68) rotateY(38deg)`; o = .38; z = 10; f = "brightness(.55) blur(1px)"; }
      Object.assign(s.style, { transform: t, opacity: o, zIndex: z, filter: f });
      s.classList.toggle("centro", off === 0);
      s.setAttribute("aria-hidden", off !== 0);
    });
    bolas.forEach((b, i) => b.classList.toggle("ativo", i === atual));
    fundo.src = largura(itens[atual].foto, 400); // fundo borrado: foto pequena basta
  };
  const vai = (i) => { atual = (i + total) % total; desenha(); };
  $("#setaEsq").onclick = () => vai(atual - 1);
  $("#setaDir").onclick = () => vai(atual + 1);
  bolas.forEach((b, i) => (b.onclick = () => vai(i)));
  slides.forEach((s, i) => s.addEventListener("click", () => i !== atual && vai(i)));
  const gal = $("#galeria");
  gal.addEventListener("mouseenter", () => (pausado = true));
  gal.addEventListener("mouseleave", () => (pausado = false));
  gal.tabIndex = -1;
  document.addEventListener("keydown", (e) => {
    const r = gal.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    if (e.key === "ArrowLeft") vai(atual - 1); if (e.key === "ArrowRight") vai(atual + 1);
  });
  let x0 = 0;
  palco.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  palco.addEventListener("touchend", (e) => { const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 45) vai(atual + (d < 0 ? 1 : -1)); });
  addEventListener("resize", desenha);
  if (!reduz) setInterval(() => !pausado && !document.hidden && vai(atual + 1), 5000);
  desenha();

  /* ---------- listas ---------- */
  $("#fotoRegiao").srcset = srcset(P.fotoRegiao, [800, 1200, 1800]);
  $("#fotoRegiao").sizes = "(max-width: 1024px) 100vw, 50vw";
  $("#fotoRegiao").src = largura(P.fotoRegiao, 1200);
  $("#listaRegiao").innerHTML = P.regiao.map(([t, d, dist]) => `<li><strong>${esc(t)}</strong><span>${esc(dist)}</span><p>${esc(d)}</p></li>`).join("");
  $("#horarios").innerHTML = P.horarios.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("");
  $("#faq").innerHTML = P.faq.map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("");

  /* ---------- topo fixo ---------- */
  const topo = $("#topo");
  addEventListener("scroll", () => topo.classList.toggle("fixo", scrollY > innerHeight * .6), { passive: true });

  /* ---------- motion (GSAP) ---------- */
  if (!window.gsap || reduz) return;
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.from(".hero-midia > *", { scale: 1.25, duration: 2.6, ease: "power2.out" })
    .from(".hero-titulo .letra", { yPercent: 110, opacity: 0, rotate: 6, duration: 1.4, stagger: .045 }, .2)
    .from(".hero-slogan", { y: 24, opacity: 0, duration: 1.2 }, .6)
    .from(".reserva", { y: 40, opacity: 0, duration: 1.2 }, .9)
    .from(".topo", { y: -20, opacity: 0, duration: 1 }, .9);
  // drone falso: a foto avança e sobe conforme rola (troca por vídeo de drone quando houver)
  gsap.to(".hero-midia > *", { scale: 1.18, yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-conteudo", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });
  // títulos e blocos entram de baixo
  gsap.utils.toArray(".revela").forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.from(".numeros div", { y: 30, opacity: 0, duration: 1, stagger: .1, ease: "expo.out", scrollTrigger: { trigger: ".numeros", start: "top 90%" } });
  gsap.from(".suite", { y: 40, opacity: 0, duration: 1, stagger: .08, ease: "expo.out", scrollTrigger: { trigger: ".lista-suites", start: "top 85%" } });
  gsap.from(".linha", { x: 30, opacity: 0, duration: .9, stagger: .07, ease: "expo.out", scrollTrigger: { trigger: ".tabela", start: "top 85%" } });
  gsap.to(".regiao-foto img", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".regiao", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".lista-regiao li", { y: 30, opacity: 0, duration: 1, stagger: .1, ease: "expo.out", scrollTrigger: { trigger: ".lista-regiao", start: "top 88%" } });
})();
