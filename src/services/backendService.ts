import { DataToBackend } from '../components/UploadVideo/types';
import { API_URL } from '../constants';

export const sendDataToBackEnd = (frameNamesArray: string[], id: string) => {
  const dataToSend: DataToBackend = {
    videoId: id,
    frames: frameNamesArray
  };
  return fetch(`${API_URL}getlinks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const getAnalysis = (videoId: string, videoName: string, videoDate: string, duration: number, accuracy: number) => {
  const ref: DataToBackend = { videoId, videoName, videoDate, duration, accuracy };
  return fetch(`${API_URL}analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ref)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const getAnalysisRecord = (videoId: string) => {
  return fetch(`${API_URL}analyze/${videoId}`)
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};
