const botao = document.querySelector("button");

botao.addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    console.log("Email:", email);
});