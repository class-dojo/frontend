export const ATTENTION = 'Attention';
export const MOOD = 'Mood';
export const EMOTIONS = 'Emotions';
export const AGGREGATE = 'Aggregate';
export const HEADCOUNT = 'Headcount';

const rootElement = document.getElementById('root');

export const VERSION: string = rootElement?.getAttribute('data-version') || '';

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';

export const BASE_URL: string = rootElement?.getAttribute('data-base-url') || '';

export const IMAGE_BUCKET_URL: string = rootElement?.getAttribute('data-image-bucket-url') || '';

