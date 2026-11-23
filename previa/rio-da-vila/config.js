/* Prévia: Pousada Rio da Vila (Porto Seguro, BA)
   Fotos ilustrativas de banco de imagens. Trocar pelas fotos reais da pousada quando o cliente aprovar. */
const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

window.POUSADA = {
  nome: "Rio da Vila",
  tipo: "Pousada",
  cidade: "Porto Seguro",
  estado: "BA",
  bairro: "Cidade Histórica",
  slogan: "Pousada na Cidade Histórica de Porto Seguro, perto do centrinho, das praias e da balsa para Arraial d'Ajuda.",
  descricao:
    "A Pousada Rio da Vila fica na Rua São Brás, na Cidade Histórica de Porto Seguro. Daqui você chega a pé ao centrinho e à Passarela do Álcool, e em poucos minutos às praias e à balsa para Arraial d'Ajuda.",

  seoTitulo: "Pousada Rio da Vila | Hospedagem na Cidade Histórica de Porto Seguro",
  seoDescricao: "Pousada Rio da Vila, na Cidade Histórica de Porto Seguro (BA). Nota 4,4 no Google com 176 avaliações. Consulte disponibilidade e reserve direto pelo WhatsApp.",

  heroVideo: "",
  heroFoto: U("photo-1729615220879-5391fcfae406", 2400),

  whatsapp: "5573988381181",
  whatsappTexto: "(73) 98838-1181",
  instagram: "Instagram da pousada",
  endereco: "R. São Brás, 163, Cidade Histórica, Porto Seguro, BA",

  numeros: [
    ["4,4", "nota no Google"],
    ["176", "avaliações"],
    ["Centro", "histórico"],
    ["Direto", "no WhatsApp"],
  ],

  // Preços em branco = "Consulte". Trocar pelos valores reais.
  quartos: [
    { nome: "Suíte Casal", resumo: "Para quem vem a dois e quer ficar perto de tudo.", foto: U("photo-1611892440504-42a792e24d32"), itens: ["Até 2 pessoas", "Ar-condicionado", "Banheiro privativo"], preco: null },
    { nome: "Suíte Família", resumo: "Espaço para a família toda descansar depois da praia.", foto: U("photo-1601565415267-724db0e9fbdf"), itens: ["Até 4 pessoas", "Ar-condicionado", "Banheiro privativo"], preco: null },
    { nome: "Suíte Standard", resumo: "Confortável e prática, ótima para curtir a cidade.", foto: U("photo-1700004060538-cb750e9a2992"), itens: ["Até 2 pessoas", "Ventilador ou ar", "Banheiro privativo"], preco: null },
  ],

  galeria: [
    { t1: "Cidade", t2: "Histórica", desc: "Ruas de pedra, casarios coloridos e a vista do mar.", foto: U("photo-1718992230074-7908a0b21bbd", 900) },
    { t1: "Praias", t2: "de Porto Seguro", desc: "Taperapuã, Mutá e outras praias a poucos minutos.", foto: U("photo-1561733631-f2481dfd7425", 900) },
    { t1: "Descanso", t2: "garantido", desc: "Quartos pensados para você recarregar as energias.", foto: U("photo-1774280954999-9758f11f3d41", 900) },
    { t1: "Café", t2: "da manhã", desc: "Comece o dia bem antes de sair para passear.", foto: U("photo-1728050829024-8113f4cd85ec", 900) },
    { t1: "Fim", t2: "de tarde", desc: "O pôr do sol baiano que todo mundo vem ver.", foto: U("photo-1729615220950-f5b403467b3d", 900) },
  ],

  regiao: [
    ["Centro Histórico", "Onde o Brasil começou: igrejas, mirante e casarios.", "a pé"],
    ["Passarela do Álcool", "Restaurantes, lojinhas e a vida noturna da cidade.", "a pé"],
    ["Balsa para Arraial d'Ajuda", "Travessia rápida para as praias de Arraial e Trancoso.", "poucos min"],
    ["Praia de Taperapuã", "Barracas, mar calmo e estrutura completa.", "de carro"],
  ],
  fotoRegiao: U("photo-1718992230074-7908a0b21bbd", 2000),

  horarios: [
    ["Check-in", "consulte a pousada"],
    ["Check-out", "consulte a pousada"],
    ["Reservas", "pelo WhatsApp"],
  ],

  faq: [
    ["Como faço uma reserva?", "É só clicar em qualquer botão do site. Você fala direto com a gente pelo WhatsApp e já escolhe as datas."],
    ["A pousada fica perto do centro?", "Sim. Estamos na Cidade Histórica, com o centrinho e a Passarela do Álcool a poucos passos."],
    ["Como chego até Arraial d'Ajuda?", "A balsa sai do centro de Porto Seguro e a travessia é rápida. A gente explica o caminho na hora da reserva."],
    ["Quais as formas de pagamento?", "Fale com a gente pelo WhatsApp que passamos todas as opções."],
  ],
};
