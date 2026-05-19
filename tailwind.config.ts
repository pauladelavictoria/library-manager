import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: 'hsl(var(--card-background))',
				blackTransparent: 'hsl(var(--black-transparent))',
				cardDark: 'hsl(var(--card-background-dark))',
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 4px)',
				md: 'calc(var(--radius) - 2px)',
				lg: 'var(--radius)',
			},
			margin: {
				xs: 'calc(var(--spacing) / 2)',
				sm: 'var(--spacing)',
				md: 'calc(var(--spacing) * 2)',
				lg: 'calc(var(--spacing) * 4)',
				xl: 'calc(var(--spacing) * 8)',
			},
			padding: {
				xs: 'calc(var(--spacing) / 2)',
				sm: 'var(--spacing)',
				md: 'calc(var(--spacing) * 2)',
				lg: 'calc(var(--spacing) * 4)',
				xl: 'calc(var(--spacing) * 8)',
			},
			fontFamily: {
				sans: ['var(--font-inter)', 'sans-serif'],
				serif: ['var(--font-cormorantGaramond)', 'serif'],
			},
			backgroundImage: {
				'hero-pattern': "url('/images/background.jpg')",
			}
		}
	},

	plugins: [require("tailwindcss-animate")],
} satisfies Config;
