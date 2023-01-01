import { state } from "./state";

const appContainerEl = document.getElementById("app-container");
const themeBtn = document.getElementById("theme-btn");
const sunIconEl = document.getElementById("light");
const moonIconEl = document.getElementById("dark");

(() => {
  if (matchMedia?.("(prefers-color-scheme: dark)").matches) {
    handleDarkBtnActionVisibility();
  } else {
    handleLightBtnActionVisibility();
  }
  showThemeBtn();
})();

function handleDarkBtnActionVisibility() {
  state.theme = "dark";
  moonIconEl.classList.remove("visible");
  sunIconEl.classList.add("invisible");
}

function handleLightBtnActionVisibility() {
  state.theme = "light";
  sunIconEl.classList.remove("visible");
  moonIconEl.classList.add("invisible");
}

function toggleThemeActiveClass() {
  _resetVisibilityClassesOfThemeBtns();
  if (!state.theme || state.theme === "light") {
    state.theme = "dark";
    showDarkMode();
  } else {
    state.theme = "light";
    showLightMode();
  }
}

function _resetVisibilityClassesOfThemeBtns() {
  moonIconEl.classList.remove("visible", "invisible");
  sunIconEl.classList.remove("visible", "invisible");
}

function showDarkMode() {
  moonIconEl.classList.remove("non-active");
  moonIconEl.classList.add("active");
  sunIconEl.classList.remove("active");
  sunIconEl.classList.add("non-active");
  appContainerEl.classList.add("dark");
}

function showLightMode() {
  sunIconEl.classList.remove("non-active");
  sunIconEl.classList.add("active");
  moonIconEl.classList.remove("active");
  moonIconEl.classList.add("non-active");
  appContainerEl.classList.remove("dark");
}

function showThemeBtn() {
  themeBtn.classList.remove("invisible");
}

themeBtn.addEventListener("click", toggleThemeActiveClass);
