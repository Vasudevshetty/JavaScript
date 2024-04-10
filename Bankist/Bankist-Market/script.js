"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

/*
const message = document.createElement("div");
message.classList.add("cookie-message"); // Remove the dot (.)
message.innerHTML =
  "We use cookies for improved functionality and analytics." +
  '<button class="btn btn--close-cookie">Got it!</button>';
const header = document.querySelector(".header");
header.prepend(message);
message.style.backgroundColor = "#37383d";
message.style.width = "120%"; // Corrected the width value

const btnCloseCookie = document.querySelector(".btn--close-cookie");

btnCloseCookie.addEventListener("click", () => message.remove());
*/

btnScrollTo.addEventListener("click", function (e) {
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  //oldschool way of doing it
  /*window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  }); */

  section1.scrollIntoView({ behavior: "smooth" });
});

// event propogation example
/*
const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".nav__link").dfddEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});
nav.addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});
*/

// event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/*
// traversing the dom
const h1 = document.querySelector("h1");
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

h1.closest(".header").style.background = "var(--gradient-secondary)";

// sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);
*/

// tabbed content
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((tabs) =>
    tabs.classList.remove("operations__content--active")
  );

  const tabNo = clicked.getAttribute("data-tab");

  const tabContent = document.querySelector(`.operations__content--${tabNo}`);
  tabContent.classList.add("operations__content--active");
});

const menuFadeHandler = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((ele) => {
      if (ele !== link) ele.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// menu fade animation.
/*nav.addEventListener("mouseover", function (e) {
  menuFadeHandler(e, 0.5);
});*/
// one way to do it.

nav.addEventListener("mouseover", menuFadeHandler.bind(0.5));
nav.addEventListener("mouseout", menuFadeHandler.bind(1));
