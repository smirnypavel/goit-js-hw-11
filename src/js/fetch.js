const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '31868905-6d4cb3c5703ea270b013ab0a6'
const searchParams = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1'


export const fetchForm = (name='tank') =>{
   return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&${searchParams}`)
    .then(resp => {
        console.log(resp);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })  
}