const btn = document.getElementById("accesoRapido");
btn.addEventListener("click", () => {
document.querySelector("input[name='nombre']").value = "admin";
document.querySelector("input[name='pass']").value = "1234";
});