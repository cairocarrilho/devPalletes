let botoes = document.querySelectorAll(".btn");
let mensagemDiv = document.getElementById("hide");
let btnRandon = document.querySelector('.botaoRandon')
btnRandon.addEventListener("click",randomCores)

botoes.forEach((botao) => botao.addEventListener("click", clickImg));

async function carregarPalleta() {
  const resposta = await fetch("./data.json");
  let jsonData = await resposta.json();
  const randomId = jsonData.filter((item) => item.id !== 1);
  if (randomId.length > 0) {
    const randon = randomId[Math.floor(Math.random() * randomId.length)];
    atribuirPalleta(randon.colorPalette);
  }
}

function atribuirPalleta(colorPalette) {
  let paragrafos = document.querySelectorAll(".resultado");
  let backGround = document.querySelectorAll(".cores");

  colorPalette.forEach((item, index) => {
    if (index < paragrafos.length) {
      paragrafos[index].textContent = item.toLocaleUpperCase();
      paragrafos[index].style.backgroundColor = item;
      backGround[index].style.backgroundColor = item;
    }
  });
}
carregarPalleta();

function clickImg(e) {
  e.preventDefault();
  let alerta = document.querySelector(".alerta");
  alerta.innerHTML = "Copiado para area de transferencia";
  mostrarMsg();
}

function mostrarMsg() {
  mensagemDiv.style.display = "block";
  mensagemDiv.classList.add("mostrar");

  setTimeout(function () {
    mensagemDiv.classList.add("esconder");
    setTimeout(() => {
      mensagemDiv.classList.remove('mostrar', 'esconder');
      mensagemDiv.style.display = "none";
    }, 500);
  }, 600);
}

function randomCores(){
  carregarPalleta()

}