class Navigation {
    constructor() {
        this.navigationElement = document.getElementById('navigation');
        this.burgerElement = document.getElementById('navigation-burger');

        this.isOpen = false;
        this.overlay = createElement('div', null, {
            classes: ['navigation-overlay'],
        });
    }

    init() {
        this.burgerElement.addEventListener('click', () => this.toggle());
        this.overlay.addEventListener('click', () => this.close());

        this.navigationElement
            .querySelector('.navigation-item.active a')
            .addEventListener('click', (e) => {
                e.preventDefault();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.close();
            });
    }

    open() {
        this.navigationElement.style.transition = '.25s';
        this.navigationElement.style.transform = 'translate(0)';
        this.burgerElement.classList.add('open');

        document.body.style.overflowY = 'hidden';
        this.navigationElement.parentNode.insertBefore(this.overlay, this.navigationElement);

        this.isOpen = true;
    }

    close() {
        this.navigationElement.style.transform = 'translate(100%)';
        this.burgerElement.classList.remove('open');

        document.body.style.overflowY = 'auto';
        this.overlay.parentNode.removeChild(this.overlay);

        this.isOpen = false;

        setTimeout(() => (this.navigationElement.style.transitionProperty = 'none'), 250);
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }
}
