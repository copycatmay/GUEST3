let colors = ["--black", "--gray", "--yellow", "--green", "--red"];
let originals = ["#000000", "#a7afb6", "#ffff00", "#00ff00", "#ff4700"];
let greyscale = ["#dcdcdc", "#333333", "#777777", "#666666", "#444444"];

// initialize colors when page loads
colors.forEach((color, i) => {
  document.body.style.setProperty(color, originals[i]);
});

let isInverted = false;

function invertColors() {
  isInverted = !isInverted;

  let invertHalf = document.querySelector(".invert-half");
  let images = document.querySelectorAll(".image-container img");

  if (isInverted) {
    invertHalf.style.transform = "rotate(180deg)";
    colors.forEach((color, i) => {
      document.body.style.setProperty(color, greyscale[i]);
    });
    // apply greyscale to images
    images.forEach((img) => {
      img.style.filter = "grayscale(100%)";
    });
  } else {
    invertHalf.style.transform = "rotate(0deg)";
    colors.forEach((color, i) => {
      document.body.style.setProperty(color, originals[i]);
    });
    // remove greyscale from images
    images.forEach((img) => {
      img.style.filter = "none";
    });
  }
}

// smooth scroll function
function scrollToSection(sectionId) {
  let section = document.getElementById(sectionId);
  let offset = 100; // adjust for header height
  let targetPosition =
    section.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  // update both section and nav button states
  document
    .querySelectorAll("h2[id]")
    .forEach((s) => s.classList.remove("active-section"));
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));

  section.classList.add("active-section");
  let activeButton = document.querySelector(
    `.nav-btn[data-section="${sectionId}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// add click listeners to nav buttons
document.addEventListener("DOMContentLoaded", () => {
  let navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default anchor behavior
      let sectionId = button.dataset.section;

      // immediately update active states
      document
        .querySelectorAll("h2[id]")
        .forEach((s) => s.classList.remove("active-section"));
      document
        .querySelectorAll(".nav-btn")
        .forEach((btn) => btn.classList.remove("active"));

      let targetSection = document.getElementById(sectionId);
      targetSection.classList.add("active-section");
      button.classList.add("active");

      // then scroll to section
      let offset = 100;
      let targetPosition = targetSection.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // highlight active section while scrolling
  let sections = document.querySelectorAll("h2[id]");

  window.addEventListener("scroll", () => {
    let viewportHeight = window.innerHeight;
    let scrollPosition = window.scrollY;
    let currentSection = null;
    let smallestDistance = Infinity;

    // find the section closest to the middle of the viewport
    sections.forEach((section) => {
      let rect = section.getBoundingClientRect();
      let sectionMiddle = rect.top + rect.height / 2;
      let viewportMiddle = viewportHeight / 2;
      let distance = Math.abs(sectionMiddle - viewportMiddle);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentSection = section;
      }
    });

    // update classes
    if (currentSection && smallestDistance < viewportHeight / 3) {
      // only activate if section is roughly in the middle third
      sections.forEach((section) => {
        section.classList.remove("active-section");
        let correspondingButton = document.querySelector(
          `.nav-btn[data-section="${section.id}"]`
        );
        if (correspondingButton) {
          correspondingButton.classList.remove("active");
        }
      });

      currentSection.classList.add("active-section");
      let activeButton = document.querySelector(
        `.nav-btn[data-section="${currentSection.id}"]`
      );
      if (activeButton) {
        activeButton.classList.add("active");
      }
    }
  });

  // shuffle images on load
  shuffleImages();
});

function handleImageScroll() {
  let scrollingImages = document.querySelector(".scrolling-images");
  let totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  let scrollPosition = window.scrollY;
  let scrollPercentage = scrollPosition / totalScroll;
  let maxMove = scrollingImages.offsetHeight - window.innerHeight + 100;
  let yPos = -maxMove + maxMove * scrollPercentage;

  if (isImagesVisible) {
    scrollingImages.style.transform = `translateY(${yPos}px)`;
  }
}

// set initial position when page loads
document.addEventListener("DOMContentLoaded", () => {
  let scrollingImages = document.querySelector(".scrolling-images");
  let maxMove = scrollingImages.offsetHeight - window.innerHeight + 100;
  scrollingImages.style.transform = `translateY(-${maxMove}px)`;
});

// add scroll event listener
window.addEventListener("scroll", handleImageScroll);

let isImagesVisible = true;

function toggleImages() {
  let imageColumn = document.querySelector(".image-column");
  let toggleBtn = document.querySelector(".toggle-images-btn");
  let toggleText = document.querySelector(".toggle-images-text");

  isImagesVisible = !isImagesVisible;
  imageColumn.classList.toggle("hidden");
  toggleBtn.classList.toggle("images-hidden");

  if (isImagesVisible) {
    toggleText.innerHTML = "ⱧłĐɆ";
  } else {
    toggleText.innerHTML = "ѕнσω";
  }
}

function shuffleImages() {
  let containers = Array.from(document.querySelectorAll(".image-container"));
  let parent = containers[0].parentNode;

  // fisher-yates shuffle
  for (let i = containers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    parent.appendChild(containers[j]);
  }
}
