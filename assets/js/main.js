/* CUSTOM CURSOR */
$(document).ready(function () {
  // Initialize cursor
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 300, fill: "forwards" }
      );
    });

    // Add hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-trigger-button"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursorOutline.classList.add("grow");
      });
      element.addEventListener("mouseleave", function () {
        cursorOutline.classList.remove("grow");
      });
    });
  }

  // Check if we're on homepage (has intro animation) or case study page
  if ($("#intro-animation").length > 0) {
    console.log("Homepage detected - starting intro animation");
    setTimeout(initIntroAnimation, 100);
  } else if ($(".case-study-slider").length > 0) {
    console.log("Case study page detected - showing content immediately");
    initCaseStudyPage();
  } else {
    console.log("Other page detected - showing content immediately");
    showContentImmediately();
  }
});

/* SCROLL TO TOP FUNCTIONALITY */
function initScrollToTop() {
  const scrollButton = document.getElementById("scrollToTop");

  if (!scrollButton) return;

  // Show/hide button based on scroll position
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  }

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton);
  scrollButton.addEventListener("click", scrollToTop);

  // Initialize button state
  toggleScrollButton();
}

/* INTRO ANIMATION - Only for homepage */
function initIntroAnimation() {
  console.log("Starting intro animation");

  // Reset states
  gsap.set("main, header, footer", { opacity: 0, visibility: "hidden" });
  gsap.set("#intro-animation", { opacity: 1, visibility: "visible" });
  gsap.set("#intro-animation img", { opacity: 0 });

  // Create main intro timeline
  const introTL = gsap.timeline({
    onComplete: function () {
      console.log("Intro animation complete");
      document.body.classList.add("intro-complete");
      initBannerAnimation();
    },
  });

  // Clean sequence following exact requirements:
  introTL
    // Step 1: intro-line appears from top and disappears
    .fromTo(
      ".intro-line",
      {
        opacity: 0,
        y: -200, // Start above the viewport
        height: "60vh",
      },
      {
        opacity: 1,
        y: 50,
        height: "50vh",
        duration: 0.5,
        ease: "power2.out",
      }
    )
    .to(".intro-line", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    })

    // Step 2: intro-ppl appears and disappears after 0.3s
    .to(
      ".intro-ppl",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.1"
    )
    .to(
      ".intro-ppl",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.3"
    )

    // Step 3: intro-logo appears and stays for 2 seconds
    .to(".intro-logo", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(
      ".intro-logo",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "+=1.5" // Wait 1.5 seconds + 0.5s fade out = ~2 seconds total
    )

    // Hide intro container
    .to("#intro-animation", {
      height: 0,
      opacity: 0,
      visibility: "hidden",
      duration: 0.3,
      ease: "power2.out",
    });
}

/* CASE STUDY PAGE - Immediate content display */
function initCaseStudyPage() {
  console.log("Initializing case study page");

  // Show all content immediately
  gsap.set("main, header, footer, .slider-controls, .slider-progress", {
    opacity: 1,
    visibility: "visible",
  });

  // Initialize case study slider
  initCaseStudySlider();
}

/* IMMEDIATE CONTENT DISPLAY - For non-homepage pages */
function showContentImmediately() {
  console.log("Showing content immediately");
  gsap.set("main, header, footer", {
    opacity: 1,
    visibility: "visible",
  });
}

