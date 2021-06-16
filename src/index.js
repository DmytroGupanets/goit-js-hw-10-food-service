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
  if (value === 'light-theme') return;

  if (value === 'dark-theme') onSwitchToDarkTheme();
}

function onSwitchTheme() {
  if (document.body.classList.contains('light-theme')) {
    onSwitchToDarkTheme();
    return;
  }

  if (document.body.classList.contains('dark-theme')) {
    onSwitchToLightTheme();
    return;
  }
}

function onSwitchToDarkTheme() {
  document.body.classList.replace('light-theme', 'dark-theme');
  themeSwitchRef.checked = true;
  localStorage.setItem('Theme', JSON.stringify(Theme.DARK));
}

function onSwitchToLightTheme() {
  document.body.classList.replace('dark-theme', 'light-theme');
  themeSwitchRef.checked = false;
  localStorage.setItem('Theme', JSON.stringify(Theme.LIGHT));
}

// =============================================================

function menuItemListCreate() {
  return menuList.map(cardTemplate).join('');
}

menuListRef.insertAdjacentHTML('beforeend', menuCompiledList);
