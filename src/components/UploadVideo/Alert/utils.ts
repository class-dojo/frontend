import { AlertMessageProps } from '../types';

export const fileNotSelected: AlertMessageProps = { heading: 'Forgot anything?', body: 'Please select a video to analyze', variant: 'danger' };
export const loaderNotReady: AlertMessageProps = { heading: 'Wow, so quick!', body: 'The loader is not not ready yet, please wait for the "Start Transcoding" message to appear', variant: 'danger' };
export const uploadSuccessful: AlertMessageProps = { heading: 'Success!', body: 'The video analysis is ready for you to check', variant: 'success' };
