function scrollTarget() {
  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var targetId = link.getAttribute("href").substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        var targetOffset = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }
    });
  });
}

scrollTarget();

document.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  if (window.scrollY > 50) {
    // Ajuste o valor de '50' para controlar o ponto de ativação
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
