const formulario = document.querySelector("#form");
const inputCep = document.querySelector("#cep");
const divResultado = document.querySelector("#resultado");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  informaUsuario({ carregando: true });

  // pega o valor do inputCep e remove os espaços
  const valorCep = inputCep.value.trim();

  //remove tudo que não for dígito do CEP
  const cepSanitizado = valorCep.replace(/\D/g, "");

  if (cepSanitizado.length != 8) {
    const invalido = { invalido: true };
    informaUsuario(invalido);
    return;
  }

  const dadosCEP = await buscaCep(cepSanitizado);

  informaUsuario(dadosCEP);
});

async function buscaCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  let response;
  let responseBody;

  try {
    response = await fetch(url);
    if (response.ok == false) {
      throw Error("servidor recusou a requisição.");
    }
    responseBody = await response.json();
  } catch (error) {
    console.log(error);
    informaUsuario({ serverError: true });
  }

  console.log(response);
  console.log(responseBody);
  return responseBody;
}

function informaUsuario(dados) {
  if (dados.carregando) {
    divResultado.innerHTML = `
        <p> Buscando CEP... </p>
        `;
  } else if (dados.serverError) {
    divResultado.innerHTML = `
        <p> Não foi possível consultar. Tente novamente. </p>
        `;
  } else if (dados.invalido) {
    divResultado.innerHTML = `
        <p> CEP inválido! Precisa ter 8 números. </p>
        `;
  } else if (dados.erro) {
    divResultado.innerHTML = `
        <p> CEP não encontrado. </p>
        `;
  } else {
    divResultado.innerHTML = `
    <p> CEP: ${dados.cep}. </p>
    <p> logradouro: ${dados.logradouro}. </p>
    <p> bairro: ${dados.bairro}. </p>
    <p> cidade: ${dados.localidade}. </p>
    <p> UF: ${dados.uf}. </p>
    `;
  }
}
