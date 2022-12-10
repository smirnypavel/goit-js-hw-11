export { onTop, onScroll };

const onTopButton = document.querySelector('.on-top');

window.addEventListener('scroll', onScroll);
onTopButton.addEventListener('click', onTop);

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        onTopButton.classList.add('btn-to-top--visible');
    };
    if (scrolled < coords) {
        onTopButton.classList.remove('btn-to-top--visible');
    };
};

function onTop() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};