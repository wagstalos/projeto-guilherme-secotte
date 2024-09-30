document.addEventListener("DOMContentLoaded", function () {
  const lazyBgElements = document.querySelectorAll(".lazy-image-background");

  lazyBgElements.forEach((el) => {
    const bgImg = el.getAttribute("data-bg");
    el.style.backgroundImage = `url(${bgImg})`;
  });
});

