new Navigation().init();

const shelter = new Shelter();
shelter.init();

const pagination = new Pagination(shelter, {
    containerElement: document.getElementById('our-friends-grid'),
    paginationElement: document.getElementById('our-friends-pagination'),
});

pagination.init();

new Modal(shelter, {
    toggleClass: '.toggle-puppy-modal',
}).init();
