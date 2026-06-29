// Extends Tailwind's CDN build with this site's brand tokens.
// Kept in its own file (instead of an inline <script>) so the
// Content-Security-Policy can stay free of 'unsafe-inline' for scripts.
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#15171b',
          soft: '#1b1e23',
          surface: '#1e2228',
          surface2: '#242931',
          border: '#2b3038'
        },
        gold: {
          DEFAULT: '#d8a14c',
          strong: '#e8b568',
          soft: 'rgba(216,161,76,0.12)'
        },
        teal: {
          DEFAULT: '#5e8c8a',
          soft: 'rgba(94,140,138,0.14)'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      }
    }
  }
};
