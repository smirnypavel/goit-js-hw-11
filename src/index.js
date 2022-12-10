import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { createImage } from './js/createImage'
import { fetchImages, page, perPage, resetPage } from './js/fetchImages';
import { onTop, onScroll } from './js/buttonUp';


const form = document.querySelector("#search-form");
const input = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const loadButton = document.querySelector(".load-more");


// const API_KEY = '30163635-d3ce08ab8a7984e551514dc56';


form.addEventListener('submit', onSubmit);
loadButton.addEventListener('click', onNextPage)

let searchValue = '';

const optionsSL = {
    overlayOpacity: 0.5,
    captionsData: "alt",
    captionDelay: 250,
};
let simpleLightbox;

onScroll();
onTop();


async function onSubmit(event) {
    event.preventDefault();
    searchValue = input.value.trim();
    if (searchValue === '') {
        clearAll();
        buttonHidden();
        Notiflix.Notify.info('You cannot search by empty field, try again.');
        return;
    } else {
        try {
            resetPage();
            const result = await fetchImages(searchValue);
            if (result.hits < 1) {
                form.reset();
                clearAll();
                buttonHidden();
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                form.reset();
                gallery.innerHTML = createImage(result.hits);
                simpleLightbox = new SimpleLightbox(".gallery a", optionsSL).refresh();
                buttonUnHidden();
                
                Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
            };
        } catch (error) {
            ifError();
        };
    };
};
async function onNextPage() {
    simpleLightbox.destroy();
    try {
        const result = await fetchImages(searchValue);
        const totalPages = page * perPage;
            if (result.totalHits <= totalPages) {
                buttonHidden();
                Notiflix.Report.info('Wow', "We're sorry, but you've reached the end of search results.", 'Okay');
            }
        gallery.insertAdjacentHTML('beforeend', createImage(result.hits));
        smoothScroll();
        simpleLightbox = new SimpleLightbox(".gallery a", optionsSL).refresh();
    } catch (error) {
        ifError();
    };
};

function ifError() {
    clearAll();
    buttonHidden();
    Notiflix.Report.info('Oh', 'Something get wrong, please try again', 'Okay');
};

function clearAll() {
    gallery.innerHTML = '';
};

function buttonHidden() {
    loadButton.classList.add("visually-hidden");
};

function buttonUnHidden() {
    loadButton.classList.remove("visually-hidden");
};

function smoothScroll() {
    const { height: cardHeight } =
        document.querySelector(".photo-card").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3.9,
    behavior: "smooth",
});
};