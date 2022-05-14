import { Frame, DataToBackend } from '../components/UploadVideo/types';
import { API_URL } from '../consts';

export const sendDataToBackEnd = (framesArray: Frame[], id: string) => {
  const keys: string[] = framesArray.flatMap(frame => Object.keys(frame));
  const dataToSend: DataToBackend = {
    videoId: id,
    frames: keys
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

export const getAnalysis = (id: string) => {
  const ref: DataToBackend = { videoId: id };
  return fetch(`${API_URL}analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ref)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};
