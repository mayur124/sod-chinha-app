import { LANGUAGE } from "./meta";

export const state = {
  selectedLanguage: LANGUAGE.EN,
  mantraCount: 0,
  madaCount: 0,
  activeChinhIdx: -1,
  isResetCountBtnShown: false,
  /**
   * @type {"light" | "dark"}
   */
  theme: null,
  isVolumeOn: true,
};
