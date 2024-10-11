
let mensagemDiv = document.getElementById("hide");
let btnRandon = document.querySelector('.botaoRandon')
let paragrafos = document.querySelectorAll(".resultado");
let backGround = document.querySelectorAll(".cores");


btnRandon.addEventListener("click",randomCores)

paragrafos.forEach(paragrafo => {
  paragrafo.addEventListener('click', clickImg);
});

async function carregarPalleta() {
  try {
    const resposta = await fetch("./data.json");
    const jsonData = await resposta.json();
    const randomId = jsonData.filter((item) => item.id !== 1);
    if (randomId.length > 0) {
      const randon = randomId[Math.floor(Math.random() * randomId.length)];
      atribuirPalleta(randon.colorPalette);
    }
  } catch (error) {
    console.error("Erro ao carregar o JSON:", error);
  }
}

function atribuirPalleta(colorPalette) {

  colorPalette.forEach((item, index) => {
    if (index < paragrafos.length) {
      paragrafos[index].textContent = item.toLocaleUpperCase();
      paragrafos[index].style.backgroundColor = item;
      backGround[index].style.backgroundColor = item;
    }
  });
}
function randomCores(){
  carregarPalleta()

}


function clickImg(e) {
  e.preventDefault();
  const selectedColor = e.target.textContent;
  navigator.clipboard.writeText(selectedColor).then(() => {
    let alerta = document.querySelector(".alerta");
    alerta.textContent = `Cor ${selectedColor} copiada com sucesso`;

  }).catch(err => {
    console.error('Erro ao copiar para a área de transferência', err);
  });
  mostrarMsg();
}

function mostrarMsg() {
  mensagemDiv.style.display = "block";
  mensagemDiv.classList.add("mostrar");

  setTimeout(function () {
    mensagemDiv.classList.add("esconder");
    setTimeout(() => {       mensagemDiv.classList.remove('mostrar', 'esconder');
      mensagemDiv.style.display = "none";
    }, 500);
   }, 600);
 }

function randomCores(){
  carregarPalleta()

}



carregarPalleta();