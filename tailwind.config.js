const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(210.19deg, #F8971D -118.53%, #F3F3F3 41.02%)',
        migratedBg: "url('/src/images/balance_background.png')",
      },
      colors: {
        app: {
          primary: "#731054",
          secondary: '#707070'
        }
      },
    }
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          sm: "4px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#731054",
              foreground: "#FFFFFF",
            },

          },
        },
        dark: {},
      },
    }),
  ],
};
