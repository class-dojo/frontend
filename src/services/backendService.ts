import { Frame, dataToBackend } from '../components/UploadVideo/types';

export const sendDataToBackEnd = (framesArray: Frame[]) => {
  const keys: string[] = framesArray.flatMap(frame => Object.keys(frame));
  const dataToSend: dataToBackend = {
    bucket: 'image',
    frameNames: keys
  }; // TODO send data to the backend
  // fetch(process.env.REACT_APP_BASE_URL as string)
  //   .then(res => res.status < 400 ? res : Promise.reject(res))
  //   .then(res => res.json())
  //   .catch(err => console.error(err));
};