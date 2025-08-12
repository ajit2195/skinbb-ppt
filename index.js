// Progress bar
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.getElementById("progress").style.width = scrolled + "%";
});

// Intersection Observer for slide animations
const slides = document.querySelectorAll(".slide");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

slides.forEach((slide) => {
  observer.observe(slide);
});

// Number counter animation
function animateNumbers() {
  const counters = document.querySelectorAll(".number-counter");
  counters.forEach((counter) => {
    if (counter.dataset.animated) return;
    counter.dataset.animated = "true";

    const target = counter.innerText;
    const isPercentage = target.includes("%");
    const isCurrency = target.includes("₹") || target.includes("Cr");
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ""));

    if (!isNaN(numericValue)) {
      let current = 0;
      const increment = numericValue / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }

        let displayValue = Math.floor(current);

        if (isCurrency && target.includes("Cr")) {
          counter.innerText = "₹" + displayValue + "Cr";
        } else if (isCurrency) {
          counter.innerText = "₹" + displayValue + "M";
        } else if (isPercentage) {
          counter.innerText = displayValue + "%";
        } else if (target.includes("M")) {
          counter.innerText = (displayValue / 1000).toFixed(1) + "M";
        } else if (target.includes("K")) {
          counter.innerText = displayValue + "K";
        } else if (target.includes("+")) {
          counter.innerText = displayValue + "+";
        } else {
          counter.innerText = displayValue;
        }
      }, 30);
    }
  });
}

// Trigger animations when elements are visible
const observerNumbers = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        observerNumbers.disconnect();
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".number-counter")
  .forEach((el) => observerNumbers.observe(el));

// slide-2

// function animateSlide() {
//   const slide = document.querySelector("#slide-2");
//   if (!slide) return;
//   const main_content = slide.querySelector(".main-content");
//   const sub_content = slide.querySelector(".sub-content");

//   setTimeout(() => {
//     sub_content.style.opacity = 1;
//     main_content.style.display = 0;
//   }, 1000);
//   sub_content.style;
//   console.log("🚀 ~ animateSlide ~ main_content:", {
//     main_content,
//     sub_content,
//   });
// }
// const slide2 = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         animateSlide();
//         slide2.disconnect();
//       }
//     });
//   },
//   { threshold: 0.5 }
// );

// slide2.observe(document.querySelector("#slide-2 .main-content"));

// document.addEventListener("aos:in:slide-2-content", ({ detail }) => {
//   console.log("animated in", detail);
// });

// document.querySelectorAll(".stat-card").forEach((card) => {
//   observerNumbers.observe(card);
// });
