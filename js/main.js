(function ($) {
  // Attendre que le document soit prêt
  jQuery(document).ready(function ($) {
    // Vérifier si le conteneur du portfolio existe
    var $portfolioContainer = $(".portfolio-container");

    if ($portfolioContainer.length) {
      // 1. Initialiser Isotope sur le conteneur
      var $portfolio = $portfolioContainer.isotope({
        itemSelector: ".portfolio-item", // Le sélecteur pour chaque élément du portfolio
        layoutMode: "fitRows", // Utiliser le mode 'fitRows' pour une mise en page standard
        percentPosition: true, // Important pour la mise en page responsive avec Bootstrap
      });

      // 2. Gérer les clics sur les boutons de filtre
      $(".btn-group button").on("click", function (e) {
        e.preventDefault(); // Empêcher l'action par défaut du bouton

        var filterValue = $(this).attr("data-filter");

        // Appliquer le filtre
        $portfolio.isotope({ filter: filterValue });

        // Mettre à jour la classe 'active' pour le style du bouton
        $(".btn-group button")
          .removeClass("active")
          .attr("aria-pressed", "false");
        $(this).addClass("active").attr("aria-pressed", "true");
      });
    }
  });

  // Attendre que le document soit prêt
  jQuery(document).ready(function ($) {
    // Vérifier si le conteneur du portfolio existe
    var $portfolioContainer = $(".portfolio-container");

    if ($portfolioContainer.length) {
      // 1. Initialiser Isotope sur le conteneur
      var $portfolio = $portfolioContainer.isotope({
        itemSelector: ".portfolio-item", // Le sélecteur pour chaque élément du portfolio
        layoutMode: "fitRows", // Utiliser le mode 'fitRows' pour une mise en page standard
        percentPosition: true, // Important pour la mise en page responsive avec Bootstrap
      });

      // 2. Gérer les clics sur les boutons de filtre
      $(".btn-group button").on("click", function (e) {
        e.preventDefault(); // Empêcher l'action par défaut du bouton

        var filterValue = $(this).attr("data-filter");

        // Appliquer le filtre
        $portfolio.isotope({ filter: filterValue });

        // Mettre à jour la classe 'active' pour le style du bouton
        $(".btn-group button")
          .removeClass("active")
          .attr("aria-pressed", "false");
        $(this).addClass("active").attr("aria-pressed", "true");
      });
    }
  });
  ("use strict");

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 45,
    dots: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 4,
      },
      768: {
        items: 6,
      },
      992: {
        items: 8,
      },
    },
  });
})(jQuery);
