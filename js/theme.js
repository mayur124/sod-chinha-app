import { state } from "./state";

const appContainerEl = document.getElementById("app-container");
const themeBtn = document.getElementById("theme-btn");
const svgEl = document.getElementById("light");
const iconMaskCircle = svgEl.querySelector("#moon-mask>circle");
const sunCircle = svgEl.querySelector("circle[mask='url(#moon-mask)']");
const sunDotElements = svgEl.querySelectorAll("g>circle");

showThemeBtn();

function showThemeBtn() {
  themeBtn.classList.remove("invisible");
}

themeBtn.addEventListener("click", handleTheme);

function animateIconMaskCircleDark() {
  const cy = +iconMaskCircle.getAttribute("cy");
  if (cy === 8) return;
  iconMaskCircle.setAttribute("cy", cy + 0.5);
  requestAnimationFrame(animateIconMaskCircleDark);
}

function animateIconMaskCircleLight() {
  const cy = +iconMaskCircle.getAttribute("cy");
  if (cy === 0) return;
  iconMaskCircle.setAttribute("cy", cy - 0.5);
  requestAnimationFrame(animateIconMaskCircleLight);
}

function animateSunCircleDark() {
  const r = +sunCircle.getAttribute("r");
  if (r === 8) return;
  sunCircle.setAttribute("r", r + 0.5);
  requestAnimationFrame(animateSunCircleDark);
}

function animateSunCircleLight() {
  const r = +sunCircle.getAttribute("r");
  if (r === 3.5) return;
  sunCircle.setAttribute("r", r - 0.5);
  requestAnimationFrame(animateSunCircleLight);
}

function animateSunDotLight(dotEl) {
  const r = +dotEl.getAttribute("r");
  dotEl.setAttribute("r", Math.min(1.0, +(r + 0.1).toFixed(2)));
  if (r.toFixed(2) === "1.00") return;
  requestAnimationFrame(() => animateSunDotLight(dotEl));
}

async function handleTheme() {
  if (!state.theme || state.theme === "light") {
    state.theme = "dark";
    animateIconMaskCircleDark();
    animateSunCircleDark();
    sunDotElements.forEach((dot) => dot.setAttribute("r", 0));
    svgEl.classList.remove("rotateMoon");
    svgEl.classList.add("rotateSun");
  } else {
    state.theme = "light";
    animateIconMaskCircleLight();
    animateSunCircleLight();
    sunDotElements.forEach(animateSunDotLight);
    svgEl.classList.remove("rotateSun");
    svgEl.classList.add("rotateMoon");
  }
  appContainerEl.classList.toggle("dark");
}
