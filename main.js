// =====================================================
// LOADER
// =====================================================

const progressCircle = document.getElementById("progressCircle");
const loaderPct = document.getElementById("loaderPct");
const loaderMark = document.getElementById("loaderMark");
const loader = document.getElementById("loader");
const hero = document.getElementById("hero");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ---------- Loader progress circle ----------

const R = 86;
const CIRC = 2 * Math.PI * R;

if (progressCircle) {
  progressCircle.style.strokeDasharray = CIRC;
  progressCircle.style.strokeDashoffset = CIRC;
}


// ---------- Finish loading ----------

function finishLoad() {
  if (!loader || !hero) return;

  loader.classList.add("done");
  hero.classList.add("in");

  setTimeout(
    () => hero.classList.add("reveal"),
    reduceMotion ? 0 : 200
  );
}


// ---------- Loader mark ----------

if (loaderMark) {
  setTimeout(() => {
    loaderMark.classList.add("in");
  }, 150);
}


// ---------- Loader animation ----------

if (reduceMotion) {

  if (loaderPct) {
    loaderPct.textContent = "100";
  }

  if (progressCircle) {
    progressCircle.style.strokeDashoffset = 0;
  }

  setTimeout(finishLoad, 300);

} else {

  const duration = 2600;
  const start = performance.now();

  function frame(now) {

    const p = Math.min(1, (now - start) / duration);

    // Smooth easing
    const eased = 1 - Math.pow(1 - p, 3);

    if (loaderPct) {
      loaderPct.textContent = Math.floor(eased * 100);
    }

    if (progressCircle) {
      progressCircle.style.strokeDashoffset =
        CIRC * (1 - eased);
    }

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(finishLoad, 350);
    }
  }

  requestAnimationFrame(frame);
}


// =====================================================
// CAROUSEL
// =====================================================

// ---------- Select carousel elements ----------

const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsWrap = document.getElementById("carouselDots");
const countEl = document.getElementById("carouselCount");


// ---------- Carousel data ----------

const slidesData = [
  {
    title: "Events",
    image: "imgs/todoevents/thomfall2423/tb23.png",
    page: "#events"
  },

  {
    title: "Film",
    image: "imgs/photos/jessie/j1.jpg",
    page: "#film"
  },

  {
    title: "Photo",
    image: "imgs/photos/gabedits/gab1.jpg",
    page: "#photography"
  }
];


// ---------- Carousel state ----------

let current = 0;
let autoTimer;


// ---------- Make sure carousel exists ----------

if (
  carousel &&
  dotsWrap &&
  countEl &&
  nextBtn &&
  prevBtn
) {

  // ===================================================
  // CREATE SLIDES
  // ===================================================

  slidesData.forEach((slideData, i) => {

    const slide = document.createElement("div");

    slide.className =
      "slide" + (i === 0 ? " active" : "");

    slide.innerHTML = `
      <a
        href="${slideData.page}"
        class="slide-link"
        aria-label="View ${slideData.title} page"
      >

        <img
          src="${slideData.image}"
          alt="${slideData.title} work"
        >

        <div class="slide-label">

          <div class="slide-index">
            ${slideData.title.toUpperCase()}
          </div>

          <div class="slide-title">
            ${slideData.title}
          </div>

        </div>

      </a>
    `;

    carousel.insertBefore(
      slide,
      carousel.querySelector(".carousel-controls")
    );


    // =================================================
    // CREATE DOT
    // =================================================

    const dot = document.createElement("button");

    dot.className =
      "cdot" + (i === 0 ? " active" : "");

    dot.setAttribute(
      "aria-label",
      `Go to ${slideData.title} section`
    );

    dot.addEventListener("click", () => {
      goTo(i);
    });

    dotsWrap.appendChild(dot);

  });


  // ===================================================
  // GET CREATED ELEMENTS
  // ===================================================

  const slideEls =
    carousel.querySelectorAll(".slide");

  const dotEls =
    dotsWrap.querySelectorAll(".cdot");


  // ===================================================
  // DISPLAY CURRENT SLIDE
  // ===================================================

  function render() {

    slideEls.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === current
      );

    });


    dotEls.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === current
      );

    });


    countEl.textContent =
      `${String(current + 1).padStart(2, "0")} — ${String(
        slidesData.length
      ).padStart(2, "0")}`;
  }


  // ===================================================
  // GO TO SLIDE
  // ===================================================

  function goTo(index) {

    current =
      (index + slidesData.length) %
      slidesData.length;

    render();
    resetAuto();
  }


  // ===================================================
  // AUTO PLAY
  // ===================================================

  function resetAuto() {

    clearInterval(autoTimer);

    if (!reduceMotion) {

      autoTimer = setInterval(() => {

        goTo(current + 1);

      }, 4200);

    }
  }


  // ===================================================
  // ARROWS
  // ===================================================

  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
  });


  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
  });


  // ===================================================
  // PAUSE ON HOVER
  // ===================================================

  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoTimer);
  });


  carousel.addEventListener("mouseleave", () => {
    resetAuto();
  });


  // ===================================================
  // INITIALIZE CAROUSEL
  // ===================================================

  render();
  resetAuto();

