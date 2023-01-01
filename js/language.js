import {
  changeChinhBtn,
  handleActiveChinh,
  renderCount,
  resetCountBtn,
} from "./actions";
import { buttonText, resetText } from "./meta";
import { updateReloadPromptLanguage } from "./service-worker";
import { state } from "./state";

let changeChinhBtnTextEl;
const languagePickerContainerEl = document.getElementById(
  "language_picker_container"
);
const languageListEl = document.getElementById("language_list");
languageListEl.addEventListener("click", (e) => e.stopPropagation());
languageListEl.addEventListener("change", handleLanguageChange);

document.body.addEventListener("click", (e) => {
  const { target } = e;
  if (
    target.nodeName.toLowerCase() === "button" &&
    target.id === "language_btn"
  ) {
    return;
  }
  if (target.nodeName.toLowerCase() === "svg") {
    if (target.parentElement.id === "language_btn") {
      return;
    }
  }
  languagePickerContainerEl.classList.add("scale-0");
});

export function setChangeChinhText() {
  changeChinhBtnTextEl = changeChinhBtn.querySelector("span#btn-text");
  changeChinhBtnTextEl.textContent = buttonText[state.selectedLanguage];
}

const changeLangBtn = document.getElementById("language_btn");
changeLangBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  languagePickerContainerEl.classList.toggle("scale-0");
  if (!languagePickerContainerEl.classList.contains("scale-0")) {
    // languagePicker is visible
    languagePickerContainerEl.classList.remove("duration-[400ms]");
    languagePickerContainerEl.classList.add("duration-300");
  } else {
    // languagePicker is not visible
    languagePickerContainerEl.classList.remove("duration-300");
    languagePickerContainerEl.classList.add("duration-[400ms]");
  }
});

function handleLanguageChange(e) {
  if (e.target.nodeName === "INPUT") {
    state.selectedLanguage = e.target.value;
    renderCount(state.mantraCount, state.madaCount - 1);
    changeChinhBtnTextEl.textContent = buttonText[state.selectedLanguage];
    resetCountBtn.textContent = resetText[state.selectedLanguage];
    handleActiveChinh();
    updateReloadPromptLanguage();
  }
}
