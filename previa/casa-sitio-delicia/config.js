/* Prévia: Pousada Casa Sítio Delícia do Quadrado (Trancoso, BA)
   Fotos ilustrativas de banco de imagens. Trocar pelas fotos reais da pousada quando o cliente aprovar. */
const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

window.POUSADA = {
  nome: "Casa Sítio Delícia",
  tipo: "Pousada",
  cidade: "Trancoso",
  estado: "BA",
  bairro: "Quadrado de Trancoso",
  slogan: "Conforto e natureza em perfeita harmonia, pertinho do Quadrado de Trancoso. Piscina, café da manhã e restaurante na pousada.",
  descricao:
    "A Pousada Casa Sítio Delícia do Quadrado fica em Trancoso, no meio do verde e a poucos passos do Quadrado. Aqui você tem suítes cheias de charme, piscina, café da manhã caprichado e restaurante no local, sem precisar sair para comer bem.",

  seoTitulo: "Pousada Casa Sítio Delícia do Quadrado | Trancoso, BA",
  seoDescricao: "Pousada em Trancoso (BA), perto do Quadrado: suítes Bosque, Espelho, Mirante e Caraíva, piscina, café da manhã e restaurante. Nota 4,9 no Google. Reserve direto pelo WhatsApp.",

  heroVideo: "",
  heroFoto: U("photo-1668276490368-409a6002756d", 2400),

  whatsapp: "5573999623719",
  whatsappTexto: "(73) 99962-3719",
  instagram: "@pousadacasasitiodelicia",
  endereco: "Trancoso, Porto Seguro, BA",

  numeros: [
    ["4,9", "nota no Google"],
    ["4", "suítes exclusivas"],
    ["Quadrado", "a poucos passos"],
    ["Restaurante", "na pousada"],
  ],

  // Preços em branco = "Consulte". Trocar pelos valores reais.
  quartos: [
    { nome: "Suíte Bosque", resumo: "Envolvida pelo verde, para acordar ouvindo os passarinhos.", foto: U("photo-1774280954999-9758f11f3d41"), itens: ["Vista para a mata", "Ar-condicionado", "Café da manhã"], preco: null },
    { nome: "Suíte Espelho", resumo: "Charme e conforto em cada detalhe da decoração.", foto: U("photo-1611892440504-42a792e24d32"), itens: ["Decoração autoral", "Ar-condicionado", "Café da manhã"], preco: null },
    { nome: "Suíte Mirante", resumo: "Para quem gosta de começar o dia com vista.", foto: U("photo-1700004060538-cb750e9a2992"), itens: ["Vista privilegiada", "Ar-condicionado", "Café da manhã"], preco: null },
    { nome: "Suíte Caraíva", resumo: "Inspirada na vila vizinha, rústica e aconchegante.", foto: U("photo-1601565415267-724db0e9fbdf"), itens: ["Estilo rústico", "Ar-condicionado", "Café da manhã"], preco: null },
  ],

  galeria: [
    { t1: "Piscina", t2: "no meio do verde", desc: "Para relaxar entre um passeio e outro.", foto: U("photo-1668276490368-409a6002756d", 900) },
    { t1: "Café", t2: "da manhã", desc: "Bolos, frutas e delícias feitas com carinho.", foto: U("photo-1728050829024-8113f4cd85ec", 900) },
    { t1: "Restaurante", t2: "na pousada", desc: "Comida boa sem precisar sair de casa.", foto: U("photo-1728051104003-aa16971b44b3", 900) },
    { t1: "Praias", t2: "de Trancoso", desc: "Coqueiros, Nativos e Rio Verde a poucos minutos.", foto: U("photo-1561733631-f2481dfd7425", 900) },
    { t1: "Natureza", t2: "por todo lado", desc: "Conforto e natureza em perfeita harmonia.", foto: U("photo-1664524169977-acc46ea169a0", 900) },
  ],

  regiao: [
    ["Quadrado de Trancoso", "O coração da vila: a igrejinha, as casinhas coloridas e os restaurantes.", "a poucos passos"],
    ["Praia dos Coqueiros", "Mar calmo e barracas pé na areia.", "poucos min"],
    ["Praia dos Nativos", "Uma das mais bonitas de Trancoso.", "poucos min"],
    ["Caraíva e Espelho", "Passeios de dia inteiro pelas praias mais famosas do sul da Bahia.", "de carro"],
  ],
  fotoRegiao: U("photo-1718992230074-7908a0b21bbd", 2000),

  horarios: [
    ["Check-in", "consulte a pousada"],
    ["Check-out", "consulte a pousada"],
    ["Reservas", "pelo WhatsApp"],
  ],

  faq: [
    ["Como faço uma reserva?", "É só clicar em qualquer botão do site. Você fala direto com a gente pelo WhatsApp, escolhe a suíte e as datas."],
    ["A pousada fica perto do Quadrado?", "Sim, estamos pertinho do Quadrado de Trancoso, dá para ir a pé."],
    ["Tem restaurante e café da manhã?", "Sim! O café da manhã está incluso e temos restaurante na própria pousada."],
    ["Quais as formas de pagamento?", "Fale com a gente pelo WhatsApp que passamos todas as opções."],
  ],
};
