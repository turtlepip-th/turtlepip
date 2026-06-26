const DEFAULT_LANG = 'th';
const SUPPORTED = ['th', 'en'];

let translations = {};
let currentLang = DEFAULT_LANG;

async function loadTranslations(lang) {
  const res = await fetch(`/locales/${lang}.json`);
  translations = await res.json();
}

function t(key) {
  const keys = key.split('.');
  let val = translations;
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) return key;
  }
  return val ?? key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  document.documentElement.lang = currentLang;

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'th' ? 'EN' : 'ไทย';
}

async function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('tp_lang', lang);
  await loadTranslations(lang);
  applyTranslations();
}

async function initI18n() {
  const saved = localStorage.getItem('tp_lang') ?? DEFAULT_LANG;
  await setLanguage(saved);
}

window.setLanguage = setLanguage;
window.t = t;

document.addEventListener('DOMContentLoaded', initI18n);
