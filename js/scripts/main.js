AOS.init();
document
  .getElementById("video-thumbnail")
  .addEventListener("click", function () {
    var youtubeDiv = document.getElementById("youtube-video");
    youtubeDiv.innerHTML =
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/oZysMeFfN9w?si=Xkkei4cnV9e3Chc8&autoplay=1&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  });

document.getElementById("map-thumbnail").addEventListener("click", function () {
  // Substituir a imagem pelo iframe do Google Maps quando o usuário clicar '<iframe width="100%" height="315" src="https://www.youtube.com/embed/oZysMeFfN9w?si=Xkkei4cnV9e3Chc8&autoplay=1&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  var mapContainer = document.getElementById("map-container");
  mapContainer.innerHTML =
    '<iframe width="100%" height="290" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7315.196052332108!2d-46.65625800000001!3d-23.546956!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5830b3047101%3A0xa3e843c4b2bf87bd!2sR.%20Itacolomi%2C%20333%20-%20Higien%C3%B3polis%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001239-020%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1727297139387!5m2!1spt-BR!2sus" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';
});

//cometarios planilha
const csvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmrZxXBHH3ssDwcG4KxBPd_HI1cEC1sErlA-SkdqGltKgUiY95-HiIUfAyc_Zk3cKMXGVJgGT3ACGb/pub?output=csv";

fetch(csvUrl)
  .then((response) => response.text())
  .then((csv) => {
    const dados = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    }).data;

    console.log("Dados processados:", dados);

    const container = document.getElementById("comentarios");
    container.innerHTML = `
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <!-- Slides vão aqui -->
        </div>
        <!-- Paginação -->
        <div class="swiper-pagination"></div>
        <!-- Navegação -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <!-- Scrollbar -->
        <div class="swiper-scrollbar"></div>
      </div>
    `;

    const wrapper = container.querySelector(".swiper-wrapper");

    dados.forEach((item) => {
      const nome = item.Nome || "Anônimo";
      const comentario = item["Comentário"] || "";
      const nota = parseInt(item.Nota) || 0;
      const estrelas = "⭐".repeat(nota);

      const slide = document.createElement("div");
      slide.classList.add("swiper-slide", "card");
      slide.innerHTML = `
        <div class="nota"> ${estrelas}</div>
        <h4 class="nome">${nome}</h4>
        <p class="comments">${comentario}</p>
      `;

      wrapper.appendChild(slide);
    });

    // Inicializar o Swiper depois que os slides forem criados
    var swiper = new Swiper(".mySwiper", {
      loop: false,
      slidesPerView: 1.2,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      scrollbar: {
        el: ".swiper-pagination",
      },

      breakpoints: {
        600: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        900: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  })
  .catch((error) => {
    document.getElementById("comentarios").innerText =
      "Erro ao carregar comentários.";
    console.error("Erro ao buscar CSV:", error);
  });
