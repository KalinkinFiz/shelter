const defOptions = {toggleClass: '.toggle-modal'};

class Modal {
    constructor(shelter, options) {
        const {toggleClass} = {
            ...defOptions,
            ...options,
        };

        this.shelter = shelter;

        this.toggleElements = document.querySelectorAll(toggleClass);
        this.puppyId = null;
        this.puppyName = null;

        this.modalElement = null;
        this.overlayElement = null;
        this.bodyElement = document.querySelector('body');

        this.fadeDuration = 300;

        this.isOpen = false;

        this._handleEvent = this._handleEvent.bind(this);
    }

    init() {
        document.addEventListener('click', this._handleEvent);
    }

    open() {
        this.bodyElement.classList.add('puppy-modal-open');
        this._create();

        setTimeout(() => {
            this.overlayElement.classList.add('visible');
            this.modalElement.classList.add('visible');
        }, 100);
        this.isOpen = true;
    }

    close() {
        this.overlayElement.classList.remove('visible');
        this.modalElement.classList.remove('visible');
        setTimeout(() => {
            this._destroy();
            this.isOpen = false;
            this.bodyElement.classList.remove('puppy-modal-open');
        }, this.fadeDuration);
    }

    _handleEvent(event) {
        const {target} = event;

        if (!target) return;

        // Open
        const toggleOpenElement = target.closest('[data-puppy-modal-open]');
        if (toggleOpenElement) {
            event.preventDefault();
            this.puppyId = Number(toggleOpenElement.dataset.id);
            this.puppyName = toggleOpenElement.dataset.name;
            this.open();
            return;
        }

        // Close
        const toggleCloseElement = target.closest('[data-puppy-modal-close]');
        if (toggleCloseElement) this.close();
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    _create() {
        let puppy = null;
        if (this.puppyId) {
            puppy = this.shelter.getPuppyById(this.puppyId);
        } else if (this.puppyName) {
            puppy = this.shelter.getPuppyByName(this.puppyName);
        }

        this.modalElement = createElement('div', this._getContentModal(puppy), {
            classes: ['puppy-modal'],
        });

        this.overlayElement = createElement('div', null, {
            classes: ['puppy-modal-overlay'],
            dataAttrs: {
                puppyModalClose: '',
            },
        });

        this.modalWrapperElement = createElement('div', [this.overlayElement, this.modalElement], {
            classes: ['puppy-modal-wrapper'],
        });

        this.bodyElement.append(this.modalWrapperElement);
    }

    _destroy() {
        this.modalWrapperElement.parentNode.removeChild(this.modalWrapperElement);
    }

    _getContentModal(puppy) {
        return `
        <button class="puppy-modal__close" data-puppy-modal-close>
            <img src="assets/img/icons/close.svg" alt="Close"/>
        </button>
        <div class="puppy-modal__image"><img src="${puppy.img}" alt="${puppy.name}"></div>
        <div class="puppy-modal__content">
            <h2 class="puppy-modal__name">${puppy.name}</h2>
            <div class="puppy-modal__meta">
                <span class="puppy-modal__type">${puppy.type}</span>
                -
                <span class="puppy-modal__breed">${puppy.breed}</span>
            </div>
            <p class="puppy-modal__description">${puppy.description}</p>
            <ul class="puppy-modal__info-list">
                <li class="puppy-modal__info-item"><b>Age: </b>${puppy.age}</li>
                <li class="puppy-modal__info-item"><b>Inoculations: </b>${puppy.inoculations.join(
            ', ',
        )}</li>
                <li class="puppy-modal__info-item"><b>Diseases: </b>${puppy.diseases.join(
            ', ',
        )}</li>
                <li class="puppy-modal__info-item"><b>Parasites: </b>${puppy.parasites.join(
            ', ',
        )}</li>
            </li>
        </div>
    `;
    }
}
