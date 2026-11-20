const temaEscolhido = localStorage.getItem("preferencia-tema");
const listaCompras = JSON.parse(localStorage.getItem("lista-compras"));
const objAluno = JSON.parse(localStorage.getItem("obj-aluno"));

console.log(listaCompras);
console.log(typeof listaCompras);
console.log(listaCompras.length);

console.log(objAluno);

const inputTema = document.querySelector("#tema");
const formulario = document.querySelector("form");

if (temaEscolhido) {
  inputTema.value = temaEscolhido;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (inputTema.value) {
    localStorage.setItem("preferencia-tema", inputTema.value);
  }

  const compras = ["café", "pão", "queijo"];

  localStorage.setItem("lista-compras", JSON.stringify(compras));

  const aluno = { nome: "Sara", apelido: "SR", curso: "FER", turma: "5" };
  localStorage.setItem("obj-aluno", JSON.stringify(aluno));
});


let countdownId;
let cont = 0;
const button = document.querySelector("#btnInterval");

button.addEventListener("click", () => {
  clearInterval(countdownId);
  cont = 0;
  countdownId = setInterval(contar, 1000);
});

function contar() {
    console.log(cont++);
}

