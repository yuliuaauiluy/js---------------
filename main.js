const swiper = new Swiper('.main-slider', {
  slidesPerView: 'auto',   // Сколько слайдов видно одновременно
  spaceBetween: 16,   // Отступ между слайдами (px)
  centeredSlides: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".swiper-slide");
  const btnMore = document.querySelector(".show-more");
  const btnLess = document.querySelector(".show-less");

  function applyInitialState() {
    let visibleCount;

    if (window.innerWidth >= 1120) {
      visibleCount = 8; // ПК
    } else if (window.innerWidth >= 768) {
      visibleCount = 6; // Планшет
    } else {
      visibleCount = slides.length; // Мобильная версия — все показываем
    }

    slides.forEach((card, i) => {
      if (i >= visibleCount) {
        card.classList.add("hidden");
      } else {
        card.classList.remove("hidden");
      }
    });

    // Показываем кнопки только если есть скрытые карточки
    if (visibleCount < slides.length) {
      btnMore.style.display = "flex";
      btnLess.style.display = "none";
    } else {
      btnMore.style.display = "none";
      btnLess.style.display = "none";
    }
  }

  // Кнопка "Показать все"
  btnMore.addEventListener("click", () => {
    slides.forEach(card => card.classList.remove("hidden"));
    btnMore.style.display = "none";
    btnLess.style.display = "flex";
  });

  // Кнопка "Скрыть"
  btnLess.addEventListener("click", () => {
    applyInitialState();
  });

  // Первичная инициализация
  applyInitialState();

  // Пересчёт при изменении размера окна
  window.addEventListener("resize", applyInitialState);
});