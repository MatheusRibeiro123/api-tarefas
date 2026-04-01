// 🔹 pega token
const token = localStorage.getItem("token");

// 🔹 verifica login
if (!token) {
    alert("Você precisa estar logado!");
    window.location.href = "login.html";
}

// 🔹 elementos do HTML
const lista = document.getElementById("lista-tarefas");
const inputTitulo = document.getElementById("input-titulo");
const inputDescricao = document.getElementById("input-descricao");
const botao = document.getElementById("btn-add");


// 🔹 FUNÇÃO para carregar tarefas
async function carregarTarefas() {
    try {
        const response = await fetch("http://localhost:5000/task/tarefas", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar tarefas");
        }

        const tarefas = await response.json();

        lista.innerHTML = "";

        tarefas.forEach(function(tarefa) {
            const div = document.createElement("div");

            // 🔹 TEXTO
            const texto = document.createElement("span");
            texto.innerText = `${tarefa.titulo} - ${tarefa.descricao || ""} (${tarefa.status})`;

            div.appendChild(texto);

            // 🔴 BOTÃO EXCLUIR
            const botaoExcluir = document.createElement("button");
            botaoExcluir.innerText = "Excluir";
            botaoExcluir.addEventListener("click", function () {
                deletarTarefa(tarefa.id);
            });

            // ✏️ BOTÃO EDITAR
            const botaoEditar = document.createElement("button");
            botaoEditar.innerText = "Editar";
            botaoEditar.addEventListener("click", function () {
                editarTarefa(tarefa);
            });

            // ✅ BOTÃO CONCLUIR
            const botaoConcluir = document.createElement("button");
            botaoConcluir.innerText = "Concluir";
            botaoConcluir.addEventListener("click", function () {
                concluirTarefa(tarefa.id);
            });

            // 🔥 ORDEM CORRETA
            div.appendChild(botaoEditar);
            div.appendChild(botaoExcluir);
            div.appendChild(botaoConcluir);

            lista.appendChild(div);
        });

    } catch (error) {
        console.error("Erro:", error);

        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
}


// ✏️ FUNÇÃO EDITAR
async function editarTarefa(tarefa) {
    const novoTitulo = prompt("Novo título:", tarefa.titulo);
    const novaDescricao = prompt("Nova descrição:", tarefa.descricao);

    if (!novoTitulo) {
        alert("Título não pode ser vazio");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/task/tarefas/${tarefa.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                titulo: novoTitulo,
                descricao: novaDescricao
            })
        });

        if (response.ok) {
            carregarTarefas();
        } else {
            alert("Erro ao editar tarefa");
        }

    } catch (error) {
        console.error("Erro:", error);
    }
}


// ✅ FUNÇÃO CONCLUIR
async function concluirTarefa(id) {
    try {
        const response = await fetch(`http://localhost:5000/task/tarefas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                status: "concluida"
            })
        });

        if (response.ok) {
            carregarTarefas();
        } else {
            alert("Erro ao concluir tarefa");
        }

    } catch (error) {
        console.error("Erro:", error);
    }
}


// ➕ FUNÇÃO CRIAR
botao.addEventListener("click", async function() {
    const titulo = inputTitulo.value;
    const descricao = inputDescricao.value;

    if (!titulo) {
        alert("Digite um título");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/task/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao
            })
        });

        if (response.ok) {
            inputTitulo.value = "";
            inputDescricao.value = "";
            carregarTarefas();
        } else {
            alert("Erro ao criar tarefa");
        }

    } catch (error) {
        console.error("Erro:", error);
    }
});


// ❌ FUNÇÃO DELETAR
async function deletarTarefa(id) {
    try {
        const response = await fetch(`http://localhost:5000/task/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.ok) {
            carregarTarefas();
        } else {
            alert("Erro ao deletar tarefa");
        }

    } catch (error) {
        console.error("Erro:", error);
    }
}


// 🚀 executa ao abrir
carregarTarefas();