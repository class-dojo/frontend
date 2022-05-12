import { Frame, dataToBackend } from '../components/UploadVideo/types';

//import { firstRequest } from './mockdata';

export const sendDataToBackEnd = (framesArray: Frame[], id: string) => {
  const keys: string[] = framesArray.flatMap(frame => Object.keys(frame));
  const dataToSend: dataToBackend = {
    videoId: id,
    frames: keys
  };
  // TODO send data to the backend
  return fetch(`${process.env.REACT_APP_BASE_URL}/getlinks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const getAnalysis = (id: string) => {
  const ref: dataToBackend = { videoId: id };
  // console.log('DATA SENT TO BACKEND', ref); // TODO delete when connecting to be
  return fetch(`${process.env.REACT_APP_BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ref)
  })
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
};