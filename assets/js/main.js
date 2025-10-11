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

    .to("#home-banner .banner-image", { opacity: 0, duration: 0.7 }, "-=.1")

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
