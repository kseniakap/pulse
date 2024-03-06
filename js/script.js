$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icon/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icon/right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay,#consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay,#consultation,#thanks,#order").fadeOut("slow");
  });

  //Сhange text

  $(".catalog-item__btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay,#order").fadeIn("slow");
    });
  });

  //ValideForms

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format(" Введите {0} символа! "),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }
  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    // if (!$(this).valid()) {
    //   return;
    // }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //Плавный скролл вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
      //eсли пользователь проскроллить страницу более чем на 1200px
      //у элемента + display: none;
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
  // анимация
  new WOW().init();
});
