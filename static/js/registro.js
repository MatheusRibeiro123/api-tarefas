const btnRegister = document.getElementById("btn-register");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const inputConfirmar = document.getElementById("confirmar-senha");
const erroMsg = document.getElementById("erro-msg");
const sucessoMsg = document.getElementById("sucesso-msg");

function setErro(msg) {
  erroMsg.textContent = msg;
  erroMsg.classList.add("visivel");
  sucessoMsg.classList.remove("visivel");
}

function setSucesso(msg) {
  sucessoMsg.textContent = msg;
  sucessoMsg.classList.add("visivel");
  erroMsg.classList.remove("visivel");
}

function limparMensagens() {
  erroMsg.classList.remove("visivel");
  sucessoMsg.classList.remove("visivel");
  [inputNome, inputEmail, inputSenha, inputConfirmar].forEach(i =>
    i.classList.remove("erro")
  );
}

function setCarregando(sim) {
  btnRegister.disabled = sim;
  btnRegister.classList.toggle("carregando", sim);
}

async function fazerRegistro() {
  limparMensagens();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();
  const senha = inputSenha.value;
  const confirmar = inputConfirmar.value;

  if (!nome) {
    setErro("Preencha seu nome.");
    inputNome.classList.add("erro");
    inputNome.focus();
    return;
  }

  if (!email) {
    setErro("Preencha seu e-mail.");
    inputEmail.classList.add("erro");
    inputEmail.focus();
    return;
  }

  if (senha.length < 6) {
    setErro("A senha deve ter pelo menos 6 caracteres.");
    inputSenha.classList.add("erro");
    inputSenha.focus();
    return;
  }

  if (senha !== confirmar) {
    setErro("As senhas não coincidem.");
    inputConfirmar.classList.add("erro");
    inputConfirmar.focus();
    return;
  }

  setCarregando(true);

  try {
    // 🔹 REGISTRO
    const response = await fetch("/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ nome, email, senha })
});

let data;
try {
  data = await response.json();
} catch (e) {
  console.log("Erro ao ler resposta");
}

console.log("RESPOSTA REGISTER:", data);

if (response.ok && data?.access_token) {
  localStorage.setItem("token", data.access_token);

  setSucesso("Conta criada! Entrando...");

  window.location.href = "/tarefas";;

} else {
  console.log("ERRO REGISTER:", data);
  const msg = data?.error || data?.message || "Erro ao criar conta.";
  setErro(msg);
}

    

  } catch (error) {
    console.error("Erro:", error);
    setErro("Não foi possível conectar ao servidor.");
  } finally {
    setCarregando(false);
  }
}

// 🔥 EVENTO
btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  fazerRegistro();
});

// ENTER
inputNome.addEventListener("keydown", e => e.key === "Enter" && inputEmail.focus());
inputEmail.addEventListener("keydown", e => e.key === "Enter" && inputSenha.focus());
inputSenha.addEventListener("keydown", e => e.key === "Enter" && inputConfirmar.focus());
inputConfirmar.addEventListener("keydown", e => e.key === "Enter" && fazerRegistro());

[inputNome, inputEmail, inputSenha, inputConfirmar].forEach(i =>
  i.addEventListener("input", limparMensagens)
);