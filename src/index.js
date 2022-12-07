import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';
import { fetchForm } from './js/fetch'
import {createMarkup} from './js/markap'

const gallery = document.querySelector('.gallery');
const form= document.querySelector('.search-form');


form.addEventListener('submit', searchOn);

function searchOn(evt){
    evt.preventDefault()
    console.dir(evt.currentTarget);
    const {searchQuery : {value }} = evt.currentTarget.elements;
    console.log(value);
    if(!value){
        Notiflix.Notify.failure('Please, enter a search term!!!');
        return
    }
    fetchForm(value).then(data => {
            console.log(data.hits);
            gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
        });
}


// searchOn()


// fetchForm().then(data => {
//     console.log(data.hits);
//     gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
// });
// fetchForm()

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: `alt`,
    captionDelay: 250,
    fadeSpeed: 100,
});