/* BANNER ANIMATION - Only for homepage */
function initBannerAnimation() {
  console.log("Starting banner animation");

  const bannerTL = gsap.timeline();

  bannerTL
    // Show main content
    .to("main, header, footer", {
      opacity: 1,
      visibility: "visible",
      duration: 0.5,
    })
    // Animate banner elements
    .fromTo(
      "#home-banner .banner-image",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    )
    .fromTo(
      "#home-banner .banner-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .fromTo(
      "#home-banner .banner-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
}

/* OVERLAY MENU */
$(document).ready(function () {
  let menuTL;

  function createMenuAnimation() {
    return gsap.timeline({
      paused: true,
      onStart: function () {
        console.log("Menu opening started");
        $("body").addClass("hideScroll");
      },
      onReverseComplete: function () {
        console.log("Menu closing completed");
        $("body").removeClass("hideScroll");
        // Reset the timeline so it can be played again
        menuTL.progress(0).pause();
      },
    });
  }

  function initMenuAnimation() {
    menuTL = createMenuAnimation();

    // Build menu animation sequence
    menuTL
      // Hide main content
      .to("header", {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power2.inOut",
      })

      // Different content hiding based on page type
      .to(
        $("#home-banner").length
          ? "#home-banner .container h1"
          : ".case-study-slider",
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.2"
      )

      .to(
        $("#home-banner").length
          ? "#home-banner .banner-content"
          : ".slider-controls",
        {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.3"
      )

      .to(
        $("#home-banner").length
          ? "#home-banner .banner-image"
          : ".slider-progress",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      )

      // Stagger bars appear
      .to(".stagger-bars .bar", {
        scaleY: 1,
        duration: 1,
        stagger: {
          each: 0.06,
          from: "center",
          ease: "power2.inOut",
        },
      })

      // Stagger bars disappear and show menu
      .to(".stagger-bars .bar", {
        scaleY: 0,
        duration: 1,
        stagger: {
          each: 0.05,
          from: "edges",
          ease: "power2.inOut",
        },
      })

      // Show overlay menu
      .to(".overlay-menu", {
        height: "100vh",
        duration: 0.4,
        ease: "power2.out",
      })

      // Show menu content
      .to(
        ".overlay-header",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )

      .fromTo(
        ".overlay-menu-nav .menu-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        ".faq",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        ".overlay-image",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      );
  }

  // Initialize menu animation
  initMenuAnimation();

  // Menu event handlers
  $("#open-menu").on("click", function () {
    console.log("Opening menu - timeline progress:", menuTL.progress());

    // If timeline is completed or reversed, reinitialize it
    if (menuTL.progress() === 1 || menuTL.reversed()) {
      console.log("Reinitializing menu animation");
      menuTL.kill();
      initMenuAnimation();
    }

    menuTL.play();
  });

  $("#close-menu").on("click", function () {
    console.log("Closing menu - timeline progress:", menuTL.progress());

    if (menuTL.progress() > 0) {
      menuTL.reverse();
    } else {
      forceCloseMenu();
    }
  });

  $(".overlay-menu-nav a").on("click", function (e) {
    e.preventDefault();
    console.log("Menu link clicked");

    if (menuTL.progress() > 0) {
      menuTL.reverse();
    } else {
      forceCloseMenu();
    }

    // Optional: Navigate after animation
    const href = $(this).attr("href");
    if (href && href !== "#") {
      setTimeout(() => {
        window.location.href = href;
      }, 1000);
    }
  });

  // Force close function as backup
  function forceCloseMenu() {
    console.log("Force closing menu");

    const closeTL = gsap.timeline();

    closeTL
      .to(".overlay-header, .overlay-menu-nav .menu-item, .faq", {
        opacity: 0,
        duration: 0.3,
      })
      .to(".overlay-menu", {
        height: "0",
        duration: 0.4,
      })
      .to(".stagger-bars .bar", {
        scaleY: 0,
        duration: 0.3,
      })
      .to("header", {
        opacity: 1,
        y: 0,
        duration: 0.4,
      })

      // Show different content based on page type
      .to(
        $("#home-banner").length
          ? "#home-banner .banner-image"
          : ".case-study-slider",
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .to(
        $("#home-banner").length
          ? "#home-banner .container h1"
          : ".slider-controls",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }
      )
      .to(
        $("#home-banner").length
          ? "#home-banner .banner-content"
          : ".slider-progress",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        }
      )
      .call(function () {
        $("body").removeClass("hideScroll");
        // Reinitialize menu animation for next use
        menuTL.kill();
        initMenuAnimation();
      });
  }

  // Initialize scroll to top
  initScrollToTop();
});

/* CASE STUDY SLIDER */
function initCaseStudySlider() {
  console.log("Initializing case study slider");

  let currentSlide = 1;
  const slides = $(".slide");
  const totalSlides = slides.length;
  let isAnimating = false;

  // Update UI functions
  function updateUI() {
    $(".slider-number").text(`${currentSlide} / ${totalSlides}`);
    const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    $(".slider-progress-bar").css("width", `${progress}%`);

    // Update button states
    $("#prev-slide").prop("disabled", currentSlide === 1);
    $("#next-slide").prop("disabled", currentSlide === totalSlides);
  }

  // Slide navigation
  function goToSlide(slideNumber) {
    if (isAnimating || slideNumber < 1 || slideNumber > totalSlides) return;

    isAnimating = true;
    const direction = slideNumber > currentSlide ? 1 : -1;

    // Hide current active slide
    gsap.to($(".slide.active"), {
      opacity: 0,
      x: -100 * direction,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: function () {
        $(".slide").removeClass("active");

        // Show new slide
        const newSlide = $(`.slide[data-slide="${slideNumber}"]`);
        newSlide.addClass("active");
        currentSlide = slideNumber;

        gsap.fromTo(
          newSlide,
          {
            opacity: 0,
            x: 100 * direction,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: function () {
              isAnimating = false;
              updateUI();
            },
          }
        );
      },
    });
  }

  function nextSlide() {
    if (currentSlide < totalSlides && !isAnimating) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1 && !isAnimating) {
      goToSlide(currentSlide - 1);
    }
  }

  // Initialize slider
  function initSlider() {
    updateUI();

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
  }

  // Initialize the slider
  initSlider();
}
