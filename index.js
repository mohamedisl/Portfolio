/* CONTACT BUTTONS SCROLL*/
document.getElementById("contactBtn").addEventListener("click", function () {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
});
document
  .getElementById("contactBtnHero")
  .addEventListener("click", function () {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    });
  });
function openNav() {
  const sidenav = document.getElementById("mySidenav");
  sidenav.style.width = "250px";
  document.getElementById("menuOverlay").style.display = "block";

  // Add click listener
  document.addEventListener("click", outsideClick);
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.removeEventListener("click", outsideClick);
  document.getElementById("menuOverlay").style.display = "none";
}

function outsideClick(e) {
  const sidenav = document.getElementById("mySidenav");
  const toggle = document.querySelector(".bi-list");

  if (!sidenav.contains(e.target) && !toggle.contains(e.target)) {
    closeNav();
  }
}

// Select all <a> tags inside sidenav
const navLinks = document.querySelectorAll("#mySidenav a");

// Loop through each link and add click event
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

// Carousel Scroll & Drag
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let isDragging = false,
  startX,
  scrollLeft;

// Mouse Events
carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = x - startX;
  carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener("mouseup", () => {
  isDragging = false;
});

carousel.addEventListener("mouseleave", () => {
  isDragging = false;
});

// Touch Events
carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX;
  const walk = x - startX;
  carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener("touchend", () => {
  isDragging = false;
});

// Scroll Buttons
const scrollAmount = () => {
  const img = carousel.querySelector("img");
  return img ? img.offsetWidth + 40 : 0;
};
prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
});
nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollAmount(), behavior: "smooth" });
});

// Image Filtering & Rendering
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".button-port");

  const imagesData = [
    {
      src: "./assets/hirfaMain.png",
      category: "app",
      popupSrc: "./assets/hirfaPop.png",
    },
    {
      src: "./assets/ta5asosiMain.png",
      category: "app",
      popupSrc: "./assets/ta5asosiPop.png",
    },
    {
      src: "./assets/docaiMain.png",
      category: "web",
      popupSrc: "./assets/docaiPop.png",
    },
    {
      src: "./assets/hotelMain.png",
      category: "web",
      popupSrc: "./assets/hotelPop.png",
    },
  ];

  function renderImages(filter) {
    carousel.style.opacity = "0";
    setTimeout(() => {
      carousel.innerHTML = "";

      const filtered = imagesData.filter(
        (img) => filter === "all" || img.category === filter
      );

      filtered.forEach((imgData, index) => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.setAttribute("data-popup", imgData.popupSrc);
        img.style.marginLeft = index === 0 ? "0" : "40px";
        img.style.flexShrink = "0";
        img.style.width = "100%";
        img.style.objectFit = "cover";
        img.style.cursor = "pointer";
        img.style.scrollSnapAlign = "start";
        carousel.appendChild(img);
      });

      carousel.scrollTo({ left: 0, behavior: "instant" });
      carousel.style.opacity = "1";
    }, 150);
  }

  renderImages("all");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      renderImages(filter);
    });
  });
});

// POPUP
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = modal.querySelector(".close");

// Image click (popup)
carousel.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const popupSrc = e.target.getAttribute("data-popup");
    modal.style.display = "block";
    modalImg.src = popupSrc;
  }
});

// Close popup
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const popupOverlay = document.getElementById("popupOverlay");
const popupImage = document.getElementById("popupImage");
const popupClose = document.querySelector(".popup-close");

// Grab all project images inside scroll container
const projectImages = document.querySelectorAll(".card-container img");

projectImages.forEach((img) => {
  img.addEventListener("click", () => {
    const fullSrc = img.getAttribute("data-large") || img.src;
    popupImage.src = fullSrc;
    popupOverlay.style.display = "block";
  });
});

popupClose.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});

/* FILTRE PORTOFLOIO MOBILE BUTTONS */
const buttons = document.querySelectorAll(".button-port");
const cards = document.querySelectorAll(".card-container");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    cards.forEach((card) => {
      const categoryText = card
        .querySelector(".card-text p:nth-child(2)")
        .innerText.toLowerCase();

      if (filter === "all") {
        card.style.display = "block";
      } else if (filter === "web" && categoryText.includes("website")) {
        card.style.display = "block";
      } else if (filter === "app" && categoryText.includes("app")) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
