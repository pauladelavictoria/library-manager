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
				xl: 'calc(var(--radius) * 2)',
			},
			margin: {
				xs: 'calc(var(--spacing) / 2)',
				sm: 'var(--spacing)',
				md: 'calc(var(--spacing) * 2)',
				lg: 'calc(var(--spacing) * 4)',
				xl: 'calc(var(--spacing) * 8)',
				xxl: 'calc(var(--spacing) * 12)',
				xxxl: 'calc(var(--spacing) * 16)',
				'4xl': 'calc(var(--spacing) * 24)',
			},
			padding: {
				xs: 'calc(var(--spacing) / 2)',
				sm: 'var(--spacing)',
				md: 'calc(var(--spacing) * 2)',
				lg: 'calc(var(--spacing) * 4)',
				xl: 'calc(var(--spacing) * 8)',
			},
			fontFamily: {
				sans: ['var(--font-space-grotesk)', 'sans-serif'],
				serif: ['var(--font-playfair)', 'serif'],
				mono: ['var(--font-space-mono)', 'monospace'],
			},
		}
	},

	plugins: [require("tailwindcss-animate")],
} satisfies Config;
