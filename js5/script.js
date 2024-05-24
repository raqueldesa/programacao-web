const dom = document;

const btnOK = dom.getElementById("btn-ok");

btnOK.onclick = function calcula() {
  const largura = dom.getElementById("largura").value;
  const barras = dom.getElementsByClassName("barra");
  const cor = dom.getElementById("cor").value;

  for (let i = 0; i < barras.length; i++) {
    const inputAltura = dom.getElementById(`barra${i + 1}`).value;

    barras[i].style.setProperty("height", `${inputAltura}px`);
    barras[i].style.setProperty("width", `${largura}px`);
    barras[i].style.setProperty("background-color", cor);
  }
};
