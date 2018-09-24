export const toDataUrl = url => {
  return (new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      }
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }));
};
