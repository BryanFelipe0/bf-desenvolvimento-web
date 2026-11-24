/* =====================================================================
   CONFIGURAÇÃO DA EMPRESA DE ENERGIA SOLAR
   Para cada empresa nova: copie a pasta e troque SÓ este arquivo
   (e, se tiver, as fotos e o vídeo de drone das obras dela).
   Fotos: ids do Unsplash (uso livre) ou caminho de arquivo ("midia/x.jpg").
   ===================================================================== */
window.SOLAR = {
  nome: "Zênite",
  nomeCompleto: "Zênite Energia Solar",
  cidade: "Uberlândia",
  estado: "MG",

  whatsapp: "5534999990000", // DDI + DDD + número, só dígitos
  whatsappTexto: "(34) 99999-0000",
  instagram: "@zeniteenergiasolar",
  endereco: "Av. João Naves de Ávila, 2500, Uberlândia, MG",
  horario: "Seg a sex 8h às 18h · Sáb 8h às 12h",

  notaGoogle: "4,9",
  avaliacoes: 241,
  sistemas: 1380,     // sistemas instalados
  anos: 9,

  // ---------------- TOPO: filme preso ao scroll ----------------
  // Quadros de vários vídeos de drone emendados. "ate" = fim de cada etapa (0 a 1).
  hero: {
    pastaPc: "midia/quadros-hd2/",     // 1600×900, todos os 380 quadros, para telas deitadas
    pastaCel: "midia/quadros-cel-hd/", // 720×1280 cortado do centro, para celular em pé
    total: 380,
    passoPc: 1,                        // computador: todos os quadros (scroll devagar fica liso)
    passoCel: 2,                       // celular: 1 de cada 2, para gastar menos internet
    etapas: [
      { ate: 0.30, rotulo: "A casa", titulo: "O sol já bate no seu telhado todos os dias.", texto: "A diferença é que, a partir de agora, ele paga a sua conta de luz." },
      { ate: 0.46, rotulo: "O sistema", titulo: "12 placas. 7,3 kWp.", texto: "A conta desta casa caiu de R$ 980 para R$ 96 por mês." },
      { ate: 0.66, rotulo: "A instalação", titulo: "Instalado em um dia. Sem quebrar nada.", texto: "Equipe própria, projeto homologado na Cemig e seguro da obra incluso." },
      { ate: 1.00, rotulo: "Os próximos 25 anos", titulo: "Energia limpa até 2051.", texto: "Garantia de 25 anos de geração nas placas e monitoramento pelo celular." },
    ],
  },

  // ---------------- SIMULADOR DE ECONOMIA ----------------
  simulador: {
    tarifa: 0.98,          // R$ por kWh com impostos (Cemig residencial)
    sol: 5.4,              // horas de sol pleno por dia na cidade
    taxaMinima: 50,        // kWh de custo de disponibilidade (bifásico)
    perdas: 0.8,           // eficiência real do sistema
    placaW: 610,           // potência de cada placa
    areaPlaca: 2.6,        // m² por placa
    precoKwp: 3350,        // R$ por kWp instalado
    reajuste: 0.07,        // aumento médio da conta de luz por ano
    fioB: 0.9,             // parte da economia que fica com o cliente (Lei 14.300)
    parcelas: 60,
    jurosMes: 0.0149,      // financiamento solar
    contaMin: 150, contaMax: 3000, contaPadrao: 650,
    tipos: [
      { id: "casa", nome: "Casa" },
      { id: "comercio", nome: "Comércio" },
      { id: "rural", nome: "Fazenda" },
    ],
  },

  // ---------------- COMO FUNCIONA ----------------
  processo: [
    { titulo: "Simulação e visita", texto: "Você manda a conta de luz pelo WhatsApp e vamos até o local medir o telhado e ver a sombra.", foto: "photo-1655300283246-1ef0317a565d" },
    { titulo: "Projeto e aprovação", texto: "Fazemos o projeto e cuidamos de toda a papelada com a Cemig. Você não precisa ir a lugar nenhum.", foto: "photo-1648135327756-b606e2eb8caa" },
    { titulo: "Instalação em um dia", texto: "Equipe própria e treinada, com seguro. Na maioria das casas, tudo fica pronto no mesmo dia.", foto: "photo-1624397640148-949b1732bb0a" },
    { titulo: "Ligado e monitorado", texto: "Depois da vistoria, o sistema começa a gerar. Você acompanha a produção em tempo real pelo celular.", foto: "photo-1613665813446-82a78c468a1d" },
  ],

  galeria: [
    { nome: "Residência no Granja Marileusa", info: "18 placas · R$ 1.420 de economia por mês", foto: "photo-1730807908064-c087959dd52c" },
    { nome: "Supermercado no Santa Mônica", info: "96 placas · conta caiu 91%", foto: "photo-1724041875334-0a6397111c7e" },
    { nome: "Casa no Jardim Karaíba", info: "10 placas · instalada em 6 horas", foto: "photo-1660330589257-813305a4a383" },
    { nome: "Fazenda em Indianópolis", info: "140 placas · irrigação sem conta", foto: "photo-1763665814965-b5c4b3547908" },
  ],

  depoimentos: [
    { texto: "Minha conta era R$ 870. Agora pago a taxa mínima e a parcela do financiamento é menor do que eu pagava de luz.", nome: "Carlos R.", lugar: "Granja Marileusa" },
    { texto: "Instalaram em um dia e deixaram tudo limpo. Acompanho a geração pelo celular, é viciante.", nome: "Patrícia e Leandro", lugar: "Jardim Karaíba" },
    { texto: "Fizemos no mercado e no galpão. Em dois anos e meio o sistema já se pagou.", nome: "Supermercado Bom Preço", lugar: "Santa Mônica" },
  ],

  duvidas: [
    ["Em quanto tempo o sistema se paga?", "Na maioria das casas, entre 3 e 4 anos. Depois disso, a economia vai direto para o seu bolso por mais de 20 anos."],
    ["E se chover ou ficar nublado?", "O sistema gera menos nesses dias, mas o que sobra nos dias de sol vira crédito na Cemig e compensa na conta."],
    ["Preciso trocar o telhado?", "Não. Instalamos em telha cerâmica, fibrocimento, metálica e laje. Se o telhado precisar de reparo, avisamos antes."],
    ["Dá para financiar?", "Sim, em até 60x. Na maioria dos casos, a parcela fica menor que a conta de luz que você paga hoje."],
    ["Qual é a garantia?", "25 anos de geração nas placas, 10 anos no inversor e 1 ano na instalação."],
  ],
};
