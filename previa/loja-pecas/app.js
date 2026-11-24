(() => {
  const L = window.LOJA;
  const $ = (s, el = document) => el.querySelector(s);
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const ETAPAS = [
    { key: "cpu", art: "o processador", nome: "Processador", dica: "Define a plataforma: o resto precisa combinar com ele." },
    { key: "placa", art: "a placa-mãe", nome: "Placa-mãe", dica: "Precisa ter o mesmo encaixe (socket) do processador." },
    { key: "ram", art: "a memória", nome: "Memória RAM", dica: "16 GB para o básico, 32 GB para jogos e edição." },
    { key: "gpu", art: "a placa de vídeo", nome: "Placa de vídeo", dica: "A peça que mais pesa nos jogos." },
    { key: "ssd", art: "o SSD", nome: "Armazenamento", dica: "SSD NVMe: o Windows liga em segundos." },
    { key: "fonte", nome: "Fonte", dica: "Precisa aguentar o consumo com folga." },
    { key: "gabinete", art: "o gabinete", nome: "Gabinete", dica: "Precisa caber a placa-mãe e a placa de vídeo." },
    { key: "cooler", art: "o cooler", nome: "Cooler", dica: "Mantém o processador frio e silencioso." },
  ];
  const P = L.pecas;
  const achar = (k, id) => P[k].find((p) => p.id === id);
  const sel = {}; // key -> id
  let aberta = "cpu";

  /* ---------- textos da loja ---------- */
  const pixTxt = Math.round(L.descontoPix * 100) + "%";
  const binds = { ...L, parcelas: L.parcelas + "x", pix: pixTxt, destaqueNome: L.destaque.nome };
  document.querySelectorAll("[data-bind]").forEach((el) => { el.textContent = binds[el.dataset.bind] ?? ""; });
  document.title = `${L.nome} | Peças e PCs montados em ${L.cidade}`;
  $('meta[name="description"]').content = `Monte seu PC com conferência de compatibilidade e peça o orçamento pelo WhatsApp. ${L.nome}, ${L.cidade} - ${L.estado}.`;
  const wa = (txt) => `https://wa.me/${L.whatsapp}?text=${encodeURIComponent(txt)}`;
  document.querySelectorAll("[data-wa]").forEach((a) => (a.href = wa(a.dataset.wa)));
  $("#linkInsta").href = "https://instagram.com/" + L.instagram.replace("@", "");
  $("#linkMapa").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(L.endereco);

  /* ---------- compatibilidade ---------- */
  const consumo = () => {
    const c = achar("cpu", sel.cpu), g = achar("gpu", sel.gpu);
    if (!c && !g) return 0;
    return (c ? c.consumo : 0) + (g ? g.consumo : 0) + 75; // 75 W para placa, memória, SSD e fans
  };

  // Motivo pelo qual a peça não encaixa com o que já foi escolhido (ou null)
  function motivo(k, p) {
    const cpu = achar("cpu", sel.cpu), placa = achar("placa", sel.placa), gpu = achar("gpu", sel.gpu), gab = achar("gabinete", sel.gabinete);
    if (k === "placa" && cpu && p.socket !== cpu.socket) return `Encaixe ${p.socket}, o processador é ${cpu.socket}`;
    if (k === "cpu" && placa && p.socket !== placa.socket) return `Encaixe ${p.socket}, a placa-mãe é ${placa.socket}`;
    if (k === "ram") {
      const tipo = placa ? placa.ram : cpu ? cpu.ram : null;
      if (tipo && p.tipo !== tipo) return `É ${p.tipo}, sua ${placa ? "placa-mãe" : "plataforma"} usa ${tipo}`;
    }
    if (k === "gpu" && p.semPlaca && cpu && !cpu.video) return "Esse processador não tem vídeo integrado";
    if (k === "gpu" && gab && p.comprimento > gab.gpuMax) return `Tem ${p.comprimento} mm, o gabinete aceita até ${gab.gpuMax} mm`;
    if (k === "gabinete" && placa && !p.formatos.includes(placa.formato)) return `Não cabe placa-mãe ${placa.formato === "ATX" ? "ATX" : "Micro-ATX"}`;
    if (k === "gabinete" && gpu && gpu.comprimento > p.gpuMax) return `Aceita placa de vídeo até ${p.gpuMax} mm`;
    if (k === "fonte" && consumo() > p.watts) return `Seu PC consome cerca de ${consumo()} W`;
    if (k === "cooler" && p.box && cpu && !cpu.coolerIncluso) return "Esse processador vem sem cooler";
    if (k === "cooler" && cpu && p.aguenta < cpu.consumo) return `Pouco para os ${cpu.consumo} W do processador`;
    return null;
  }

  function avisos() {
    const lista = [];
    ETAPAS.forEach(({ key, nome }) => {
      const p = achar(key, sel[key]);
      if (p) { const m = motivo(key, p); if (m) lista.push({ tipo: "erro", txt: `${nome}: ${m.charAt(0).toLowerCase() + m.slice(1)}.` }); }
    });
    const f = achar("fonte", sel.fonte), w = consumo();
    if (f && w <= f.watts && w * 1.25 > f.watts) lista.push({ tipo: "alerta", txt: `A fonte fica perto do limite. Uma de ${Math.ceil((w * 1.3) / 50) * 50} W dá mais folga.` });
    const faltam = ETAPAS.filter((e) => !sel[e.key]);
    if (faltam.length && faltam.length < ETAPAS.length) lista.push({ tipo: "falta", txt: `Falta escolher ${faltam.map((e) => e.art).join(", ").replace(/, ([^,]*)$/, " e $1")}.` });
    if (!lista.length && faltam.length === 0) lista.push({ tipo: "ok", txt: "Tudo encaixa. Pode mandar o orçamento." });
    return lista;
  }

  /* ---------- etapas ---------- */
  function renderEtapas() {
    const ol = $("#etapas");
    ol.innerHTML = ETAPAS.map((e, i) => {
      const p = achar(e.key, sel[e.key]);
      const err = p && motivo(e.key, p);
      const open = aberta === e.key;
      const opcoes = P[e.key].map((o) => {
        const m = motivo(e.key, o);
        const marcado = sel[e.key] === o.id;
        return `<button class="opcao${marcado ? " marcada" : ""}${m ? " bloqueada" : ""}" type="button" data-k="${e.key}" data-id="${o.id}" aria-pressed="${marcado}">
          <span class="opcao-nome">${o.nome}</span>
          <span class="opcao-spec">${m ? `<span class="motivo">${m}</span>` : o.spec}</span>
          <span class="opcao-preco">${o.preco ? brl(o.preco) : "Incluso"}</span>
        </button>`;
      }).join("");
      return `<li class="etapa${open ? " aberta" : ""}${p ? " feita" : ""}${err ? " com-erro" : ""}" data-k="${e.key}">
        <button class="etapa-topo" type="button" aria-expanded="${open}" data-abrir="${e.key}">
          <span class="etapa-num">${i + 1}</span>
          <span class="etapa-nome">${e.nome}</span>
          <span class="etapa-escolha">${p ? p.nome : "Escolher"}</span>
          <span class="etapa-preco">${p ? (p.preco ? brl(p.preco) : "Incluso") : ""}</span>
        </button>
        <div class="etapa-corpo"${open ? "" : " hidden"}>
          <p class="etapa-dica">${e.dica}</p>
          <div class="opcoes">${opcoes}</div>
        </div>
      </li>`;
    }).join("");
  }

  function renderResumo() {
    let total = 0, feitas = 0;
    ETAPAS.forEach(({ key }) => {
      const p = achar(key, sel[key]);
      if (p) { total += p.preco; feitas++; }
      // desenho do PC: a peça entra e encaixa; a vaga tracejada some
      const g = $(`#esquema [data-slot="${key}"]`);
      const ligar = !!p && !(key === "gpu" && p.semPlaca);
      const variante = key === "cooler" && p ? (p.box ? "box" : /water/i.test(p.spec) ? "agua" : "torre") : "";
      const mudou = ligar && (!g.classList.contains("on") || g.dataset.id !== p.id);
      if (mudou && g.classList.contains("on")) { g.classList.remove("on"); void g.getBoundingClientRect(); } // troca: sai e entra de novo
      g.classList.toggle("on", ligar);
      g.dataset.id = p ? p.id : "";
      if (variante) g.dataset.tipo = variante;
      if (mudou) { g.classList.remove("encaixou"); void g.getBoundingClientRect(); g.classList.add("encaixou"); }
      if (key === "gabinete") g.querySelectorAll(".gab-fans use").forEach((u) => u.setAttribute("href", ligar ? "#ventoinha" : "#ventoinha-parada"));
      const vaga = $(`#esquema [data-vaga="${key}"]`);
      if (vaga) vaga.classList.toggle("ocupada", ligar);
    });
    const cpuP = achar("cpu", sel.cpu), gpuP = achar("gpu", sel.gpu), fonP = achar("fonte", sel.fonte), plP = achar("placa", sel.placa);
    if (cpuP) $("#cpuNome").textContent = cpuP.nome.includes("Intel") ? "INTEL" : "RYZEN";
    if (gpuP && !gpuP.semPlaca) $("#gpuNome").textContent = gpuP.nome.match(/(RTX|RX)\s?\d+\s?(Ti|XT)?/)?.[0].toUpperCase() || "GPU";
    if (fonP) $("#fonteW").textContent = fonP.watts + "W";
    if (plP) $("#esquema .peca[data-slot='placa'] .rotulo").textContent = plP.nome.match(/[BZ]\d{3}M?/)?.[0] || "";
    $("#total").textContent = brl(total);
    $("#parcela").textContent = total ? `ou ${L.parcelas}x de ${brl(Math.ceil(total / L.parcelas))} sem juros` : "";
    $("#pix").textContent = total ? `${brl(Math.round(total * (1 - L.descontoPix)))} no Pix` : "";
    $("#barraTotal").textContent = brl(total);
    $("#barraEtapas").textContent = `${feitas} de ${ETAPAS.length} peças`;

    const w = consumo(), f = achar("fonte", sel.fonte);
    $("#consumoW").textContent = `${w} W`;
    const barra = $("#consumoBarra");
    const pct = f ? Math.min(100, (w / f.watts) * 100) : Math.min(100, w / 8.5);
    barra.style.width = pct + "%";
    barra.dataset.nivel = !f ? "neutro" : w > f.watts ? "erro" : w * 1.25 > f.watts ? "alerta" : "ok";
    $("#consumoNota").textContent = f ? `${Math.round((w / f.watts) * 100)}% da fonte de ${f.watts} W` : "Escolha a fonte para ver se ela aguenta.";

    const av = avisos();
    $("#avisos").innerHTML = av.map((a) => `<li class="aviso-${a.tipo}">${a.txt}</li>`).join("");

    const linhas = ETAPAS.map(({ key, nome }) => { const p = achar(key, sel[key]); return p ? `• ${nome}: ${p.nome}${p.preco ? ` (${brl(p.preco)})` : ""}` : null; }).filter(Boolean);
    const msg = linhas.length
      ? `Olá! Montei este PC no site da ${L.nome}:\n\n${linhas.join("\n")}\n\nTotal: ${brl(total)}\n\nPode conferir pra mim e me passar o preço final?`
      : `Olá! Quero montar um PC e preciso de ajuda para escolher as peças.`;
    $("#enviar").href = wa(msg);
    $("#enviar").textContent = linhas.length ? "Enviar orçamento no WhatsApp" : "Pedir ajuda para montar";

    // estado no link (para salvar ou mandar para alguém)
    const hash = ETAPAS.filter((e) => sel[e.key]).map((e) => `${e.key}=${sel[e.key]}`).join("&");
    history.replaceState(null, "", hash ? "#m:" + hash : location.pathname);
  }

  function render() { renderEtapas(); renderResumo(); }

  function escolher(k, id) {
    sel[k] = id;
    // peças já escolhidas que deixaram de encaixar saem, com aviso (a fonte fica: o aviso de consumo explica)
    const removidas = [];
    ETAPAS.forEach(({ key, art }) => {
      if (key === k || key === "fonte" || !sel[key]) return;
      if (motivo(key, achar(key, sel[key]))) { delete sel[key]; removidas.push(art); }
    });
    if (removidas.length) toast(`Tiramos ${removidas.join(" e ")}: não encaixava com a peça nova. Escolha de novo.`);
    const prox = ETAPAS.find((e) => !sel[e.key]);
    aberta = prox ? prox.key : null;
    render();
    const li = aberta && $(`.etapa[data-k="${aberta}"]`);
    if (li && li.getBoundingClientRect().top < 80) li.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  $("#etapas").addEventListener("click", (ev) => {
    const ab = ev.target.closest("[data-abrir]");
    if (ab) { aberta = aberta === ab.dataset.abrir ? null : ab.dataset.abrir; renderEtapas(); return; }
    const op = ev.target.closest(".opcao");
    if (!op) return;
    escolher(op.dataset.k, op.dataset.id);
  });

  /* ---------- fotos, hero, categorias e PCs prontos (rodam no fim, depois da vitrine) ---------- */
  function montarPagina() {
  const foto = (id, w, h) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=85`;
  const suave = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
  const soma = (pecas) => ETAPAS.reduce((s, e) => s + achar(e.key, pecas[e.key]).preco, 0);
  const parcela = (v) => `${L.parcelas}x de ${brl(Math.ceil(v / L.parcelas))} sem juros`;

  function carregar(pecas, nome) {
    Object.assign(sel, pecas);
    aberta = null;
    render();
    toast(`Carregamos o ${nome} no montador. Troque o que quiser.`);
    $("#montar").scrollIntoView({ behavior: suave() });
  }

  /* ---------- hero ---------- */
  const D = L.destaque;
  const hf = $("#heroFoto");
  hf.src = foto(L.fotoHero, 1600);
  hf.srcset = [800, 1200, 1600, 2400, 3200, 3840].map((w) => `${foto(L.fotoHero, w)} ${w}w`).join(", ");
  hf.sizes = "(min-width: 1600px) 1600px, 100vw";
  const precoD = soma(D.pecas);
  $("#heroPreco").textContent = brl(precoD);
  $("#heroParcela").textContent = `ou ${parcela(precoD)}`;
  $("#heroQuero").href = wa(`Olá! Tenho interesse no ${D.nome} que vi no site, de ${brl(precoD)}. Ainda tem?`);
  $("#heroMontar").addEventListener("click", (ev) => { ev.preventDefault(); carregar(D.pecas, D.nome); });
  $("#pontos").innerHTML = D.pontos.map((p) => `
    <div class="ponto" style="--x:${p.x}%;--y:${p.y}%">
      <span class="ponto-linha"></span>
      <span class="ponto-texto"><b>${p.titulo}</b><span>${p.sub}</span></span>
    </div>`).join("");
  const FICHA = [["cpu", "Processador"], ["gpu", "Placa de vídeo"], ["ram", "Memória"], ["ssd", "Armazenamento"]];
  $("#ficha").innerHTML = FICHA.map(([k, rot]) => {
    const p = achar(k, D.pecas[k]);
    return `<li><svg viewBox="0 0 64 64" aria-hidden="true">${ICONES[k]}</svg><b>${p.nome.replace(/^(AMD|GeForce|Radeon|Corsair Vengeance|Kingston Fury Beast)/, "")}</b><span>${rot}</span></li>`;
  }).join("");

  /* ---------- categorias ---------- */
  $("#categorias").innerHTML = L.categorias.map((c) => `
    <button class="categoria" type="button" data-irpara="${c.cat}">
      <img src="${foto(c.foto, 900, 1100)}" srcset="${foto(c.foto, 450, 550)} 450w, ${foto(c.foto, 900, 1100)} 900w" sizes="(min-width: 900px) 20vw, 60vw" alt="" loading="lazy">
      <span>${c.nome}</span>
    </button>`).join("");
  $("#categorias").addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-irpara]");
    if (!b) return;
    if (b.dataset.irpara === "prontos") { $("#prontos").scrollIntoView({ behavior: suave() }); return; }
    cat = b.dataset.irpara; renderVitrine();
    $("#pecas").scrollIntoView({ behavior: suave() });
  });

  /* ---------- PCs prontos ---------- */
  const PLANO_PECAS = [["cpu", "Processador"], ["gpu", "Vídeo"], ["ram", "Memória"], ["ssd", "SSD"], ["fonte", "Fonte"]];
  $("#planos").innerHTML = L.modelos.map((m) => {
    const v = soma(m.pecas);
    return `<article class="plano${m.destaque ? " plano-destaque" : ""}">
      ${m.destaque ? '<span class="plano-selo">Mais vendido</span>' : ""}
      <h3>${m.nome}</h3>
      <p class="plano-resumo">${m.resumo}</p>
      <p class="plano-preco"><b>${brl(v)}</b><span>${parcela(v)}</span></p>
      <ul>${PLANO_PECAS.map(([k, r]) => `<li><span>${r}</span>${achar(k, m.pecas[k]).nome}</li>`).join("")}</ul>
      <div class="plano-botoes">
        <a class="btn ${m.destaque ? "btn-cheio" : "btn-linha"}" target="_blank" rel="noopener" href="${wa(`Olá! Tenho interesse no PC ${m.nome} que vi no site, de ${brl(v)}.`)}">Quero esse</a>
        <button class="btn-texto" type="button" data-personalizar="${m.id}">Trocar peças</button>
      </div>
    </article>`;
  }).join("");
  $("#planos").addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-personalizar]");
    if (b) { const m = L.modelos.find((x) => x.id === b.dataset.personalizar); carregar(m.pecas, m.nome); }
  });
  }

  $("#copiarLink").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href); toast("Link copiado. Quem abrir vê este mesmo orçamento."); }
    catch { toast("Não deu para copiar. Copie o endereço da barra do navegador."); }
  });

  /* ---------- vitrine ---------- */
  const NOMES = { cpu: "Processadores", placa: "Placas-mãe", ram: "Memórias", gpu: "Placas de vídeo", ssd: "SSDs", fonte: "Fontes", gabinete: "Gabinetes", cooler: "Coolers" };
  const ICONES = {
    cpu: '<rect x="14" y="14" width="36" height="36" rx="3"/><rect x="24" y="24" width="16" height="16"/><path d="M22 8v6M32 8v6M42 8v6M22 50v6M32 50v6M42 50v6M8 22h6M8 32h6M8 42h6M50 22h6M50 32h6M50 42h6"/>',
    placa: '<rect x="8" y="8" width="48" height="48" rx="3"/><rect x="16" y="16" width="14" height="14"/><path d="M38 14v22M43 14v22M48 14v22M14 42h30M14 48h30"/>',
    ram: '<rect x="6" y="20" width="52" height="18" rx="2"/><path d="M12 26h6v6h-6zM22 26h6v6h-6zM36 26h6v6h-6zM46 26h6v6h-6zM6 44h52M30 38v6"/>',
    gpu: '<rect x="6" y="18" width="52" height="26" rx="3"/><circle cx="22" cy="31" r="8"/><circle cx="42" cy="31" r="8"/><path d="M10 44v6h18v-6"/>',
    ssd: '<rect x="6" y="24" width="52" height="16" rx="2"/><path d="M12 30h10v4H12zM28 30h8v4h-8zM52 28v8"/>',
    fonte: '<rect x="8" y="14" width="48" height="36" rx="3"/><circle cx="26" cy="32" r="11"/><path d="M26 21v22M15 32h22M46 22v4M46 38v4"/>',
    gabinete: '<rect x="16" y="6" width="32" height="52" rx="3"/><circle cx="32" cy="18" r="5"/><circle cx="32" cy="34" r="5"/><path d="M22 50h20"/>',
    cooler: '<circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="5"/><path d="M32 27c0-8 6-12 12-10M37 32c8 0 12 6 10 12M32 37c0 8-6 12-12 10M27 32c-8 0-12-6-10-12"/>',
  };
  let cat = "gpu";
  function renderVitrine() {
    $("#filtros").innerHTML = Object.keys(NOMES).map((k) => `<button type="button" role="tab" class="filtro" aria-selected="${k === cat}" data-cat="${k}">${NOMES[k]}</button>`).join("");
    $("#vitrine").innerHTML = P[cat].filter((p) => p.preco > 0).map((p) => `
      <article class="produto">
        <svg class="produto-icone" viewBox="0 0 64 64" aria-hidden="true">${ICONES[cat]}</svg>
        <h3>${p.nome}</h3>
        <p>${p.spec}</p>
        <div class="produto-base">
          <span class="produto-preco"><b>${brl(p.preco)}</b><small>${brl(Math.round(p.preco * (1 - L.descontoPix)))} no Pix</small></span>
          <a class="btn btn-linha btn-peq" target="_blank" rel="noopener" href="${wa(`Olá! Tem ${p.nome} disponível? Vi no site por ${brl(p.preco)}.`)}">Pedir</a>
        </div>
      </article>`).join("");
  }
  $("#filtros").addEventListener("click", (ev) => { const b = ev.target.closest("[data-cat]"); if (b) { cat = b.dataset.cat; renderVitrine(); } });
  renderVitrine();

  /* ---------- serviços e dúvidas ---------- */
  $("#servicos").innerHTML = L.servicos.map((s) => `
    <div class="servico">
      <h3>${s.nome}</h3><p>${s.texto}</p><span class="servico-preco">${s.preco}</span>
      <a class="btn-texto" target="_blank" rel="noopener" href="${wa(`Olá! Queria um orçamento de ${s.nome.toLowerCase()}.`)}">Pedir orçamento</a>
    </div>`).join("");
  $("#listaDuvidas").innerHTML = L.duvidas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join("");

  /* ---------- toast ---------- */
  let tt;
  function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("mostra"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("mostra"), 3200); }

  /* ---------- barra do celular só depois do hero ---------- */
  const io = new IntersectionObserver(([e]) => $("#barraCelular").classList.toggle("visivel", e.isIntersecting), { rootMargin: "0px 0px -40% 0px" });
  io.observe($("#montar"));
  const ioResumo = new IntersectionObserver(([e]) => $("#barraCelular").classList.toggle("escondida", e.isIntersecting));
  ioResumo.observe($("#resumo"));

  /* ---------- carregar orçamento do link ---------- */
  if (location.hash.startsWith("#m:")) {
    location.hash.slice(3).split("&").forEach((par) => { const [k, id] = par.split("="); if (P[k] && achar(k, id)) sel[k] = id; });
    aberta = (ETAPAS.find((e) => !sel[e.key]) || {}).key || null;
  }
  montarPagina();
  render();
})();
