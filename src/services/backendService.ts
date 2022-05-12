import { Frame, DataToBackend } from '../components/UploadVideo/types';
import {API_URL} from '../consts';

//import { firstRequest } from './mockdata';

export const sendDataToBackEnd = (framesArray: Frame[], id: string) => {
  const keys: string[] = framesArray.flatMap(frame => Object.keys(frame));
  const dataToSend: DataToBackend = {
    videoId: id,
    frames: keys
  };

  console.log(API_URL);

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
  // console.log('DATA SENT TO BACKEND', ref); // TODO delete when connecting to be
  return fetch(`${API_URL}analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ref)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};
