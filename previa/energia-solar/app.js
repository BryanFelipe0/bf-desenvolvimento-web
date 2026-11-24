(() => {
  const E = window.SOLAR;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const num = (v, d = 0) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const celular = matchMedia("(max-width: 760px)").matches;
  const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const foto = (ref, w = 1600, h) => (ref.includes("/") || ref.includes(".") ? ref : `https://images.unsplash.com/${ref}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=82`);
  const wa = (txt) => `https://wa.me/${E.whatsapp}?text=${encodeURIComponent(txt)}`;

  /* ---------- textos ---------- */
  const binds = { ...E, sistemasTxt: num(E.sistemas), anosTxt: `${E.anos} anos` };
  $$("[data-bind]").forEach((el) => (el.textContent = binds[el.dataset.bind] ?? ""));
  document.title = `${E.nomeCompleto} | Energia solar em ${E.cidade}`;
  $('meta[name="description"]').content = `Energia solar em ${E.cidade} e região: simule sua economia, financie em até 60x e instale em um dia. ${num(E.sistemas)} sistemas instalados.`;
  $$("[data-wa]").forEach((a) => (a.href = wa(a.dataset.wa)));
  $("#linkInsta").href = "https://instagram.com/" + E.instagram.replace("@", "");
  $("#linkMapa").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(E.endereco);

  /* ---------- rolagem suave ---------- */
  let lenis = null;
  if (!calmo && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.2, smoothWheel: true });
    const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (ev) => {
      const alvo = a.getAttribute("href").length > 1 && $(a.getAttribute("href"));
      if (alvo) { ev.preventDefault(); lenis.scrollTo(alvo, { offset: -10 }); }
    }));
  }
  const progresso = (el) => { const r = el.getBoundingClientRect(); return limitar(-r.top / (r.height - innerHeight)); };

  /* ================= FILME ================= */
  const H = E.hero, tela = $("#tela"), ctx = tela.getContext("2d");
  // tela em pé (celular) usa quadros cortados em pé, para não esticar a imagem
  const emPe = innerWidth / innerHeight < 0.8;
  const nums = []; for (let i = 1; i <= H.total; i += H.passo || 1) nums.push(i);
  const pasta = emPe ? H.pastaCel : H.pastaPc;
  const quadros = nums.map(() => null);
  const carregar = (k) => new Promise((ok) => {
    const img = new Image(); img.decoding = "async";
    // decodifica antes de usar: assim a imagem já está pronta na memória e não engasga ao aparecer
    img.onload = () => { (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => { quadros[k] = img; ok(); }); };
    img.onerror = ok;
    img.src = `${pasta}${String(nums[k]).padStart(3, "0")}.webp`;
  });
  // ordem de carga: primeiro um quadro a cada 16, depois a cada 4, depois o resto.
  // Assim o filme já "anda" no scroll antes de tudo baixar.
  const ordem = []; const visto = new Set();
  for (const passo of [16, 4, 1]) for (let k = 0; k < nums.length; k += passo) if (!visto.has(k)) { visto.add(k); ordem.push(k); }
  carregar(0).then(() => desenharFilme(true));
  (async () => { let i = 1; const fila = async () => { while (i < ordem.length) await carregar(ordem[i++]); }; await Promise.all(Array.from({ length: 6 }, fila)); })();

  const proximo = (k) => { // quadro carregado mais perto
    for (let d = 0; d < quadros.length; d++) { if (quadros[k - d]) return quadros[k - d]; if (quadros[k + d]) return quadros[k + d]; }
    return null;
  };
  function ajustar() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    tela.width = Math.round(tela.clientWidth * dpr); tela.height = Math.round(tela.clientHeight * dpr);
    desenharFilme(true);
  }
  $("#etapas").innerHTML = H.etapas.map((e, i) => `<div class="etapa"><p class="etapa-rotulo">${String(i + 1).padStart(2, "0")}<span>${e.rotulo}</span></p><h2>${e.titulo}</h2><p>${e.texto}</p></div>`).join("");
  const arco = $("#arcoFeito"), arcoLen = arco.getTotalLength();
  arco.style.strokeDasharray = arcoLen;
  const economiaAnoExemplo = (980 - 96) * 12;
  let ultimo = -1;
  const pintar = (img, alfa) => {
    const W = tela.width, Ht = tela.height, esc = Math.max(W / img.width, Ht / img.height);
    ctx.globalAlpha = alfa;
    ctx.drawImage(img, (W - img.width * esc) / 2, (Ht - img.height * esc) / 2, img.width * esc, img.height * esc);
    ctx.globalAlpha = 1;
  };
  // progresso suavizado: a cada quadro de tela (60 por segundo) o filme anda uma fração até onde o scroll está.
  // Isso deixa o movimento contínuo mesmo quando a rolagem vem em "pulos" (roda do mouse, dedo no celular).
  let pSuave = progresso($("#inicio"));
  function desenharFilme(forcar) {
    const alvo = progresso($("#inicio"));
    pSuave += (alvo - pSuave) * (calmo ? 1 : 0.16);
    if (Math.abs(alvo - pSuave) < 0.00005) pSuave = alvo;
    const p = pSuave;
    // posição "entre" dois quadros: desenha o atual e mistura o próximo por cima, na proporção certa
    const f = p * (nums.length - 1), k = Math.floor(f), t = f - k;
    if (forcar || Math.abs(f - ultimo) > 0.004) {
      const a = quadros[k] || proximo(k), b = quadros[k + 1];
      if (a) {
        ultimo = f;
        ctx.imageSmoothingQuality = "high";
        pintar(a, 1);
        if (b && t > 0.02) pintar(b, t);
      }
    }
    $("#abertura").style.opacity = limitar(1 - p / 0.045);
    $("#abertura").style.visibility = p > 0.05 ? "hidden" : "visible";
    $("#dica").style.opacity = limitar(1 - p / 0.015);
    const atual = H.etapas.findIndex((e) => p <= e.ate);
    $$(".etapa").forEach((el, i) => el.classList.toggle("ativa", p > 0.05 && i === atual));
    $("#contador").textContent = `${String(atual + 1).padStart(2, "0")} / ${String(H.etapas.length).padStart(2, "0")}`;
    $("#progresso").style.transform = `scaleX(${p})`;
    // sol andando no arco e a economia subindo junto
    arco.style.strokeDashoffset = arcoLen * (1 - p);
    const pt = arco.getPointAtLength(arcoLen * p);
    $("#arcoSol").setAttribute("cx", pt.x); $("#arcoSol").setAttribute("cy", pt.y);
    $("#painelValor").textContent = brl(economiaAnoExemplo * p);
    $(".painel-sol").style.opacity = limitar((p - 0.04) / 0.04);
  }
  addEventListener("resize", ajustar);
  ajustar();

  /* ================= SIMULADOR ================= */
  const S = E.simulador;
  const conta = $("#conta");
  conta.min = S.contaMin; conta.max = S.contaMax; conta.value = S.contaPadrao;
  $("#contaMinTxt").textContent = brl(S.contaMin); $("#contaMaxTxt").textContent = brl(S.contaMax) + "+";
  let tipo = 0;
  $("#tipos").innerHTML = S.tipos.map((t, i) => `<button type="button" role="radio" class="tipo" aria-checked="${i === 0}" data-i="${i}">${t.nome}</button>`).join("");
  $("#tipos").addEventListener("click", (e) => { const b = e.target.closest(".tipo"); if (!b) return; tipo = +b.dataset.i; $$(".tipo").forEach((x, i) => x.setAttribute("aria-checked", i === tipo)); calcular(); });

  function calcular() {
    const v = +conta.value;
    const consumo = v / S.tarifa;
    const gerar = Math.max(consumo - S.taxaMinima, 30);
    const placas = Math.max(4, Math.ceil((gerar / (S.sol * 30 * S.perdas)) * 1000 / S.placaW));
    const kwp = (placas * S.placaW) / 1000;
    const area = placas * S.areaPlaca;
    const invest = Math.round((kwp * S.precoKwp * (tipo === 2 ? 0.95 : 1)) / 100) * 100;
    const minima = S.taxaMinima * S.tarifa;
    const contaSolar = Math.min(v, minima + (v - minima) * (1 - S.fioB));
    const ecoMes = v - contaSolar;
    let eco25 = 0; for (let a = 0; a < 25; a++) eco25 += ecoMes * 12 * Math.pow(1 + S.reajuste, a) * (1 - 0.005 * a);
    const anos = invest / (ecoMes * 12);
    const i = S.jurosMes, parcela = invest * i / (1 - Math.pow(1 + i, -S.parcelas));

    $("#contaTxt").textContent = brl(v);
    conta.setAttribute("aria-valuetext", brl(v));
    $("#ecoMes").textContent = brl(ecoMes);
    $("#eco25").textContent = brl(Math.round(eco25 / 1000) * 1000);
    const a = Math.floor(anos), m = Math.round((anos - a) * 12);
    $("#ecoPayback").textContent = a ? `${a} ano${a > 1 ? "s" : ""}${m ? ` e ${m} meses` : ""}` : `${m} meses`;
    $("#ecoPlacas").textContent = `${placas} de ${S.placaW} W`;
    $("#ecoKwp").textContent = `${num(kwp, 2)} kWp`;
    $("#ecoArea").textContent = `${num(area)} m²`;
    $("#ecoInvest").textContent = brl(invest);

    const topo = Math.max(v, parcela + contaSolar);
    $("#barraHoje").style.width = (v / topo) * 100 + "%";
    $("#barraSolar").style.width = (contaSolar / topo) * 100 + "%";
    $("#barraParcela").style.width = ((parcela + contaSolar) / topo) * 100 + "%";
    $("#valHoje").textContent = brl(v);
    $("#valSolar").textContent = brl(contaSolar);
    $("#valParcela").textContent = brl(parcela + contaSolar);
    $("#barraNota").textContent = parcela + contaSolar < v
      ? `Financiando em ${S.parcelas}x, a parcela mais a taxa mínima já fica ${brl(v - parcela - contaSolar)} abaixo da conta de hoje.`
      : `Financiando em ${S.parcelas}x, a parcela fica perto da conta de hoje. Depois de quitar, a economia é toda sua.`;

    const msg = `Olá! Fiz a simulação no site da ${E.nomeCompleto}:\n\n• Conta de luz hoje: ${brl(v)}\n• Local: ${S.tipos[tipo].nome}\n• Sistema: ${placas} placas, ${num(kwp, 2)} kWp\n• Economia estimada: ${brl(ecoMes)} por mês\n• Investimento estimado: ${brl(invest)}\n\nQuero receber o projeto e agendar a visita técnica.`;
    $("#ecoEnviar").href = wa(msg);
  }
  conta.addEventListener("input", calcular);
  calcular();

  /* ================= COMO FUNCIONA (horizontal) ================= */
  $("#trilho").innerHTML = E.processo.map((s, i) => `
    <article class="passo">
      <img src="${foto(s.foto, 1200, 900)}" alt="" loading="lazy">
      <div class="passo-texto"><span class="passo-num">${String(i + 1).padStart(2, "0")}</span><h3>${s.titulo}</h3><p>${s.texto}</p></div>
    </article>`).join("");
  // checa o tamanho da tela o tempo todo (antes, abrir pequeno e ir para tela cheia travava a rolagem de lado)
  const mqCel = matchMedia("(max-width: 760px)");
  let alturaProc = 0;
  function desenharProcesso() {
    const sec = $("#processo"), trilho = $("#trilho");
    if (mqCel.matches) { if (alturaProc) { sec.style.height = ""; alturaProc = 0; } trilho.style.transform = ""; return; }
    // a seção tem exatamente a altura necessária para o trilho andar até o fim
    const fim = Math.max(trilho.scrollWidth - innerWidth, 0);
    const alvo = Math.round(fim + innerHeight * 1.15);
    if (Math.abs(alvo - alturaProc) > 2) { alturaProc = alvo; sec.style.height = alvo + "px"; }
    const p = progresso(sec);
    trilho.style.transform = `translateX(${-p * fim}px)`;
    $("#procBarra").style.transform = `scaleX(${p})`;
  }

  /* ================= OBRAS, DEPOIMENTOS, DÚVIDAS ================= */
  $("#obrasGrade").innerHTML = E.galeria.map((g) => `
    <figure class="obra"><img src="${foto(g.foto, 1400)}" alt="${g.nome}" loading="lazy"><figcaption><b>${g.nome}</b><span>${g.info}</span></figcaption></figure>`).join("");
  $("#depoimentos").innerHTML = E.depoimentos.map((d) => `<figure class="dep"><blockquote>${d.texto}</blockquote><figcaption>${d.nome}<span>${d.lugar}</span></figcaption></figure>`).join("");
  $("#listaDuvidas").innerHTML = E.duvidas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join("");

  /* ================= laço ================= */
  const topo = $("#topo");
  (function quadro() {
    desenharFilme(false);
    desenharProcesso();
    topo.classList.toggle("solido", $("#inicio").getBoundingClientRect().bottom < 80);
    requestAnimationFrame(quadro);
  })();
})();
