import { createRoot } from 'react-dom/client';

import { App } from './App';
import { StoreProvider } from './stores';

createRoot(document.getElementById('root') || document.body).render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
