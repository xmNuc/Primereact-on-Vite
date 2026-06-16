import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: ['babel-plugin-styled-components'],
//       },
//     }),
//   ],

//   resolve: {
//     alias: {
//       'styled-components': path.resolve(
//         __dirname,
//         'node_modules/styled-components'
//       ),
//     },
//   },

//   define: {
//     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//     'process.env': process.env,
//   },

//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//       },
//     },
//   },
// });
