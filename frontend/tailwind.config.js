/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				retro: ['"Press Start 2P"', 'monospace'],
				vt: ['VT323', 'monospace'],
			},
			colors: {
				neon: {
					green: '#39ff14',
					cyan: '#00fff5',
					pink: '#ff2d78',
					yellow: '#ffe600',
					purple: '#bf00ff',
				},
				crt: {
					bg: '#0a0a0f',
					panel: '#0d1117',
					border: '#1a2a1a',
				},
			},
			boxShadow: {
				neon: '0 0 5px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14',
				'neon-cyan': '0 0 5px #00fff5, 0 0 20px #00fff5',
				'neon-pink': '0 0 5px #ff2d78, 0 0 20px #ff2d78',
				'pixel': '4px 4px 0px #000',
			},
			animation: {
				'crt-flicker': 'crtFlicker 0.15s infinite',
				'neon-pulse': 'neonPulse 2s ease-in-out infinite',
				'scanline': 'scanline 8s linear infinite',
				'blink': 'blink 1s step-end infinite',
				'marquee': 'marquee 12s linear infinite',
				'pixel-bounce': 'pixelBounce 0.6s steps(4) infinite',
			},
			keyframes: {
				crtFlicker: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.97' },
					'92%': { opacity: '0.94' },
				},
				neonPulse: {
					'0%, 100%': { textShadow: '0 0 4px #39ff14, 0 0 10px #39ff14' },
					'50%': { textShadow: '0 0 8px #39ff14, 0 0 30px #39ff14, 0 0 60px #39ff14' },
				},
				scanline: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				marquee: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				pixelBounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' },
				},
			},
		},
	},
	plugins: [],
};
