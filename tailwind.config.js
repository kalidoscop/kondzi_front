/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/daisyui/**/*.js"],
  theme: {
    // colors: {
    //   'ps-green':'#014040',
    //   'white'
    // },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      "ps-green": "#014040",
      "ps-green-2": "#03A678",
      "ps-orange": "#F27405",
      "ps-orange-2": "#731702",
    }),
    extend: {},
  },
  // plugins: [require("daisyui")],
  daisyui: {
    themes: true,

    styled: true,

    themes: true,

    base: true,

    utils: true,

    logs: true,

    rtl: false,
  },
  safelist: [
    "ck-content",
    "text-left",
    "text-right",
    "text-center",
    "text-justify",
    "font-bold",
    "italic",
    "underline",
    "bg-red-500",
    "bg-blue-500",
    "menu",
    "menu-active",
    "menu-md",
    "menu-lg", // DaisyUI classes à conserver :
    "bg-base-200", // DaisyUI classes à conserver :
    "rounded-box", // DaisyUI classes à conserver :
  ],
};
