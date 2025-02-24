// Objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// Lista de armários disponíveis
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// Função para reservar armário
function reservarArmario() {
  
  // Obter tipo de armário selecionado pelo usuário no HTML
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // Filtrar armários disponíveis e acessíveis ao usuário
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // Caso não existam armários disponíveis, exibir mensagem e encerrar
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Selecionar aleatoriamente um armário disponível
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Atualizar status do armário para reservado
  armarioSorteado.status = false;

  // Atualizar a pendência do usuário
  usuario.pendencia = true;
  
  // Obter data e hora da reserva
  let dataHoraReserva = new Date();
  
  // Calcular data e hora para entrega (24 horas depois)
  let dataHoraEntrega = new Date(dataHoraReserva);
  dataHoraEntrega.setHours(dataHoraEntrega.getHours() + 24);
  
  // Salvar datas no objeto do armário
  armarioSorteado.dataHoraReserva = dataHoraReserva;
  armarioSorteado.dataHoraEntrega = dataHoraEntrega;
  
  // Formatar data e hora para exibição
  let opcoesFormato = { 
      day: '2-digit', month: '2-digit', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
  };
  let dataHoraFormatada = dataHoraEntrega.toLocaleString('pt-BR', opcoesFormato);
  
  // Exibir mensagem no HTML com a data de entrega
  document.getElementById("resultado").innerText = 
      `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\nEntrega das chaves até: ${dataHoraFormatada}`;


  console.log("Usuário atualizado:", usuario);
  console.log("Armário reservado:", armarioSorteado);
}