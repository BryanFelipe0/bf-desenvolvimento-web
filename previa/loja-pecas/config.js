/* =====================================================================
   CONFIGURAÇÃO DA LOJA
   Para cada loja nova: copie a pasta e troque SÓ este arquivo.
   Preços em reais. Os campos de compatibilidade (socket, ram, formato,
   consumo, comprimento...) são o que faz o montador avisar o que não encaixa.
   ===================================================================== */
window.LOJA = {
  nome: "Núcleo Hardware",
  cidade: "Uberlândia",
  estado: "MG",
  slogan: "Peças de PC com preço de loja grande e atendimento de quem monta todo dia.",

  whatsapp: "5534999990000", // DDI + DDD + número, só dígitos
  whatsappTexto: "(34) 99999-0000",
  instagram: "@nucleohardware",
  endereco: "Av. Rondon Pacheco, 1500, Uberlândia, MG",
  horario: "Seg a sex 9h às 18h · Sáb 9h às 13h",
  notaGoogle: "4,9",
  avaliacoes: 312,

  parcelas: 10,       // parcelas sem juros
  descontoPix: 0.05,  // 5% no Pix
  montagemGratis: true,

  // ---------------- PEÇAS ----------------
  pecas: {
    cpu: [
      { id: "r5-5600", nome: "AMD Ryzen 5 5600", spec: "6 núcleos · 4,4 GHz", socket: "AM4", ram: "DDR4", consumo: 65, video: false, coolerIncluso: true, preco: 649 },
      { id: "r5-7600", nome: "AMD Ryzen 5 7600", spec: "6 núcleos · 5,1 GHz", socket: "AM5", ram: "DDR5", consumo: 65, video: true, coolerIncluso: true, preco: 1149 },
      { id: "r5-8600g", nome: "AMD Ryzen 5 8600G", spec: "6 núcleos · vídeo Radeon 760M", socket: "AM5", ram: "DDR5", consumo: 65, video: true, coolerIncluso: true, preco: 1199 },
      { id: "i5-14400f", nome: "Intel Core i5-14400F", spec: "10 núcleos · 4,7 GHz", socket: "LGA1700", ram: "DDR5", consumo: 65, video: false, coolerIncluso: true, preco: 999 },
      { id: "i7-14700kf", nome: "Intel Core i7-14700KF", spec: "20 núcleos · 5,6 GHz", socket: "LGA1700", ram: "DDR5", consumo: 180, video: false, coolerIncluso: false, preco: 2299 },
      { id: "r7-9800x3d", nome: "AMD Ryzen 7 9800X3D", spec: "8 núcleos · 3D V-Cache", socket: "AM5", ram: "DDR5", consumo: 120, video: true, coolerIncluso: false, preco: 3299 },
    ],
    placa: [
      { id: "b550m-a", nome: "ASUS Prime B550M-A", spec: "AM4 · DDR4 · Micro-ATX", socket: "AM4", ram: "DDR4", formato: "mATX", preco: 699 },
      { id: "b650m-gx", nome: "Gigabyte B650M Gaming X AX", spec: "AM5 · DDR5 · Wi-Fi 6E", socket: "AM5", ram: "DDR5", formato: "mATX", preco: 1149 },
      { id: "b650-tmk", nome: "MSI MAG B650 Tomahawk WiFi", spec: "AM5 · DDR5 · ATX", socket: "AM5", ram: "DDR5", formato: "ATX", preco: 1599 },
      { id: "b760m-a", nome: "ASUS Prime B760M-A", spec: "LGA1700 · DDR5 · Micro-ATX", socket: "LGA1700", ram: "DDR5", formato: "mATX", preco: 899 },
      { id: "z790-tmk", nome: "MSI MAG Z790 Tomahawk WiFi", spec: "LGA1700 · DDR5 · ATX", socket: "LGA1700", ram: "DDR5", formato: "ATX", preco: 1899 },
    ],
    ram: [
      { id: "d4-16", nome: "Kingston Fury Beast 16 GB DDR4", spec: "2 × 8 GB · 3200 MHz", tipo: "DDR4", preco: 329 },
      { id: "d4-32", nome: "Kingston Fury Beast 32 GB DDR4", spec: "2 × 16 GB · 3600 MHz", tipo: "DDR4", preco: 549 },
      { id: "d5-16", nome: "Kingston Fury Beast 16 GB DDR5", spec: "2 × 8 GB · 5600 MHz", tipo: "DDR5", preco: 449 },
      { id: "d5-32", nome: "Corsair Vengeance 32 GB DDR5", spec: "2 × 16 GB · 6000 MHz CL30", tipo: "DDR5", preco: 799 },
      { id: "d5-64", nome: "Corsair Vengeance 64 GB DDR5", spec: "2 × 32 GB · 6000 MHz", tipo: "DDR5", preco: 1599 },
    ],
    gpu: [
      { id: "sem-gpu", nome: "Usar o vídeo do processador", spec: "Para estudo, escritório e jogos leves", consumo: 0, comprimento: 0, preco: 0, semPlaca: true },
      { id: "rtx5060", nome: "GeForce RTX 5060 8 GB", spec: "Full HD no alto · DLSS 4", consumo: 145, comprimento: 240, preco: 2299 },
      { id: "rx9060xt", nome: "Radeon RX 9060 XT 16 GB", spec: "Full HD no ultra · 1440p", consumo: 160, comprimento: 280, preco: 2699 },
      { id: "rtx5060ti", nome: "GeForce RTX 5060 Ti 16 GB", spec: "1440p · ótima para edição", consumo: 180, comprimento: 290, preco: 3199 },
      { id: "rtx5070", nome: "GeForce RTX 5070 12 GB", spec: "1440p no ultra · ray tracing", consumo: 250, comprimento: 305, preco: 4499 },
      { id: "rtx5070ti", nome: "GeForce RTX 5070 Ti 16 GB", spec: "1440p alto FPS · 4K", consumo: 300, comprimento: 340, preco: 6299 },
    ],
    ssd: [
      { id: "nv3-500", nome: "Kingston NV3 500 GB", spec: "NVMe · 5000 MB/s", preco: 299 },
      { id: "nv3-1t", nome: "Kingston NV3 1 TB", spec: "NVMe · 6000 MB/s", preco: 449 },
      { id: "sn850x-1t", nome: "WD Black SN850X 1 TB", spec: "NVMe · 7300 MB/s", preco: 699 },
      { id: "990pro-2t", nome: "Samsung 990 Pro 2 TB", spec: "NVMe · 7450 MB/s", preco: 1399 },
    ],
    fonte: [
      { id: "a550", nome: "MSI MAG A550BN 550 W", spec: "80 Plus Bronze", watts: 550, preco: 349 },
      { id: "cx650", nome: "Corsair CX650 650 W", spec: "80 Plus Bronze", watts: 650, preco: 449 },
      { id: "rm750e", nome: "Corsair RM750e 750 W", spec: "80 Plus Gold · modular", watts: 750, preco: 699 },
      { id: "a850gl", nome: "MSI MAG A850GL 850 W", spec: "80 Plus Gold · modular", watts: 850, preco: 849 },
    ],
    gabinete: [
      { id: "air100", nome: "Montech Air 100", spec: "Micro-ATX · 4 ventoinhas", formatos: ["mATX"], gpuMax: 330, preco: 349 },
      { id: "galaxy", nome: "Rise Mode Galaxy Glass", spec: "ATX · vidro lateral", formatos: ["ATX", "mATX"], gpuMax: 320, preco: 299 },
      { id: "lancool207", nome: "Lian Li Lancool 207", spec: "ATX · fluxo de ar alto", formatos: ["ATX", "mATX"], gpuMax: 375, preco: 649 },
      { id: "h6flow", nome: "NZXT H6 Flow", spec: "ATX · vidro panorâmico", formatos: ["ATX", "mATX"], gpuMax: 365, preco: 899 },
    ],
    cooler: [
      { id: "box", nome: "Cooler que vem com o processador", spec: "Sem custo extra", aguenta: 95, preco: 0, box: true },
      { id: "ak400", nome: "DeepCool AK400", spec: "Torre 120 mm", aguenta: 180, preco: 199 },
      { id: "pa120", nome: "Thermalright Peerless Assassin 120 SE", spec: "Torre dupla 120 mm", aguenta: 250, preco: 249 },
      { id: "galahad360", nome: "Lian Li Galahad II 360", spec: "Water cooler 360 mm", aguenta: 300, preco: 899 },
    ],
  },

  // ---------------- FOTOS ----------------
  // Links do Unsplash (uso livre). Para a loja real, troque pelas fotos dos PCs que ela montou.
  fotoHero: "photo-1718777025831-5cb28feb8518", // proporção 3:2 (os pontos abaixo dependem dela)

  // PC do topo do site. Os pontos (x, y em %) ligam cada peça ao lugar dela na foto.
  destaque: {
    nome: "Núcleo Pro 1440p",
    pecas: { cpu: "r7-9800x3d", placa: "b650-tmk", ram: "d5-32", gpu: "rtx5070", ssd: "sn850x-1t", fonte: "rm750e", gabinete: "h6flow", cooler: "galahad360" },
    pontos: [
      { x: 47, y: 33, titulo: "Water cooler 360 mm", sub: "Lian Li Galahad II" },
      { x: 42, y: 50, titulo: "32 GB DDR5", sub: "6000 MHz CL30" },
      { x: 69, y: 62, titulo: "NZXT H6 Flow", sub: "Vidro panorâmico e 7 ventoinhas" },
      { x: 37, y: 72, titulo: "RTX 5070 12 GB", sub: "1440p no ultra" },
    ],
  },

  categorias: [
    { nome: "Placas de vídeo", cat: "gpu", foto: "photo-1512756290469-ec264b7fbf87" },
    { nome: "Water coolers", cat: "cooler", foto: "photo-1632749042303-7f7a18ed6ff0" },
    { nome: "Gabinetes", cat: "gabinete", foto: "photo-1738245494097-9b1e3971c3eb" },
    { nome: "PCs montados", cat: "prontos", foto: "photo-1587202372775-e229f172b9d7" },
    { nome: "Memórias", cat: "ram", foto: "photo-1587202372634-32705e3bf49c" },
  ],

  // PCs prontos (ids das peças acima). "destaque: true" marca o mais vendido.
  modelos: [
    { id: "estudo", nome: "Estudo e escritório", resumo: "Rápido para o dia a dia, sem placa de vídeo.",
      pecas: { cpu: "r5-8600g", placa: "b650m-gx", ram: "d5-16", gpu: "sem-gpu", ssd: "nv3-500", fonte: "a550", gabinete: "air100", cooler: "box" } },
    { id: "fullhd", nome: "Gamer Full HD", resumo: "Os jogos de hoje no alto, a 60 FPS ou mais.",
      pecas: { cpu: "r5-7600", placa: "b650m-gx", ram: "d5-32", gpu: "rtx5060", ssd: "nv3-1t", fonte: "cx650", gabinete: "galaxy", cooler: "box" } },
    { id: "2k", destaque: true, nome: "Gamer 1440p", resumo: "Tela 2K no ultra com o melhor processador para jogos.",
      pecas: { cpu: "r7-9800x3d", placa: "b650-tmk", ram: "d5-32", gpu: "rtx5070", ssd: "sn850x-1t", fonte: "rm750e", gabinete: "lancool207", cooler: "pa120" } },
    { id: "edicao", nome: "Edição e live", resumo: "Premiere, After Effects e stream ao mesmo tempo.",
      pecas: { cpu: "i7-14700kf", placa: "z790-tmk", ram: "d5-64", gpu: "rtx5060ti", ssd: "990pro-2t", fonte: "a850gl", gabinete: "h6flow", cooler: "galahad360" } },
  ],

  servicos: [
    { nome: "Montagem do seu PC", texto: "Grátis comprando o kit aqui. Cabos organizados e testes antes de entregar.", preco: "Grátis" },
    { nome: "Formatação com backup", texto: "Seus arquivos salvos, Windows limpo e drivers instalados.", preco: "a partir de R$ 120" },
    { nome: "Limpeza e pasta térmica", texto: "Para o PC ou notebook que esquenta, faz barulho ou desliga sozinho.", preco: "a partir de R$ 100" },
    { nome: "Upgrade para SSD", texto: "Trocamos o HD e passamos tudo para o SSD, sem reinstalar nada.", preco: "a partir de R$ 80 + peça" },
  ],

  duvidas: [
    ["As peças têm garantia?", "Sim. Todas são novas, com nota fiscal e garantia do fabricante, de 1 a 5 anos conforme a peça."],
    ["Vocês entregam?", "Entregamos em Uberlândia no mesmo dia para pedidos até as 14h. Para outras cidades, enviamos pelos Correios ou transportadora."],
    ["Posso retirar na loja?", "Pode. Separamos o pedido e avisamos no WhatsApp quando estiver pronto."],
    ["E se eu escolher uma peça que não encaixa?", "O montador avisa na hora. E antes de fechar, nosso técnico confere o orçamento inteiro com você."],
  ],
};
