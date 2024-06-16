// import tap from "../assets/tap.wav";
// import toggleOn from "../assets/toggle_on.wav";
// import toggleOff from "../assets/toggle_off.wav";

import { setChangeChinhText } from "./language";
import { chinhMeta, madaText, resetText } from "./meta";
import { state } from "./state";

export const changeChinhBtn = document.getElementById("change_chinh");
setChangeChinhText();

export const resetCountBtn = document.getElementById("reset_count_btn");
resetCountBtn.textContent = resetText[state.selectedLanguage];

let idleTimer;
window.onload = resetTimer();

function resetTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    addGlowEffect();
  }, 15 * 1000);
}

// const tapAudio = new Audio(tap),
//   soundOnAudio = new Audio(toggleOn),
//   soundOffAudio = new Audio(toggleOff);

// const volumeBtnEl = document.getElementById("volume-btn"),
//   volumeSvg = volumeBtnEl.querySelector("svg"),
//   volumePaths = volumeSvg.querySelectorAll("path");

// /** @type HTMLElement */
// const btnShadowEl = changeChinhBtn.querySelector(".shadow"),

/** @type HTMLElement */
const btnTxtEl = changeChinhBtn.querySelector("#btn-text");
const chinhTextEl = document.getElementById("active_chinh_text");
const mantraCountEl = document.getElementById("mantra_count");
const madaCountEl = document.getElementById("mada_count");

const chinhKeys = Object.keys(chinhMeta);

changeChinhBtn.ontouchstart = () => {};
changeChinhBtn.addEventListener("click", changeChinh);

function changeChinh() {
  // handleCountAudio();
  resetTimer();
  removeGlowEffect();
  resetAllChinhs();
  setActiveIndex();
  handleActiveChinh();
  showResetCountBtnSafe();
  setCount();
}

// function handleCountAudio() {
//   if (state.isVolumeOn) {
//     tapAudio.currentTime = 0;
//     tapAudio.play();
//   }
// }

function removeGlowEffect() {
  btnTxtEl.classList.remove("glow");
}

function addGlowEffect() {
  btnTxtEl.classList.add("glow");
}

function resetAllChinhs() {
  for (const chinh in chinhMeta) {
    const chinhEl = document.getElementById(chinh);
    chinhEl.classList.remove("active-chinh");
  }
}

function setActiveIndex() {
  // prettier-ignore
  state.activeChinhIdx = state.activeChinhIdx < 0 ? 0 : ++state.activeChinhIdx % chinhKeys.length;
}

export function handleActiveChinh() {
  if (state.activeChinhIdx === -1) {
    chinhTextEl.innerHTML = "&nbsp";
    return;
  }

  const activeChinhEl = document.getElementById(
    chinhKeys[state.activeChinhIdx]
  );
  activeChinhEl.classList.add("active-chinh");
  // prettier-ignore
  chinhTextEl.textContent = chinhMeta[chinhKeys[state.activeChinhIdx]][state.selectedLanguage];
  if (chinhTextEl.classList.contains("textAnimation")) {
    chinhTextEl.classList.remove("textAnimation");
    chinhTextEl.classList.add("textAnimation1");
  } else {
    chinhTextEl.classList.remove("textAnimation1");
    chinhTextEl.classList.add("textAnimation");
  }
}

function setCount() {
  if (state.mantraCount % 108 === 0) {
    state.mantraCount = 0;
    ++state.madaCount;
  }
  ++state.mantraCount;
  renderCount(state.mantraCount, state.madaCount - 1);
}

function showResetCountBtnSafe() {
  if (!state.isResetCountBtnShown) {
    showResetCountBtn();
  }
}

function showResetCountBtn() {
  state.isResetCountBtnShown = true;
  resetCountBtn.classList.remove("invisible");
}

resetCountBtn.addEventListener("click", resetCount);

function resetCount() {
  state.mantraCount = 0;
  state.madaCount = 0;
  state.activeChinhIdx = -1;
  renderCount(0, 0);
  resetAllChinhs();
  handleActiveChinh();
  hideResetCountBtn();
}

function hideResetCountBtn() {
  state.isResetCountBtnShown = false;
  resetCountBtn.classList.add("invisible");
}

export function renderCount(mantraCount, madaCount) {
  if (state.isResetCountBtnShown) {
    mantraCountEl.textContent = mantraCount;
    madaCountEl.textContent = ` - ${madaCount} ${
      madaText[state.selectedLanguage]
    } 📿`;
  }
}

//#region Volume Actions
// volumeBtnEl.addEventListener("click", () => {
//   state.isVolumeOn = !state.isVolumeOn;
//   if (state.isVolumeOn) {
//     soundOnAudio.currentTime = 0;
//     soundOnAudio.play();
//     volumePaths[0].classList.add("volume-on-animation");
//     volumePaths[1].style.opacity = 1;
//     volumePaths[1].style.transitionDelay = "0ms";
//     volumePaths[2].style.opacity = 1;
//     volumePaths[2].style.transitionDelay = "150ms";
//   } else {
//     soundOffAudio.currentTime = 0;
//     soundOffAudio.play();
//     volumePaths[0].classList.remove("volume-on-animation");
//     volumePaths[2].style.opacity = 0;
//     volumePaths[2].style.transitionDelay = "0ms";
//     volumePaths[1].style.opacity = 0;
//     volumePaths[1].style.transitionDelay = "150ms";
//   }
// });
//#endregion
