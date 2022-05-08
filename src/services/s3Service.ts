export const uploadImgToBucket = (file: File) => {
  const {type} = file;
  const url = 'http://images.localhost:9000/images/dummy.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20220507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220507T123814Z&X-Amz-Expires=604800&X-Amz-Signature=627218060ca95a97b5b0b8413ac00e4eeaf72c7adb746a0b3346e7d59665b807&X-Amz-SignedHeaders=host';
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': type,
    },
    body: file,
  })
    .then(console.log)
    .catch(console.error);
};
