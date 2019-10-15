   export const getMimeType = (mime) => {
       const type = mime.split('/')[0]
       return type
   }