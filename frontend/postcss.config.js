// Import plugins directly
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    // Explicitly specify the config file path
    tailwindcss({ config: './tailwind.config.js' }),
    autoprefixer(), // Call autoprefixer as a function
  ],
};
