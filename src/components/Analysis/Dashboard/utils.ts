export const niceDuration = (duration: number) => {
  const mins = Math.floor(duration / 60);
  const secs = Math.floor(duration % 60);
  return `${mins} ${mins > 1 ? 'mins' : 'min'} - ${secs} ${secs > 1 ? 'secs' : 'sec'}`;
};

export const capitalise = (title: string) => {
  return title.split(' ').map((word: string) => word.toLowerCase()).join(' ').replace(/(^\w{1})|(\s+\w{1})/g, (char: string) => char.toUpperCase());
};