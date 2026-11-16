/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(14px)', opacity: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        scrollDot: 'scrollDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
