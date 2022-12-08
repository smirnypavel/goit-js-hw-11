import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';
import { fetchForm } from './js/fetch'
import {createMarkup} from './js/markap'

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const guard = document.querySelector('.js_guard');
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
}
const observer = new IntersectionObserver(onLoad, options);
let page =1;

function onLoad(entries, observer){
    entries.forEach(element => {
        page+=1;
        if(element.isIntersecting){
            console.log('БАЧУ');
            fetchForm(page).then(data =>
                gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
                )
        }
    });
    console.log(entries);
}

form.addEventListener('submit', searchOn);

function searchOn(evt){
    evt.preventDefault()
    // console.dir(evt.currentTarget);
    const {searchQuery : {value }} = evt.currentTarget.elements;
    // console.log(value);
    if(!value){
        clearMarkAp();
        Notiflix.Notify.failure('Please, enter a search term!!!');
        return
    }
    fetchForm(value).then(data => {
            console.log(data);
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
            clearMarkAp();
            gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
            observer.observe(guard)
        });
}


// searchOn()


// fetchForm().then(data => {
//     console.log(data.hits);
//     gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits))
// });
// fetchForm()

// let lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: `alt`,
//     captionDelay: 250,
//     fadeSpeed: 100,
// });

function clearMarkAp(){
    gallery.innerHTML = '';
}
