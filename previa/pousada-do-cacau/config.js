/* Prévia: Pousada do Cacau (Arraial d'Ajuda, BA)
   Visual inspirado na referência enviada (branco, madeira, palha, piscina turquesa).
   Fotos ilustrativas de banco de imagens. Trocar pelas fotos reais da pousada quando o cliente aprovar. */
const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

window.POUSADA = {
  nome: "Pousada do Cacau",
  tipo: "Pousada",
  cidade: "Arraial d'Ajuda",
  estado: "BA",
  bairro: "Arraial d'Ajuda",
  slogan: "Sol, piscina e o clima gostoso de Arraial d'Ajuda. Pertinho do centrinho, da Rua do Mucugê e das praias.",
  descricao:
    "A Pousada do Cacau fica em Arraial d'Ajuda, no sul da Bahia. Um cantinho tranquilo para descansar entre um passeio e outro, com piscina, café da manhã e tudo perto: o centrinho, a Rua do Mucugê e as praias mais bonitas da região.",

  seoTitulo: "Pousada do Cacau | Arraial d'Ajuda, BA",
  seoDescricao: "Pousada do Cacau em Arraial d'Ajuda (BA): piscina, café da manhã e localização perto do centrinho e das praias. Nota 4,6 no Google. Reserve direto pelo WhatsApp.",

  heroVideo: "",
  heroFoto: U("photo-1606819422797-74627f4dac0b", 2400),

  whatsapp: "5573982499064",
  whatsappTexto: "(73) 98249-9064",
  instagram: "@pousadadocacauarraial",
  endereco: "Arraial d'Ajuda, Porto Seguro, BA",

  numeros: [
    ["4,6", "nota no Google"],
    ["127", "avaliações"],
    ["Piscina", "para relaxar"],
    ["Direto", "no WhatsApp"],
  ],

  // Preços em branco = "Consulte". Trocar pelos nomes e valores reais das acomodações.
  quartos: [
    { nome: "Suíte Casal", resumo: "Aconchegante, para dois, com varanda e muita luz natural.", foto: U("photo-1611892440504-42a792e24d32"), itens: ["Até 2 pessoas", "Ar-condicionado", "Café da manhã"], preco: null },
    { nome: "Suíte Família", resumo: "Espaço para a família toda curtir Arraial com conforto.", foto: U("photo-1601565415267-724db0e9fbdf"), itens: ["Até 4 pessoas", "Ar-condicionado", "Café da manhã"], preco: null },
    { nome: "Suíte Térrea", resumo: "Pertinho da piscina, para quem quer praticidade.", foto: U("photo-1774280954999-9758f11f3d41"), itens: ["Até 2 pessoas", "Acesso à piscina", "Café da manhã"], preco: null },
  ],

  galeria: [
    { t1: "Piscina", t2: "ao sol", desc: "Espreguiçadeiras e água azulzinha o dia todo.", foto: U("photo-1606819422797-74627f4dac0b", 900) },
    { t1: "Café", t2: "da manhã", desc: "Frutas, bolos e delícias para começar bem o dia.", foto: U("photo-1728050829024-8113f4cd85ec", 900) },
    { t1: "Deck", t2: "com rede", desc: "Para descansar ouvindo o vento.", foto: U("photo-1778655504565-5d70f77212cd", 900) },
    { t1: "Praias", t2: "de Arraial", desc: "Mucugê, Pitinga e Taípe a poucos minutos.", foto: U("photo-1561733631-f2481dfd7425", 900) },
    { t1: "Fim", t2: "de tarde", desc: "O pôr do sol do sul da Bahia.", foto: U("photo-1729615220950-f5b403467b3d", 900) },
  ],

  regiao: [
    ["Centrinho de Arraial", "A igreja, o mirante e as ruas cheias de lojinhas e restaurantes.", "pertinho"],
    ["Rua do Mucugê", "O point da noite, com bares, comidinhas e artesanato.", "pertinho"],
    ["Praia do Mucugê e Pitinga", "Mar azul, falésias e barracas pé na areia.", "poucos min"],
    ["Balsa para Porto Seguro", "Travessia rápida para o centro histórico de Porto Seguro.", "de carro"],
  ],
  fotoRegiao: U("photo-1718992230074-7908a0b21bbd", 2000),

  horarios: [
    ["Check-in", "consulte a pousada"],
    ["Check-out", "consulte a pousada"],
    ["Reservas", "pelo WhatsApp"],
  ],

  faq: [
    ["Como faço uma reserva?", "É só clicar em qualquer botão do site. Você fala direto com a gente pelo WhatsApp e escolhe as datas."],
    ["A pousada fica perto do centrinho?", "Sim! Estamos em Arraial d'Ajuda, pertinho do centrinho e da Rua do Mucugê."],
    ["Tem piscina e café da manhã?", "Tem sim. Piscina para relaxar e café da manhã para começar o dia bem."],
    ["Quais as formas de pagamento?", "Fale com a gente pelo WhatsApp que passamos todas as opções."],
  ],
};
