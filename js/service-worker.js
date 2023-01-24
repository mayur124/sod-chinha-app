import { registerSW } from "virtual:pwa-register";
import { refreshSwBtnText, refreshSwText } from "./meta";
import { state } from "./state";

let updateSw;
const swUpdateContainer = document.getElementById("sw_update_container"),
  swUpdateText = swUpdateContainer.querySelector("#sw_update_txt"),
  swUpdateBtn = swUpdateContainer.querySelector("#sw_update_refresh_btn");

if ("serviceWorker" in navigator) {
  updateSw = registerSW({
    onNeedRefresh() {
      updateReloadPromptLanguage();
      swUpdateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateSw();
      });
      swUpdateContainer.classList.remove("-translate-y-[110%]");
    },
    onOfflineReady() {},
  });
}

export function updateReloadPromptLanguage() {
  swUpdateText.textContent = refreshSwText[state.selectedLanguage];
  swUpdateBtn.textContent = refreshSwBtnText[state.selectedLanguage];
}
