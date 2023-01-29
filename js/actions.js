import tap from "../assets/tap.wav";
import toggleOn from "../assets/toggle_on.wav";
import toggleOff from "../assets/toggle_off.wav";

import { setChangeChinhText } from "./language";
import { chinhMeta, madaText, resetText } from "./meta";
import { state } from "./state";

export const changeChinhBtn = document.getElementById("change_chinh");
setChangeChinhText();

const tapAudio = new Audio(tap),
  soundOnAudio = new Audio(toggleOn),
  soundOffAudio = new Audio(toggleOff);

const volumeBtnEl = document.getElementById("volume-btn"),
  volumeSvg = volumeBtnEl.querySelector("svg"),
  volumePaths = volumeSvg.querySelectorAll("path");

/** @type HTMLElement */
const btnShadowEl = changeChinhBtn.querySelector(".shadow"),
  /** @type HTMLElement */
  btnTxtEl = changeChinhBtn.querySelector("#btn-text");
const chinhTextEl = document.getElementById("active_chinh_text");
const mantraCountEl = document.getElementById("mantra_count");
const madaCountEl = document.getElementById("mada_count");

const chinhKeys = Object.keys(chinhMeta);

changeChinhBtn.ontouchstart = () => {
  btnShadowEl.style.transform = `translateY(${0 / 16}rem)`;
  btnTxtEl.style.transform = `translateY(${-1 / 16}rem)`;
};

changeChinhBtn.ontouchend = () => {
  btnShadowEl.style.transform = `translateY(${2 / 16}rem)`;
  btnTxtEl.style.transform = `translateY(${-4 / 16}rem)`;
};

changeChinhBtn.addEventListener("click", () => {
  if (state.isVolumeOn) {
    // tapAudioEl.play();
    tapAudio.play();
  }
  resetAllChinhs();
  setActiveIndex();
  handleActiveChinh();
  showResetCountBtnSafe();
  setCount();
});

function resetAllChinhs() {
  for (const chinh in chinhMeta) {
    const chinhEl = document.getElementById(chinh);
    chinhEl.classList.add("hide");
    chinhEl.style.opacity = 0;
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
  activeChinhEl.style.opacity = 1;
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

export const resetCountBtn = document.getElementById("reset_count_btn");
resetCountBtn.textContent = resetText[state.selectedLanguage];

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
volumeBtnEl.addEventListener("click", () => {
  state.isVolumeOn = !state.isVolumeOn;
  if (state.isVolumeOn) {
    soundOnAudio.play();
    volumePaths[0].classList.add("volume-on-animation");
    volumePaths[1].style.opacity = 1;
    volumePaths[1].style.transitionDelay = "0ms";
    volumePaths[2].style.opacity = 1;
    volumePaths[2].style.transitionDelay = "150ms";
  } else {
    soundOffAudio.play();
    volumePaths[0].classList.remove("volume-on-animation");
    volumePaths[2].style.opacity = 0;
    volumePaths[2].style.transitionDelay = "0ms";
    volumePaths[1].style.opacity = 0;
    volumePaths[1].style.transitionDelay = "150ms";
  }
});
//#endregion