/*
// =====================================================
// LOADER
// =====================================================

const progressCircle = document.getElementById("progressCircle");
const loaderPct = document.getElementById("loaderPct");
const loaderMark = document.getElementById("loaderMark");
const loader = document.getElementById("loader");
const hero = document.getElementById("hero");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Check if this is the first page load
const isFirstLoad = !sessionStorage.getItem('hasLoadedOnce');
sessionStorage.setItem('hasLoadedOnce', 'true');


// ---------- Loader progress circle ----------

const R = 86;
const CIRC = 2 * Math.PI * R;

if (progressCircle) {
  progressCircle.style.strokeDasharray = CIRC;
  progressCircle.style.strokeDashoffset = CIRC;
}


// ---------- Finish loading ----------

function finishLoad() {
  if (!loader || !hero) return;

  loader.classList.add("done");
  hero.classList.add("in");

  setTimeout(
    () => hero.classList.add("reveal"),
    reduceMotion ? 0 : 200
  );
}


// ---------- Loader mark ----------

if (loaderMark) {
  setTimeout(() => {
    loaderMark.classList.add("in");
  }, 150);
}


// ---------- Loader animation ----------

if (!isFirstLoad) {
  // Skip loader animation on return visits
  finishLoad();
} else if (reduceMotion) {

  if (loaderPct) {
    loaderPct.textContent = "100";
  }

  if (progressCircle) {
    progressCircle.style.strokeDashoffset = 0;
  }

  setTimeout(finishLoad, 300);

} else {

  const duration = 2600;
  const start = performance.now();

  function frame(now) {

    const p = Math.min(1, (now - start) / duration);

    // Smooth easing
    const eased = 1 - Math.pow(1 - p, 3);

    if (loaderPct) {
      loaderPct.textContent = Math.floor(eased * 100);
    }

    if (progressCircle) {
      progressCircle.style.strokeDashoffset =
        CIRC * (1 - eased);
    }

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(finishLoad, 350);
    }
  }

  requestAnimationFrame(frame);
}


// =====================================================
// CAROUSEL
// =====================================================

// ---------- Select carousel elements ----------

const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsWrap = document.getElementById("carouselDots");
const countEl = document.getElementById("carouselCount");


// ---------- Carousel data ----------

const slidesData = [
  {
    title: "Events",
    image: "imgs/todoevents/thomfall2423/tb23.png",
    page: "#events"
  },

  {
    title: "Film",
    image: "imgs/photos/jessie/j1.jpg",
    page: "#film"
  },

  {
    title: "Photo",
    image: "imgs/photos/gabedits/gab1.jpg",
    page: "#photography"
  }
];


// ---------- Carousel state ----------

let current = 0;
let autoTimer;


// ---------- Make sure carousel exists ----------

if (
  carousel &&
  dotsWrap &&
  countEl &&
  nextBtn &&
  prevBtn
) {

  // ===================================================
  // CREATE SLIDES
  // ===================================================

  slidesData.forEach((slideData, i) => {

    const slide = document.createElement("div");

    slide.className =
      "slide" + (i === 0 ? " active" : "");

    slide.innerHTML = `
      <a
        href="${slideData.page}"
        class="slide-link"
        aria-label="View ${slideData.title} page"
      >

        <img
          src="${slideData.image}"
          alt="${slideData.title} work"
        >

        <div class="slide-label">

          <div class="slide-index">
            ${slideData.title.toUpperCase()}
          </div>

          <div class="slide-title">
            ${slideData.title}
          </div>

        </div>

      </a>
    `;

    carousel.insertBefore(
      slide,
      carousel.querySelector(".carousel-controls")
    );


    // =================================================
    // CREATE DOT
    // =================================================

    const dot = document.createElement("button");

    dot.className =
      "cdot" + (i === 0 ? " active" : "");

    dot.setAttribute(
      "aria-label",
      `Go to ${slideData.title} section`
    );

    dot.addEventListener("click", () => {
      goTo(i);
    });

    dotsWrap.appendChild(dot);

  });


  // ===================================================
  // GET CREATED ELEMENTS
  // ===================================================

  const slideEls =
    carousel.querySelectorAll(".slide");

  const dotEls =
    dotsWrap.querySelectorAll(".cdot");


  // ===================================================
  // DISPLAY CURRENT SLIDE
  // ===================================================

  function render() {

    slideEls.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === current
      );

    });


    dotEls.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === current
      );

    });


    countEl.textContent =
      `${String(current + 1).padStart(2, "0")} — ${String(
        slidesData.length
      ).padStart(2, "0")}`;
  }


  // ===================================================
  // GO TO SLIDE
  // ===================================================

  function goTo(index) {

    current =
      (index + slidesData.length) %
      slidesData.length;

    render();
    resetAuto();
  }


  // ===================================================
  // AUTO PLAY
  // ===================================================

  function resetAuto() {

    clearInterval(autoTimer);

    if (!reduceMotion) {

      autoTimer = setInterval(() => {

        goTo(current + 1);

      }, 4200);

    }
  }


  // ===================================================
  // ARROWS
  // ===================================================

  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
  });


  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
  });


  // ===================================================
  // PAUSE ON HOVER
  // ===================================================

  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoTimer);
  });


  carousel.addEventListener("mouseleave", () => {
    resetAuto();
  });


  // ===================================================
  // INITIALIZE CAROUSEL
  // ===================================================

  render();
  resetAuto();

*/
}