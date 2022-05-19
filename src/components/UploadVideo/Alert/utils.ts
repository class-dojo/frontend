import { AlertMessageProps } from '../types';

export const fileNotSelected: AlertMessageProps = { heading: 'Forgot anything?', body: 'Please select a video to analyze', variant: 'danger' };
export const analysisError: AlertMessageProps = { heading: 'Ooops, something went wrong!', body: 'Video analysis unsuccessful, please try again', variant: 'danger' };

export const sorryTooLong = 'Hi there and thank you for choosing Class Dojo! This is a free service built by a passionate group of students: unfortunately the face recognition software we\'re using does not come cheap and we\'re paying for it on our own. Please consider choosing a lower quality or select a shorter video. Thank you for your cooperation - Class Dojo Team';