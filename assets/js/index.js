if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}

const languageToggle = document.querySelector("[data-lang-toggle]");
const defaultLanguage = document.body.dataset.language || "en";

function getStoredLanguage() {
  try {
    return window.localStorage.getItem("site-language");
  } catch (error) {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem("site-language", language);
  } catch (error) {
    return;
  }
}

function updateToggleLabel(language) {
  if (!languageToggle) {
    return;
  }

  const nextLabel =
    language === "zh"
      ? languageToggle.dataset.labelZh
      : languageToggle.dataset.labelEn;

  if (!nextLabel) {
    return;
  }

  languageToggle.setAttribute("aria-label", nextLabel);
  languageToggle.setAttribute("title", nextLabel);
  languageToggle.setAttribute("aria-pressed", language === "zh" ? "true" : "false");
}

function setLanguage(language) {
  const normalizedLanguage = language === "zh" ? "zh" : "en";

  document.body.dataset.language = normalizedLanguage;
  document.documentElement.lang = normalizedLanguage === "zh" ? "zh-Hans" : "en";

  const title =
    normalizedLanguage === "zh"
      ? document.documentElement.dataset.titleZh
      : document.documentElement.dataset.titleEn;

  if (title) {
    document.title = title;
  }

  updateToggleLabel(normalizedLanguage);
  storeLanguage(normalizedLanguage);
}

setLanguage(getStoredLanguage() || defaultLanguage);

if (languageToggle) {
  languageToggle.addEventListener("click", function () {
    const nextLanguage = document.body.dataset.language === "zh" ? "en" : "zh";
    setLanguage(nextLanguage);
  });
}
