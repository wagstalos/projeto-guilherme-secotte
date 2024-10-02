function gtm() {
  // Seleciona o elemento pelo ID "js-agendar-consulta"

  let btnAgendar = document.getElementById("js-agendar-consulta");
  let btnContactHero = document.getElementById("js-contact-hero");
  let btnWhats = document.getElementById("whatsAppBtn");

  // Função para o botão do WhatsApp
  function gtmClickBtnAgendar() {
    gtag("event", "click_agendar_consulta", { debug_mode: true });
    //alert("click_agendar_consulta");
  }

  function gtmClickBtnContactHero() {
    gtag("event", "click_contato_hero", { debug_mode: true });
    //alert("click_contato_hero");
  }

  function gtmClickBtnWhats() {
    gtag("event", "click_whatsapp", { debug_mode: true });
    //alert("click_whats");
  }

  btnAgendar.addEventListener("click", gtmClickBtnAgendar);
  btnContactHero.addEventListener("click", gtmClickBtnContactHero);
  btnWhats.addEventListener("click", gtmClickBtnWhats);
}

const init = () => {
  // Aguarda o carregamento completo do DOM
  document.addEventListener("DOMContentLoaded", gtm);
};

init();
