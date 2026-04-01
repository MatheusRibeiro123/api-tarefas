const form = document.getElementById("form-login");

form.addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const data = await response.json();

        //  verifica se login deu certo
        if (response.ok) {
            localStorage.setItem("token", data.access_token);
            window.location.href = "tarefas.html";
        } else {
            alert("Email ou senha inválidos");
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor");
    }
});