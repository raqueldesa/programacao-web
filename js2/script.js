function getComputerChoice() {
  const choices = ["Pedra", "Papel", "Tesoura"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Empate";
  }
  if (
    (playerChoice === "Pedra" && computerChoice === "Tesoura") ||
    (playerChoice === "Papel" && computerChoice === "Pedra") ||
    (playerChoice === "Tesoura" && computerChoice === "Papel")
  ) {
    return "Jogador";
  }
  return "Computador";
}

let score = 0;

while (true) {
  let playerInput = prompt(
    "Escolha sua jogada: 1 - Papel, 2 - Pedra, 3 - Tesoura"
  );
  let playerChoice;

  if (playerInput === null) {
    alert("Jogo encerrado.");
    break;
  }

  playerInput = parseInt(playerInput);

  switch (playerInput) {
    case 1:
      playerChoice = "Papel";
      break;
    case 2:
      playerChoice = "Pedra";
      break;
    case 3:
      playerChoice = "Tesoura";
      break;
    default:
      alert("Opção inválida. Você perdeu a rodada.");
      alert("Pontuação total: " + score);
      break;
  }

  if (playerChoice) {
    const computerChoice = getComputerChoice();
    alert("Computador escolheu: " + computerChoice);

    const winner = determineWinner(playerChoice, computerChoice);

    if (winner === "Jogador") {
      score++;
      alert("Você ganhou esta rodada! Pontuação: " + score);
    } else if (winner === "Computador") {
      alert("Você perdeu esta rodada. Pontuação total: " + score);
      break;
    } else {
      alert("Empate! Tente novamente.");
    }
  } else {
    break;
  }
}

alert("Jogo terminado. Pontuação final: " + score);
