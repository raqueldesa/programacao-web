(function () {
  window.document.body.addEventListener("mousemove", (e) => {
    const ponto = document.createElement("div");
    ponto.className = "ponto";
    ponto.style.left = `${e.clientX}px`;
    ponto.style.top = `${e.clientY}px`;

    window.document.body.appendChild(ponto);

    const pontos = document.getElementsByClassName("ponto");

    if (pontos.length >= 8) {
      window.document.body.removeChild(pontos[0]);
    }
  });
})();
