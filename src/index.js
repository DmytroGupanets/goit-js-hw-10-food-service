'use strict';
import menuList from './menu.json';
import cardTemplate from './partials/card-template.hbs';
const Handlebars = require('handlebars');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const defaultUserThemeValue = JSON.parse(localStorage.getItem('Theme'));
const themeSwitchRef = document.querySelector('#theme-switch-toggle');
const menuCompiledList = menuItemListCreate();
const menuListRef = document.querySelector('.js-menu');

themeSwitchRef.addEventListener('change', onSwitchTheme);

defineUserThemeSettings(defaultUserThemeValue);

function defineUserThemeSettings(value) {
  if (value === Theme.LIGHT) return;

  if (value === Theme.DARK) onSwitchTheme();
}

function onSwitchTheme() {
  if (document.body.classList.contains('light-theme')) {
    onSwitchingTheme('light-theme', Theme.DARK);
    return;
  }

  if (document.body.classList.contains('dark-theme')) {
    onSwitchingTheme('dark-theme', Theme.LIGHT);
    return;
  }
}

function onSwitchingTheme(presentTheme, nextTheme) {
  document.body.classList.replace(presentTheme, nextTheme);
  localStorage.setItem('Theme', JSON.stringify(nextTheme));
  themeSwitchRef.checked = presentTheme === Theme.LIGHT;
}

// =============================================================

function menuItemListCreate() {
  return menuList.map(cardTemplate).join('');
}

menuListRef.insertAdjacentHTML('beforeend', menuCompiledList);
