/* CUSTOM CURSOR */
$(document).ready(() => {
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");
  let links = document.querySelectorAll("a");
  let titles = document.querySelectorAll("h1");
  const menuOpen = document.querySelector("#open-menu");
  const menuClose = document.querySelector("#close-menu");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    //cursorOutline.style.left = `${posX}px`;
    //cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 300, fill: "forwards" }
    );
  });

  //Enlarge the cursor outline when hovering the links below
  links.forEach((link) => {
    link.addEventListener("mousemove", () => {
      cursorOutline.classList.add("grow");
    });
    link.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("grow");
    });
  });
  menuOpen.addEventListener("mousemove", () => {
    cursorOutline.classList.add("grow");
  });
  menuOpen.addEventListener("mouseleave", () => {
    cursorOutline.classList.remove("grow");
  });
  menuClose.addEventListener("mousemove", () => {
    cursorOutline.classList.add("grow");
  });
  menuClose.addEventListener("mouseleave", () => {
    cursorOutline.classList.remove("grow");
  });
});

/* OVERLAY MENU REVEAL ANIMATION */
$(document).ready(() => {
  let animation = gsap.timeline({ paused: true, reversed: true });
  animation
    .to("header", { height: 0, opacity: 0, duration: 0.5, ease: "power2.out" })

    .to(
      "#home-banner .container h1",
      {
        opacity: 0,
        duration: 0.5,
        y: -100,
        stagger: { each: 0.1, ease: "power1.inout" },
      },
      "+=.1"
    )

    .to(
      "#home-banner .container .banner-content",
      {
        opacity: 0,
        duration: 0.3,
        y: 100,
      },
      "-=.3"
    )

    .to(
      "#home-banner .banner-image, .slide",
      { opacity: 0, duration: 0.7 },
      "-=.1"
    )

    .to(
      ".stagger-bars .bar",
      {
        height: "100vh",
        duration: 0.3,
        stagger: { each: 0.1, ease: "power1.inout" },
      },
      "-=.1"
    )

    .to(
      ".overlay-menu",
      { height: "100vh", duration: 0.5, ease: "power2.inout" },
      "-=.3"
    )

    .to(
      ".overlay-header",
      { opacity: 1, duration: 0.5, stagger: { each: 0.2, ease: "power2.in" } },
      "-=.3"
    )

    .from(
      ".overlay-menu .overlay-image",
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=.1"
    );

  $("#open-menu").click(() => {
    animation.play();

    setTimeout(() => {
      $("body").addClass("hideScroll");
    }, 0);
  });

  $("#close-menu").click(() => {
    animation.reverse();
    setTimeout(() => {
      $("body").removeClass("hideScroll");
    }, 3000);
  });

  $(".overlay-menu a").click(() => {
    animation.reverse();
    setTimeout(() => {
      $("body").removeClass("hideScroll");
    }, 2500);
  });
});

/* CANVAS MENU ANIMATION */
$(document).ready(() => {
  let tl = gsap.timeline({ paused: true });

  tl.to("#landing .landingWrapper, nav", 0.3, {
    opacity: 0,
    ease: "Expo.easeInOut",
  })
    .to(
      "#landing .overlay",
      0.3,
      {
        zIndex: 7,
        ease: "Expo.easeInOut",
      },
      "-=.3"
    )
    .to("#overlayMenu", 0.8, {
      zIndex: 10,
      right: "0%",
      opacity: 1,
      ease: "Expo.easeInOut",
    })
    .to(".overlayLink", 0.5, {
      opacity: 1,
      ease: "Expo.easeInOut",
      stagger: {
        amount: 0.2,
      },
    })
    .to(
      ".socialLinks a",
      0.5,
      {
        opacity: 1,
        ease: "Expo.easeInOut",
        stagger: {
          amount: 0.2,
        },
      },
      "-=.5"
    )
    .to(
      "#overlayMenu p",
      0.3,
      {
        opacity: 1,
        ease: "Expo.easeInOut",
      },
      "-=.3"
    )
    .to(
      "#menuClose",
      0.2,
      {
        opacity: 1,
        ease: "Expo.easeInOut",
      },
      "-=.2"
    );

  tl.reverse();

  $("#menuOpen").click(() => {
    tl.play();
    setTimeout(() => {
      $("body").addClass("hideScroll");
    }, 0);
  });
  $("#menuClose").click(() => {
    tl.reverse();
    setTimeout(() => {
      $("body").removeClass("hideScroll");
    }, 1000);
  });
});

/* CASE STUDY PAGE */
$(document).ready(() => {
  // Initialize variables
  let currentSlide = 1;
  const totalSlides = $(".slide").length;
  let isAnimating = false;

  // Update slide number display
  function updateSlideNumber() {
    $(".slider-number").text(`${currentSlide} / ${totalSlides}`);
  }

  // Update progress bar
  function updateProgressBar() {
    const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    $(".slider-progress-bar").css("width", `${progress}%`);
  }

  // Update button states
  function updateButtonStates() {
    if (currentSlide === 1) {
      $("#prev-slide").prop("disabled", true);
    } else {
      $("#prev-slide").prop("disabled", false);
    }

    if (currentSlide === totalSlides) {
      $("#next-slide").prop("disabled", true);
    } else {
      $("#next-slide").prop("disabled", false);
    }
  }

  // Navigate to specific slide
  function goToSlide(slideNumber) {
    if (isAnimating || slideNumber < 1 || slideNumber > totalSlides) return;

    isAnimating = true;

    // Hide current slide
    gsap.to($(".slide.active"), {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: function () {
        $(".slide").removeClass("active");

        // Show new slide
        $(`.slide[data-slide="${slideNumber}"]`).addClass("active");
        currentSlide = slideNumber;

        gsap.fromTo(
          $(".slide.active"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: function () {
              isAnimating = false;
            },
          }
        );

        updateSlideNumber();
        updateProgressBar();
        updateButtonStates();
      },
    });
  }

  // Next slide
  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  // Previous slide
  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  // Initialize slider
  function initSlider() {
    updateSlideNumber();
    updateProgressBar();
    updateButtonStates();

    // Add event listeners
    $("#next-slide").on("click", nextSlide);
    $("#prev-slide").on("click", prevSlide);

    // Keyboard navigation
    $(document).on("keydown", function (e) {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    });

    // Header scroll effect
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        $(".case-study-header").addClass("scrolled");
      } else {
        $(".case-study-header").removeClass("scrolled");
      }
    });
  }

  // Initialize the slider when document is ready
  initSlider();
});
