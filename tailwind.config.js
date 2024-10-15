const {createThemes} = require('tw-colors');

const defaultColors = {
  backdrop: '#f8f8ff',
  primary: '#000000',
  header: '#ffffff',
  headerText: '#000000',
  container: '#ffffff',
  divider: '#e0e0e0',
  innerContainer: '#fafaff',
  gentle: '#586776',
};

export const darkColors = {
  backdrop: '#000000',
  primary: '#00ff00',
  header: '#000000',
  headerText: '#00ff00',
  container: '#000000',
  divider: '#00ff00',
  innerContainer: '#001a00',
  gentle: '#00ff00',
};

const aprilFoolsColors = {
  backdrop: '#ff0000',
  primary: '#00ff00',
  header: '#0000ff',
  headerText: '#00ff00',
  container: '#0000ff',
  divider: '#ff0000',
  innerContainer: '#bb00ff',
  gentle: '#ffff00',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    createThemes({
      default: defaultColors,
      aprilFools: aprilFoolsColors,
      dark: darkColors,
    })
  ],
}

