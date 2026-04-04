const btnLogin = document.getElementById("btn-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const erroMsg = document.getElementById("erro-msg");

function setErro(msg) {
  erroMsg.textContent = msg;
  erroMsg.classList.add("visivel");
  inputEmail.classList.add("erro");
  inputSenha.classList.add("erro");
}

function limparErro() {
  erroMsg.classList.remove("visivel");
  inputEmail.classList.remove("erro");
  inputSenha.classList.remove("erro");
}

function setCarregando(sim) {
  btnLogin.disabled = sim;
  btnLogin.classList.toggle("carregando", sim);
}

async function fazerLogin() {
  limparErro();

  const email = inputEmail.value.trim();
  const senha = inputSenha.value;

  if (!email || !senha) {
    setErro("Preencha e-mail e senha.");
    return;
  }

  setCarregando(true);

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      window.location.href = "/login";
    } else {
      setErro("E-mail ou senha inválidos.");
      inputSenha.value = "";
      inputSenha.focus();
    }

  } catch (error) {
    console.error("Erro:", error);
    setErro("Não foi possível conectar ao servidor.");
  } finally {
    setCarregando(false);
  }
}

btnLogin.addEventListener("click", fazerLogin);

inputEmail.addEventListener("keydown", e => e.key === "Enter" && inputSenha.focus());
inputSenha.addEventListener("keydown", e => e.key === "Enter" && fazerLogin());

inputEmail.addEventListener("input", limparErro);
inputSenha.addEventListener("input", limparErro);
