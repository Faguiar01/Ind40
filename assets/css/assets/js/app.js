// Marca o link ativo no menu e adiciona ano automático no rodapé
document.addEventListener("DOMContentLoaded", () => {
  const atual = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href").includes(atual)) {
      a.style.textDecoration = "underline";
    }
  });

  const footer = document.querySelector("footer");
  if (footer && !footer.textContent.includes("2026")) {
    footer.textContent += " · " + new Date().getFullYear();
  }

  // Rolagem suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const alvo = document.querySelector(link.getAttribute("href"));
      if (alvo) {
        e.preventDefault();
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
