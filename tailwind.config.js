/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'cards': "url('/src/lib/assets/cards.jpg')"
			}
		}
	},
	plugins: [require('daisyui')]
};
