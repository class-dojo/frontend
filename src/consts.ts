const rootElement = document.getElementById('root');

export const VERSION: string = rootElement?.getAttribute('data-version') || '';

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';
