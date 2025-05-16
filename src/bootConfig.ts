export async function loadConfig(): Promise<any> {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error('Nie udało się załadować konfiguracji');
  }
  return response.json();
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { loadConfig } from './loadConfig';

// loadConfig().then(config => {
//   // Możesz przekazać config jako prop, kontekst, albo ustawić globalnie
//   ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//       <App config={config} />
//     </React.StrictMode>
//   );
// }).catch(error => {
//   console.error('Błąd ładowania konfiguracji:', error);
//   // Możesz wyświetlić jakiś fallback UI, jeśli chcesz
// });
