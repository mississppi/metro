import { useEffect } from 'react';
import './App.css'
import MainLayout from './layouts/MainLayout'

function App() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <MainLayout>
      
    </MainLayout>
  )
}

export default App
