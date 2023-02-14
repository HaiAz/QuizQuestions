/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                RubikGemStone: ["Rubik Gemstones", "cursive"],
                Comforter: ["Comforter", "cursive"],
                OleoScript: ["Oleo Script", "cursive"],
            },
            colors: {
                "black-rgba": "rgba(0,0,0,0.4)",
            },
        },
    },
    plugins: [require("daisyui")],
};
