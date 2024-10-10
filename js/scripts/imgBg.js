document.addEventListener("DOMContentLoaded", function () {
  const lazyBgElements = document.querySelectorAll(".lazy-image-background");

  const loadImage = (entry) => {
    const bgImg = entry.target.getAttribute("data-bg");
    entry.target.style.backgroundImage = `url(${bgImg})`;
    observer.unobserve(entry.target); // Para evitar que a imagem seja carregada novamente
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry);
      }
    });
  });

  lazyBgElements.forEach((el) => {
    observer.observe(el);
  });
});
