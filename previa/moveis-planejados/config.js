/* =====================================================================
   CONFIGURAÇÃO DA MARCENARIA
   Para cada marcenaria nova: copie a pasta e troque SÓ este arquivo
   (e, se tiver, as fotos e o vídeo do topo com os projetos dela).
   Fotos: ids do Unsplash (uso livre) ou caminho de arquivo ("midia/x.jpg").
   ===================================================================== */
window.MARCENARIA = {
  nome: "Veio",
  nomeCompleto: "Veio Marcenaria",
  cidade: "Goiânia",
  estado: "GO",

  whatsapp: "5562999990000", // DDI + DDD + número, só dígitos
  whatsappTexto: "(62) 99999-0000",
  instagram: "@veiomarcenaria",
  endereco: "Av. T-63, 1200, Setor Bueno, Goiânia, GO",
  horario: "Seg a sex 8h às 18h · Sáb 8h às 12h",

  notaGoogle: "4,9",
  avaliacoes: 186,
  anos: 14,
  projetos: 620,
  garantia: 5, // anos

  // ---------------- TOPO: vídeo preso ao scroll ----------------
  // Quadros extraídos de um vídeo (001.webp, 002.webp...). Troque pelo vídeo da obra da marcenaria.
  hero: {
    pasta: "midia/quadros/",
    total: 200,
    etapas: [
      { ate: 0.30, titulo: "Sala de jantar integrada", texto: "A cozinha deixa de ser um cômodo escondido e vira o centro da casa." },
      { ate: 0.58, titulo: "Ilha com bancada de pedra", texto: "Gavetas com amortecimento, tomadas embutidas e espaço para seis banquetas." },
      { ate: 0.84, titulo: "Armários em lâmina natural", texto: "Portas sem puxador aparente, alinhadas ao milímetro até o teto." },
      { ate: 1.00, titulo: "A casa inteira, no mesmo desenho", texto: "Do painel da sala ao closet, tudo conversa." },
    ],
  },

  // ---------------- DO PROJETO AO PRONTO ----------------
  // Ideal: um render 3D e a foto do mesmo ambiente entregue. Aqui a prévia simula o 3D com a própria foto.
  comparacao: { foto: "photo-1622372738946-62e02505feb3", render: "" },

  // ---------------- PORTFÓLIO (zoom no scroll) ----------------
  portfolio: [
    { nome: "Cozinha Nogueira", lugar: "Setor Marista", foto: "photo-1771270731051-9cfbb7222946" },
    { nome: "Closet com LED", lugar: "Alphaville Flamboyant", foto: "photo-1708397016786-8916880649b8" },
    { nome: "Cozinha Grafite", lugar: "Jardim Goiás", foto: "photo-1765766601532-90e9b96320c8" },
    { nome: "Suíte master", lugar: "Setor Oeste", foto: "photo-1678978866819-306ed8608e7f" },
    { nome: "Home office", lugar: "Setor Bueno", foto: "photo-1737305457496-dc7503cdde1e" },
    { nome: "Closet do casal", lugar: "Aldeia do Vale", foto: "photo-1781473377372-8690a514c152" },
    { nome: "Cozinha integrada", lugar: "Setor Bueno", foto: "photo-1622372738946-62e02505feb3" },
  ],

  // ---------------- COMO FUNCIONA ----------------
  processo: [
    { titulo: "Visita e medição", texto: "Vamos até a sua casa, medimos cada parede e entendemos a rotina de quem vai usar o ambiente.", foto: "photo-1622372738946-62e02505feb3" },
    { titulo: "Projeto 3D", texto: "Em até 7 dias você recebe o projeto em 3D, com cores, acabamentos e o preço fechado. Ajustamos quantas vezes precisar.", foto: "photo-1765766601532-90e9b96320c8" },
    { titulo: "Produção na fábrica", texto: "Cortamos e montamos as peças na nossa fábrica, com máquinas de precisão. Você acompanha as fotos pelo WhatsApp.", foto: "photo-1619976553860-b7ffbe9a093b" },
    { titulo: "Montagem e entrega", texto: "Nossa equipe monta, regula e limpa tudo. Você recebe o ambiente pronto, com garantia por escrito.", foto: "photo-1708397016786-8916880649b8" },
  ],

  // ---------------- ACABAMENTOS ----------------
  acabamentos: [
    { nome: "Nogueira", tipo: "Lâmina natural", foto: "photo-1619976553860-b7ffbe9a093b" },
    { nome: "Freijó", tipo: "MDF amadeirado", foto: "photo-1736506159776-22ca388780fa" },
    { nome: "Carvalho claro", tipo: "MDF amadeirado", foto: "photo-1611600700192-d87eaeed4f81" },
    { nome: "Cumaru", tipo: "Lâmina natural", foto: "photo-1736506159893-22cca29b8018" },
    { nome: "Preto fosco", tipo: "Laca acetinada", cor: "#141110" },
    { nome: "Off-white", tipo: "Laca acetinada", cor: "#E6DED1" },
    { nome: "Verde oliva", tipo: "MDF liso", cor: "#4B4C37" },
  ],

  // ---------------- SIMULADOR DE ORÇAMENTO ----------------
  // Preço por metro linear em cada padrão [essencial, premium, alto padrão]. Ajuste à tabela da marcenaria.
  simulador: {
    ambientes: [
      { id: "cozinha", nome: "Cozinha", min: 2, max: 12, padrao: 5, porMetro: [2100, 3100, 4600] },
      { id: "closet", nome: "Closet", min: 2, max: 10, padrao: 4, porMetro: [1900, 2800, 4200] },
      { id: "dormitorio", nome: "Guarda-roupa", min: 1.5, max: 6, padrao: 3, porMetro: [1800, 2600, 3900] },
      { id: "sala", nome: "Painel e home", min: 1.5, max: 6, padrao: 3, porMetro: [1500, 2300, 3600] },
      { id: "banheiro", nome: "Banheiro", min: 0.8, max: 4, padrao: 1.5, porMetro: [1700, 2500, 3700] },
      { id: "escritorio", nome: "Home office", min: 1, max: 5, padrao: 2.5, porMetro: [1600, 2400, 3600] },
    ],
    padroes: [
      { nome: "Essencial", texto: "MDF 18 mm em cores lisas e corrediças comuns." },
      { nome: "Premium", texto: "MDF amadeirado, perfis de alumínio e amortecimento." },
      { nome: "Alto padrão", texto: "Lâmina natural ou laca, ferragens Blum e detalhes em pedra." },
    ],
    extras: [
      { id: "led", nome: "Iluminação em LED", porMetro: 220 },
      { id: "cava", nome: "Puxador cava ou perfil", porMetro: 140 },
      { id: "vidro", nome: "Portas de vidro reflecta", porMetro: 380 },
      { id: "ferragens", nome: "Ferragens com amortecimento", porMetro: 160 },
    ],
    margem: 0.12, // a faixa mostrada vai de -12% a +12% do valor estimado
  },

  depoimentos: [
    { texto: "Entregaram a cozinha dois dias antes do combinado. O acabamento das portas é perfeito, nem parece que foi feito aqui.", nome: "Mariana C.", lugar: "Setor Marista" },
    { texto: "O projeto 3D ficou idêntico ao que foi montado. Já fechamos o closet com eles também.", nome: "Rafael e Júlia", lugar: "Jardim Goiás" },
    { texto: "Preço justo, equipe educada e limpa. Recomendo de olhos fechados.", nome: "Sônia M.", lugar: "Setor Bueno" },
  ],

  duvidas: [
    ["Quanto tempo leva do projeto à entrega?", "Em média 30 a 45 dias depois da aprovação do projeto 3D, conforme o tamanho do ambiente e os acabamentos."],
    ["A visita para medir é paga?", "Não. A visita, a medição e o projeto 3D são gratuitos em Goiânia e Aparecida."],
    ["Qual é a garantia?", "Cinco anos na estrutura e nas ferragens, por escrito no contrato."],
    ["Dá para parcelar?", "Sim, em até 12x no cartão ou com entrada e o restante na entrega. No Pix à vista tem desconto."],
    ["O valor do simulador é o preço final?", "É uma estimativa para você ter uma ideia. O preço fechado sai no projeto 3D, depois da medição."],
  ],
};
