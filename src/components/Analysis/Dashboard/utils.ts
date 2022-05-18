import { DateTime } from 'luxon';

export const niceDuration = (duration: number) => {
  const mins = Math.floor(duration / 60);
  const secs = Math.floor(duration % 60);
  return `${mins} ${mins > 1 ? 'mins' : 'min'} - ${secs} ${secs > 1 ? 'secs' : 'sec'}`;
};

export const capitalise = (title: string) => {
  let newTitle = title.split(' ').map((word: string) => word.toLowerCase()).join(' ').replace(/(^\w{1})|(\s+\w{1})/g, (char: string) => char.toUpperCase());
  if (newTitle.length > 20) {
    newTitle = newTitle.slice(0, 17);
    return newTitle + '...';
  }
};

export const niceDate = (ISOdate: string) => {
  return DateTime.fromISO(ISOdate).toLocaleString(DateTime.DATE_MED);
};