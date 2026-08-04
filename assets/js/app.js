// Marca o link da página atual no menu
document.addEventListener("DOMContentLoaded", function () {
  const paginaAtual = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a").forEach(function (link) {
    if (link.getAttribute("href") === paginaAtual) {
      link.style.background = "#f28c28";
    }
  });

  // Rolagem suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const alvo = document.querySelector(this.getAttribute("href"));
      if (alvo) {
        e.preventDefault();
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Ano automático no rodapé
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
});
