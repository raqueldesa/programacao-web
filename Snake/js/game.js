(function () {
  let FPS = 10;
  const SIZE = 40;
  let board, snake, food, score, intervalId, isPaused, isEnded;
  let isRunning = false;
  const DIRECTIONS = {
    0: "ArrowUp",
    1: "ArrowRight",
    2: "ArrowDown",
    3: "ArrowLeft",
  };
  const DIRECTION_VECTORS = { 0: [-1, 0], 1: [0, 1], 2: [1, 0], 3: [0, -1] };

  function init() {
    board = new Board(SIZE);
    snake = new Snake([
      [4, 4],
      [4, 5],
      [4, 6],
    ]);
    score = 0;
    isPaused = false;
    isEnded = false;
    updateScore();
    generateFood();
  }

  function startGame() {
    if (isRunning) return;
    isRunning = true;
    intervalId = setInterval(run, 1000 / FPS);
  }

  function stopGame() {
    clearInterval(intervalId);
    isRunning = false;
  }

  function endGame(msg) {
    document.getElementById("msg").innerText = msg;
    isEnded = true;
    setTimeout(() => {
      document.getElementById("msg").innerText =
        "Começando novo jogo em 3...2...1..";
    }, 2000);

    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  }

  window.addEventListener("keydown", (e) => {
    if (!isRunning && e.key === "S") {
      // init();
      startGame();
    }
    if (e.key === "p") {
      if (isPaused) {
        startGame();
        isPaused = false;
      } else {
        stopGame();
        isPaused = true;
      }
    }
    if (
      !isPaused &&
      DIRECTIONS[snake.direction] !== e.key &&
      Math.abs(
        snake.direction -
          Object.keys(DIRECTIONS).find((key) => DIRECTIONS[key] === e.key)
      ) !== 2
    ) {
      snake.changeDirection(
        Object.keys(DIRECTIONS).find((key) => DIRECTIONS[key] === e.key)
      );
    }
  });

  class Board {
    constructor(size) {
      this.size = size;
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }
    setField([x, y], color) {
      this.element.rows[x].cells[y].style.backgroundColor = color;
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1;
      this.body.forEach((field) => board.setField(field, this.color));
    }
    walk() {
      const head = this.body[this.body.length - 1];
      const [dx, dy] = DIRECTION_VECTORS[this.direction];
      const newHead = [head[0] + dx, head[1] + dy];

      // Verificação de colisão com paredes ou com o próprio corpo
      if (
        newHead[0] < 0 ||
        newHead[0] >= SIZE ||
        newHead[1] < 0 ||
        newHead[1] >= SIZE ||
        this.body.some(
          (segment) => segment[0] === newHead[0] && segment[1] === newHead[1]
        )
      ) {
        stopGame();
        endGame("Fim de Jogo!");
        return;
      }

      this.body.push(newHead);
      board.setField(newHead, this.color);

      // Verificação de colisão com o alimento
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        score += food[2];
        updateScore();
        generateFood();
      } else {
        const oldTail = this.body.shift();
        board.setField(oldTail, board.color);
      }
    }
    changeDirection(direction) {
      this.direction = direction;
    }
  }

  function updateScore() {
    document.getElementById("score").innerText = `${score
      .toString()
      .padStart(5, "0")}`;
  }

  function generateFood() {
    let x, y;
    do {
      x = Math.floor(Math.random() * SIZE);
      y = Math.floor(Math.random() * SIZE);
    } while (
      snake.body.some((segment) => segment[0] === x && segment[1] === y)
    );

    const isRed = Math.random() < 0.33;
    food = [x, y, isRed ? 2 : 1];
    board.setField(food, isRed ? "red" : "black");
  }

  function run() {
    snake.walk();
    if (isRunning) {
      FPS += 0.1;
      clearInterval(intervalId);
      intervalId = setInterval(run, 1000 / FPS);
    }
  }

  init();
})();
