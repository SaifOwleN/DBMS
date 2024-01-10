import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				inter: ["Inter", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
				raleway: ["Raleway", "sans-serif"],
				karla: ["Karla", "sans-serif"],
				notable: ["Notable", "sans-serif"],
			},

			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			"corporate",
			"dark",
			"light",
			"lofi",
			"nord",
			{
				nord: {
					...require("daisyui/src/theming/themes").nord,
					"base-100": "#fffff0",
				},
			},
			{
				lofi: {
					...require("daisyui/src/theming/themes").lofi,
					primary: "#155e75",

					secondary: "#0f766e",

					accent: "#9f1239",

					neutral: "#1c1917",

					"base-100": "#f3f4f6",
				},
			},
		],
	},
};
export default config;
