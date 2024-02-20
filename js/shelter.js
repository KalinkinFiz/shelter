const MAX_NUMBER = 48;

class Shelter {
    constructor(number) {
        this.offset = 0;
        this.number = number;

        this.data = [];
    }

    get Length() {
        return MAX_NUMBER;
    }

    get Offset() {
        return this.offset;
    }

    set Offset(value) {
        this.offset = value;
    }

    get Number() {
        return this.number;
    }

    set Number(value) {
        this.number = value;
    }

    init() {
    }

    setPuppies(totalPage, perPage) {
        this.data = generatePuppies(totalPage, perPage);
    }

    getPuppyById(id) {
        return this.data.find((item) => item.id === id);
    }

    getPuppyByName(name) {
        return INITIAL_PUPPIES.find((item) => item.name === name);
    }

    _getPuppies() {
        return this.data.slice(this.offset, this.offset + this.number);
    }

    _getTemplateCard(puppy) {
        return `<div class="our-friends-card toggle-puppy-modal" data-puppy-modal-open data-id="${puppy.id}" data-name="${puppy.name}" >
      <img
        src="${puppy.img}"
        alt="${puppy.name}"
        class="our-friends-card__image"
      />
      <h3 class="our-friends-card__title">${puppy.name}</h3>
      <a href="#" class="our-friends-card__btn btn">
        Learn more
      </a>
    </div>`;
    }

    getHTMLCard(data) {
        return this._getTemplateCard(data);
    }

    getHTMLCards(puppy) {
        const cards = [];

        for (let i = 0; i < this.number; i++) {
            cards.push(this.getHTMLCard(puppy[i]));
        }

        return cards;
    }

    renderHTMLCards(el) {
        const puppy = this._getPuppies();
        el.innerHTML = this.getHTMLCards(puppy).join('');
    }

    renderRandHTMLCards(el, oldPuppy) {
        const puppy = generateRandPuppies(this.number, oldPuppy);
        el.innerHTML = this.getHTMLCards(puppy).join('');

        return puppy;
    }
}
