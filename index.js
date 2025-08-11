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
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  observerNumbers.observe(card);
});

// Charts
window.addEventListener("load", () => {
  // Revenue Chart
  const revenueCtx = document.getElementById("revenueChart");
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "line",
      data: {
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
        datasets: [
          {
            label: "Revenue (Cr ₹)",
            data: [46, 133, 5135, 11543, 20154],
            borderColor: "rgb(102, 126, 234)",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: { family: "Lato" },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: "Lato" },
            },
          },
          x: {
            ticks: {
              font: { family: "Lato" },
            },
          },
        },
      },
    });
  }

  // Investment Chart
  const investmentCtx = document.getElementById("investmentChart");
  if (investmentCtx) {
    new Chart(investmentCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Technology (20%)",
          "Team Building (20%)",
          "Market Expansion (50%)",
          "Operations (10%)",
        ],
        datasets: [
          {
            data: [100, 50, 75, 25],
            backgroundColor: [
              "rgba(102, 126, 234, 0.8)",
              "rgba(59, 130, 246, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(249, 115, 22, 0.8)",
            ],
            borderWidth: 3,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "Lato",
                size: 14,
              },
              padding: 20,
            },
          },
        },
      },
    });
  }
});
