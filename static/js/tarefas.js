// 🔹 pega token
const token = localStorage.getItem("token");

// 🔹 verifica login (SEM delay, sem bug)
if (!token) {
  window.location.href = "login.html";
}

// 🔹 LOGOUT
const btnLogout = document.getElementById("btn-logout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

// 🔹 elementos
const lista = document.getElementById("lista-tarefas");
const inputTitulo = document.getElementById("input-titulo");
const inputDescricao = document.getElementById("input-descricao");
const botao = document.getElementById("btn-add");

// stats
const statTotal = document.getElementById("stat-total");
const statPendente = document.getElementById("stat-pendente");
const statConcluida = document.getElementById("stat-concluida");
const sectionCount = document.getElementById("section-count");

// modal
const modalOverlay = document.getElementById("modal-overlay");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const modalCancel = document.getElementById("modal-cancel");
const modalSave = document.getElementById("modal-save");

// filtros
let filtroAtivo = "todas";
let tarefasCache = [];
let tarefaEditando = null;

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtroAtivo = btn.dataset.filter;
    renderTarefas();
  });
});

// 🔔 TOAST
function showToast(msg, tipo = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast ${tipo} show`;
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// 📊 STATS
function atualizarStats(tarefas) {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.status === "concluida").length;
  const pendentes = total - concluidas;

  statTotal.textContent = total;
  statPendente.textContent = pendentes;
  statConcluida.textContent = concluidas;
}

// 🎨 RENDER
function renderTarefas() {
  let filtradas = tarefasCache;

  if (filtroAtivo !== "todas") {
    filtradas = tarefasCache.filter(t => t.status === filtroAtivo);
  }

  sectionCount.textContent = `${filtradas.length} tarefa${filtradas.length !== 1 ? "s" : ""}`;

  if (filtradas.length === 0) {
    lista.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✦</div>
        <p>Nenhuma tarefa aqui.<br>Que tal adicionar uma?</p>
      </div>`;
    return;
  }

  lista.innerHTML = "";

  filtradas.forEach((tarefa, i) => {
    const card = document.createElement("div");

    card.className = `task-card${tarefa.status === "concluida" ? " concluida" : ""}`;
    card.style.animationDelay = `${i * 0.04}s`;

    const statusLabel = tarefa.status === "concluida" ? "Concluída" : "Pendente";

    card.innerHTML = `
      <div class="status-dot"></div>
      <div class="task-body">
        <div class="task-title">${escHtml(tarefa.titulo)}</div>
        ${tarefa.descricao ? `<div class="task-desc">${escHtml(tarefa.descricao)}</div>` : ""}
      </div>
      <div class="task-status-badge">${statusLabel}</div>
      <div class="task-actions">
        ${tarefa.status !== "concluida" ? `<button class="action-btn btn-done" data-id="${tarefa.id}">✓</button>` : ""}
        <button class="action-btn btn-edit" data-id="${tarefa.id}">Editar</button>
        <button class="action-btn btn-delete" data-id="${tarefa.id}">Excluir</button>
      </div>
    `;

    lista.appendChild(card);
  });

  lista.querySelectorAll(".btn-done").forEach(btn =>
    btn.addEventListener("click", () => concluirTarefa(btn.dataset.id)));

  lista.querySelectorAll(".btn-edit").forEach(btn =>
    btn.addEventListener("click", () => abrirModal(btn.dataset.id)));

  lista.querySelectorAll(".btn-delete").forEach(btn =>
    btn.addEventListener("click", () => deletarTarefa(btn.dataset.id)));
}

// escape
function escHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

// 🔹 CARREGAR
async function carregarTarefas() {
  try {
    const response = await fetch("http://localhost:5000/task/tarefas", {
      headers: { "Authorization": "Bearer " + token }
    });

    if (!response.ok) throw new Error();

    tarefasCache = await response.json();

    atualizarStats(tarefasCache);
    renderTarefas();

  } catch (error) {
    showToast("Sessão expirada.", "error");

    localStorage.removeItem("token");
    setTimeout(() => window.location.href = "login.html", 1000);
  }
}

// ➕ CRIAR
botao.addEventListener("click", async () => {
  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();

  if (!titulo) {
    showToast("Digite um título.", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/task/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ titulo, descricao })
    });

    if (response.ok) {
      inputTitulo.value = "";
      inputDescricao.value = "";
      showToast("Tarefa criada! ✦");
      await carregarTarefas();
    } else {
      showToast("Erro ao criar.", "error");
    }

  } catch {
    showToast("Erro de conexão.", "error");
  }
});

// ✏️ MODAL
function abrirModal(id) {
  tarefaEditando = tarefasCache.find(t => t.id == id);
  if (!tarefaEditando) return;

  modalTitulo.value = tarefaEditando.titulo;
  modalDescricao.value = tarefaEditando.descricao || "";
  modalOverlay.classList.add("open");
}

modalCancel.addEventListener("click", () => modalOverlay.classList.remove("open"));

modalSave.addEventListener("click", async () => {
  try {
    const response = await fetch(`http://localhost:5000/task/tarefas/${tarefaEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        titulo: modalTitulo.value,
        descricao: modalDescricao.value
      })
    });

    if (response.ok) {
      modalOverlay.classList.remove("open");
      showToast("Atualizada! ✦");
      await carregarTarefas();
    }

  } catch {}
});

// ✅ CONCLUIR
async function concluirTarefa(id) {
  await fetch(`http://localhost:5000/task/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ status: "concluida" })
  });

  showToast("Concluída! ✦");
  await carregarTarefas();
}

// ❌ DELETAR
async function deletarTarefa(id) {
  await fetch(`http://localhost:5000/task/tarefas/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });

  showToast("Removida.");
  await carregarTarefas();
}

// 🚀 iniciar
carregarTarefas();