export const ATTENTION = 'Attention';
export const MOOD = 'Mood';
export const EMOTIONS = 'Emotions';
export const AGGREGATE = 'Aggregate';
export const HEADCOUNT = 'Headcount';

export const aggregateHelp = { header: 'AGGREGATE GRAPH', body: 'Shows the attention and mood throughout the duration of your class compared to the attendace rate. Switch between indexes and headcount to higlight important events.' };
export const attentionHelp = { header: 'ATTENTION GRAPH', body: 'Shows the attention level throughout the duration of your class together with the min and max average values. A good average value would be 75% or above.' };
export const moodHelp = { header: 'MOOD GRAPH', body: 'Shows the mood level throughout the duration of your class together with the min and max average values. Low values are not indicative of a bad lecture.' };

const rootElement = document.getElementById('root');

export const VERSION: string = rootElement?.getAttribute('data-version') || '';

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';

export const BASE_URL: string = rootElement?.getAttribute('data-base-url') || '';

export const IMAGE_BUCKET_URL: string = rootElement?.getAttribute('data-image-bucket-url') || '';

