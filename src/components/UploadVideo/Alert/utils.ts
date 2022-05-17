import { AlertMessageProps } from '../types';

export const fileNotSelected: AlertMessageProps = { heading: 'Forgot anything?', body: 'Please select a video to analyze', variant: 'danger' };
export const analysisError: AlertMessageProps = { heading: 'Ooops, something went wrong!', body: 'Video analysis unsuccessful, please try again', variant: 'danger' };