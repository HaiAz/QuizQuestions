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
        },
    },
    plugins: [require("daisyui")],
};
