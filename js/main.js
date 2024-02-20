new Navigation().init();

// const shelter = new Shelter();
// shelter.Number = 3;

// const ourFriendsCarouselElement = document.getElementById('our-friends-carousel');
// shelter.renderHTMLCards(ourFriendsCarouselElement);

const shelter = new Shelter();

const slider = new Slider(shelter, {
    containerElement: document.getElementById('our-friends-carousel-container'),
    sliderControlElement: document.getElementById('our-friends-carousel-navigation'),
});

slider.init();

new Modal(shelter, {
    toggleClass: '.toggle-puppy-modal',
}).init();
