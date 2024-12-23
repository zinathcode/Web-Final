import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                rose: "#fd99af",
                tarquoise: "#3fd4f4",
                gold: "#fac608",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
