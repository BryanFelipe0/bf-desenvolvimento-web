/* Título e descrição para o Google, prévia no WhatsApp/Instagram e dados estruturados.
   Monta tudo a partir do config.js. Roda no <head>, antes da página aparecer. */
(() => {
  const P = window.POUSADA;
  const nome = `${P.tipo} ${P.nome}`;
  const local = `${P.cidade}, ${P.estado}`;
  const titulo = P.seoTitulo || `${nome} em ${P.cidade} | Pé na areia na ${P.bairro}`;
  const descricao = P.seoDescricao ||
    `${nome}, em ${local}: suítes com varanda, café da manhã incluso e praia a 50 metros. Reserve direto pelo WhatsApp e pague menos que nos aplicativos.`;
  const capa = P.heroFoto;

  document.title = titulo;
  const head = document.head;
  const meta = (attr, chave, valor) => {
    let el = head.querySelector(`meta[${attr}="${chave}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, chave); head.appendChild(el); }
    el.setAttribute("content", valor);
  };
  meta("name", "description", descricao);
  meta("property", "og:type", "website");
  meta("property", "og:locale", "pt_BR");
  meta("property", "og:site_name", nome);
  meta("property", "og:title", titulo);
  meta("property", "og:description", descricao);
  meta("property", "og:image", capa);
  meta("name", "twitter:card", "summary_large_image");

  // carrega a foto de capa antes de tudo
  const pre = document.createElement("link");
  pre.rel = "preload"; pre.as = "image"; pre.fetchPriority = "high";
  pre.href = capa.replace(/w=\d+/, "w=1200");
  pre.setAttribute("imagesrcset", [800, 1200, 1800, 2400].map((w) => `${capa.replace(/w=\d+/, "w=" + w)} ${w}w`).join(", "));
  pre.setAttribute("imagesizes", "100vw");
  head.appendChild(pre);

  // dados estruturados: o Google entende que é uma hospedagem
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: nome,
    description: descricao,
    image: capa,
    telephone: "+" + P.whatsapp,
    address: { "@type": "PostalAddress", streetAddress: P.endereco.split(",").slice(0, 2).join(",").trim(), addressLocality: P.cidade, addressRegion: P.estado, addressCountry: "BR" },
    checkinTime: "14:00",
    checkoutTime: "11:00",
  });
  head.appendChild(ld);
})();
