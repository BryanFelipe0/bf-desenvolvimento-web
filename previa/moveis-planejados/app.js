(() => {
  const M = window.MARCENARIA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const celular = matchMedia("(max-width: 760px)").matches;
  const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const foto = (ref, w = 1600, h) => (ref.includes("/") || ref.includes(".") ? ref : `https://images.unsplash.com/${ref}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=82`);
  const wa = (txt) => `https://wa.me/${M.whatsapp}?text=${encodeURIComponent(txt)}`;

  /* ---------- textos ---------- */
  const binds = { ...M, garantiaTxt: `${M.garantia} anos`, projetosTxt: `${M.projetos}+` };
  $$("[data-bind]").forEach((el) => (el.textContent = binds[el.dataset.bind] ?? ""));
  document.title = `${M.nomeCompleto} | Móveis planejados em ${M.cidade}`;
  $('meta[name="description"]').content = `Móveis planejados sob medida em ${M.cidade}: cozinhas, closets e dormitórios, com projeto 3D grátis e ${M.garantia} anos de garantia.`;
  $$("[data-wa]").forEach((a) => (a.href = wa(a.dataset.wa)));
  $("#linkInsta").href = "https://instagram.com/" + M.instagram.replace("@", "");
  $("#linkMapa").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(M.endereco);

  /* ---------- rolagem suave (Lenis) ---------- */
  let lenis = null;
  if (!calmo && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (ev) => {
      const alvo = a.getAttribute("href").length > 1 && $(a.getAttribute("href"));
      if (alvo) { ev.preventDefault(); lenis.scrollTo(alvo, { offset: -10 }); }
    }));
  }

  /* ---------- progresso de uma seção alta (0 no topo, 1 no fim) ---------- */
  const progresso = (el) => {
    const r = el.getBoundingClientRect();
    return limitar(-r.top / (r.height - innerHeight));
  };

  /* ================= FILME: quadros presos ao scroll ================= */
  const H = M.hero, tela = $("#tela"), ctx = tela.getContext("2d");
  const passo = celular ? 2 : 1;
  const indices = [];
  for (let i = 1; i <= H.total; i += passo) indices.push(i);
  const quadros = indices.map(() => null);
  const caminho = (n) => `${H.pasta}${String(n).padStart(3, "0")}.webp`;

  function carregar(k) {
    return new Promise((ok) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { quadros[k] = img; ok(); };
      img.onerror = ok;
      img.src = caminho(indices[k]);
    });
  }
  // primeiro quadro já, o resto em filas paralelas
  carregar(0).then(() => { desenharFilme(true); });
  (async () => {
    let prox = 1;
    const fila = async () => { while (prox < indices.length) { const k = prox++; await carregar(k); } };
    await Promise.all(Array.from({ length: 6 }, fila));
  })();

  function ajustarTela() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    tela.width = Math.round(tela.clientWidth * dpr);
    tela.height = Math.round(tela.clientHeight * dpr);
    desenharFilme(true);
  }
  let ultimo = -1;
  function desenharFilme(forcar) {
    const p = progresso($("#inicio"));
    let k = Math.round(p * (indices.length - 1));
    while (k > 0 && !quadros[k]) k--; // usa o quadro carregado mais próximo
    const img = quadros[k];
    if (img && (forcar || k !== ultimo)) {
      ultimo = k;
      const W = tela.width, Ht = tela.height, esc = Math.max(W / img.width, Ht / img.height);
      const w = img.width * esc, h = img.height * esc;
      ctx.drawImage(img, (W - w) / 2, (Ht - h) / 2, w, h);
    }
    // textos amarrados ao mesmo progresso
    $("#abertura").style.opacity = limitar(1 - p / 0.07);
    $("#abertura").style.transform = `translateY(${-p * 300}px)`;
    $("#abertura").style.visibility = p > 0.08 ? "hidden" : "visible";
    $("#dica").style.opacity = limitar(1 - p / 0.02);
    const atual = H.etapas.findIndex((e) => p <= e.ate);
    $$(".etapa", $("#etapas")).forEach((el, i) => el.classList.toggle("ativa", p > 0.08 && i === atual));
    $("#contador").textContent = `${String(atual + 1).padStart(2, "0")} / ${String(H.etapas.length).padStart(2, "0")}`;
    $("#progresso").style.transform = `scaleX(${p})`;
  }
  $("#etapas").innerHTML = H.etapas.map((e) => `<div class="etapa"><h2>${e.titulo}</h2><p>${e.texto}</p></div>`).join("");
  addEventListener("resize", ajustarTela);
  ajustarTela();

  /* ================= DO PROJETO AO PRONTO ================= */
  const C = M.comparacao;
  $("#cmpPronto").src = foto(C.foto, 1800);
  $("#cmpRender").src = foto(C.render || C.foto, 1800);
  if (!C.render) $("#comparar").classList.add("render-simulado");
  const mover = (v) => {
    $("#cmpProjeto").style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    $("#cmpAlca").style.left = v + "%";
  };
  $("#cmpRange").addEventListener("input", (e) => mover(+e.target.value));
  mover(50);

  /* ================= PORTFÓLIO: zoom no scroll ================= */
  const POS = [
    { t: 0, l: 0, w: 25, h: 25, s: 4 },
    { t: -30, l: 5, w: 35, h: 30, s: 5 },
    { t: -10, l: -25, w: 20, h: 45, s: 6 },
    { t: 0, l: 27.5, w: 25, h: 25, s: 5 },
    { t: 27.5, l: 5, w: 20, h: 25, s: 6 },
    { t: 27.5, l: -22.5, w: 30, h: 25, s: 8 },
    { t: 22.5, l: 25, w: 15, h: 15, s: 9 },
  ];
  $("#galeria").innerHTML = M.portfolio.slice(0, POS.length).map((pr, i) => {
    const q = POS[i];
    return `<figure class="gfoto" style="--t:${q.t}vh;--l:${q.l}vw;--w:${q.w}vw;--h:${q.h}vh">
      <img src="${foto(pr.foto, i === 0 ? 2000 : 1000)}" alt="${pr.nome}, ${pr.lugar}" loading="lazy">
    </figure>`;
  }).join("");
  const gfotos = $$(".gfoto");
  const centro = M.portfolio[0];
  function desenharGaleria() {
    const p = progresso($("#projetos"));
    gfotos.forEach((f, i) => { f.style.transform = `scale(${1 + p * (POS[i].s - 1)})`; });
    $(".galeria-titulo").style.opacity = limitar(1 - p / 0.12);
    const leg = $("#galeriaLegenda");
    leg.textContent = `${centro.nome}, ${centro.lugar}`;
    leg.style.opacity = limitar((p - 0.7) / 0.2);
  }

  /* ================= FRASE: palavras acendem ================= */
  const frase = $("#frase");
  frase.innerHTML = frase.textContent.split(" ").map((w) => `<span>${w}</span>`).join(" ");
  const palavras = $$("span", frase);
  function desenharFrase() {
    const r = frase.getBoundingClientRect();
    const p = limitar((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35));
    palavras.forEach((s, i) => s.classList.toggle("acesa", i / palavras.length < p));
  }

  /* ================= COMO FUNCIONA ================= */
  $("#procFotos").innerHTML = M.processo.map((s, i) => `<img src="${foto(s.foto, 1400)}" alt="" class="${i === 0 ? "ativa" : ""}" loading="lazy">`).join("");
  $("#passos").innerHTML = M.processo.map((s, i) => `<li class="${i === 0 ? "ativo" : ""}" data-i="${i}"><span class="passo-num">${String(i + 1).padStart(2, "0")}</span><h3>${s.titulo}</h3><p>${s.texto}</p></li>`).join("");
  const ioPasso = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting) return;
    const i = +e.target.dataset.i;
    $$("#passos li").forEach((li, j) => li.classList.toggle("ativo", j === i));
    $$("#procFotos img").forEach((im, j) => im.classList.toggle("ativa", j === i));
  }), { rootMargin: "-45% 0px -45% 0px" });
  $$("#passos li").forEach((li) => ioPasso.observe(li));

  /* ================= ACABAMENTOS ================= */
  let acab = 0;
  function renderAcab() {
    const a = M.acabamentos[acab];
    const amostra = $("#acabAmostra");
    // cor lisa ganha um reflexo suave, para parecer uma porta e não um buraco
    amostra.style.backgroundImage = a.foto ? `url("${foto(a.foto, 1400)}")` : "linear-gradient(115deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,.18) 100%)";
    amostra.style.backgroundColor = a.cor || "transparent";
    amostra.dataset.nome = a.nome;
    $("#acabEscolhido").textContent = `${a.nome}, ${a.tipo.toLowerCase()}`;
    $$(".acab-item").forEach((b, i) => { b.setAttribute("aria-checked", i === acab); b.tabIndex = i === acab ? 0 : -1; });
  }
  $("#acabLista").innerHTML = M.acabamentos.map((a, i) => `
    <button type="button" role="radio" class="acab-item" data-i="${i}" aria-label="${a.nome}, ${a.tipo}">
      <span class="acab-chip" style="${a.foto ? `background-image:url('${foto(a.foto, 200, 200)}')` : `background:${a.cor}`}"></span>
      <span class="acab-nome">${a.nome}</span>
    </button>`).join("");
  $("#acabLista").addEventListener("click", (e) => { const b = e.target.closest(".acab-item"); if (b) { acab = +b.dataset.i; renderAcab(); calcular(); } });
  $("#acabLista").addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    acab = (acab + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + M.acabamentos.length) % M.acabamentos.length;
    renderAcab(); calcular(); $$(".acab-item")[acab].focus();
  });
  renderAcab();

  /* ================= SIMULADOR ================= */
  const S = M.simulador;
  const est = { amb: 0, metros: S.ambientes[0].padrao, padrao: 1, extras: new Set(["ferragens"]) };
  $("#simAmbientes").innerHTML = S.ambientes.map((a, i) => `<button type="button" class="sim-amb" data-i="${i}" aria-pressed="${i === 0}">${a.nome}</button>`).join("");
  $("#simPadroes").innerHTML = S.padroes.map((p, i) => `
    <label class="sim-padrao"><input type="radio" name="padrao" value="${i}" ${i === est.padrao ? "checked" : ""}>
      <span><b>${p.nome}</b><small>${p.texto}</small></span></label>`).join("");
  $("#simExtras").innerHTML = S.extras.map((x) => `
    <label class="sim-extra"><input type="checkbox" value="${x.id}" ${est.extras.has(x.id) ? "checked" : ""}><span>${x.nome}</span></label>`).join("");

  const metros = $("#simMetros");
  function prepararMetros() {
    const a = S.ambientes[est.amb];
    metros.min = a.min; metros.max = a.max; metros.value = est.metros = a.padrao;
  }
  const fmtM = (v) => `${String(v).replace(".", ",")} m`;
  const arred = (v) => Math.round(v / 100) * 100;

  function calcular() {
    const a = S.ambientes[est.amb];
    const base = est.metros * a.porMetro[est.padrao];
    const extras = S.extras.filter((x) => est.extras.has(x.id));
    const total = base + extras.reduce((s, x) => s + x.porMetro * est.metros, 0);
    const min = arred(total * (1 - S.margem)), max = arred(total * (1 + S.margem));
    const acabamento = M.acabamentos[acab];
    $("#simMedidaTxt").textContent = fmtM(est.metros);
    metros.setAttribute("aria-valuetext", fmtM(est.metros));
    $("#simResumo").textContent = `${a.nome} de ${fmtM(est.metros)}, padrão ${S.padroes[est.padrao].nome.toLowerCase()}`;
    $("#simMin").textContent = brl(min);
    $("#simMax").textContent = brl(max);
    $("#simParcela").textContent = `ou em até 12x de ${brl(Math.ceil(((min + max) / 2) / 12))}`;
    const itens = [`Acabamento: ${acabamento.nome}`, ...extras.map((x) => x.nome)];
    $("#simItens").innerHTML = itens.map((t) => `<li>${t}</li>`).join("");
    const msg = `Olá! Fiz uma simulação no site da ${M.nomeCompleto}:\n\n• Ambiente: ${a.nome}\n• Tamanho: ${fmtM(est.metros)} de parede\n• Padrão: ${S.padroes[est.padrao].nome}\n• Acabamento: ${acabamento.nome}${extras.length ? `\n• Extras: ${extras.map((x) => x.nome).join(", ")}` : ""}\n\nEstimativa: ${brl(min)} a ${brl(max)}\n\nQuero agendar a visita para medir e receber o projeto 3D.`;
    $("#simEnviar").href = wa(msg);
  }
  $("#simAmbientes").addEventListener("click", (e) => {
    const b = e.target.closest(".sim-amb"); if (!b) return;
    est.amb = +b.dataset.i;
    $$(".sim-amb").forEach((x, i) => x.setAttribute("aria-pressed", i === est.amb));
    prepararMetros(); calcular();
  });
  metros.addEventListener("input", () => { est.metros = +metros.value; calcular(); });
  $("#simPadroes").addEventListener("change", (e) => { est.padrao = +e.target.value; calcular(); });
  $("#simExtras").addEventListener("change", (e) => { e.target.checked ? est.extras.add(e.target.value) : est.extras.delete(e.target.value); calcular(); });
  prepararMetros(); calcular();

  /* ================= DEPOIMENTOS E DÚVIDAS ================= */
  $("#depoimentos").innerHTML = M.depoimentos.map((d) => `<figure class="dep"><blockquote>${d.texto}</blockquote><figcaption>${d.nome}<span>${d.lugar}</span></figcaption></figure>`).join("");
  $("#listaDuvidas").innerHTML = M.duvidas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join("");

  /* ================= laço de desenho ================= */
  const topo = $("#topo");
  function quadro() {
    desenharFilme(false);
    desenharGaleria();
    desenharFrase();
    topo.classList.toggle("solido", $("#inicio").getBoundingClientRect().bottom < 80);
    requestAnimationFrame(quadro);
  }
  requestAnimationFrame(quadro);
})();
