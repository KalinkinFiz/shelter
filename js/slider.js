class Slider {
    constructor(shelter, {containerElement, sliderControlElement}) {
        this.shelter = shelter;
        this.containerElement = containerElement;
        this.sliderItems = containerElement.children;
        this.sliderControlElement = sliderControlElement;
        this.currentItem = 0;
        this.isEnabled = true;

        this.breakpoint = '';
        this.oldBreakpoint = '';

        this.currentPuppy = [];

        this.handleResize = this.handleResize.bind(this);
        this.handleChangePaginate = this.handleChangePaginate.bind(this);
    }

    init() {
        this._media();
        //this._initialCards();
        //this._render();
        window.addEventListener('resize', this.handleResize);
        this.sliderControlElement.addEventListener('click', this.handleChangePaginate);
        this._swipeDetect(this.containerElement);
    }

    changeCurrentItem(n) {
        this.currentItem = (n + this.sliderItems.length) % this.sliderItems.length;
    }

    hideItem(direction) {
        this.isEnabled = false;
        this.sliderItems[this.currentItem].classList.add(direction);
        this.sliderItems[this.currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction);
        });
    }

    showItem(direction) {
        this.sliderItems[this.currentItem].classList.add('next', direction);
        const animationEnd = () => {
            this.sliderItems[this.currentItem].classList.remove('next', direction);
            this.sliderItems[this.currentItem].classList.add('active');
            this.isEnabled = true;
        };

        this.sliderItems[this.currentItem].addEventListener('animationend', animationEnd);
    }

    _nextItem(n) {
        this.hideItem('to-left');
        this.changeCurrentItem(n + 1);
        this.showItem('from-right');
    }

    _previousItem(n) {
        this.hideItem('to-right');
        this.changeCurrentItem(n - 1);
        this.showItem('from-left');
    }

    _media() {
        switch (true) {
            case window.innerWidth > 1280:
                this.shelter.Number = 3;
                this.breakpoint = 'large';
                break;
            case window.innerWidth >= 768:
                this.shelter.Number = 2;
                this.breakpoint = 'medium';
                break;
            case window.innerWidth >= 320:
                this.shelter.Number = 1;
                this.breakpoint = 'small';
                break;
            default:
        }

        if (this.breakpoint !== this.oldBreakpoint) {
            this._initialCards();
            this._render();

            this.oldBreakpoint = this.breakpoint;
        }
    }

    _render() {
        this.sliderControlElement.innerHTML = `
          <button class="control left" data-action="_left">
            <img src="assets/img/icons/arrow-prev.svg" alt="Prev" /></button
          >
          <button class="control right" data-action="_right">
            <img src="assets/img/icons/arrow-next.svg" alt="Next" />
          </button>
    `;
    }

    _initialCards() {
        this.currentPuppy = this.shelter.renderRandHTMLCards(this.sliderItems[this.currentItem], []);
    }

    _right() {
        this.currentPuppy = this.shelter.renderRandHTMLCards(
            this.sliderItems[(this.currentItem + 1) % this.sliderItems.length],
            this.currentPuppy,
        );
        if (this.isEnabled) {
            this._nextItem(this.currentItem);
        }
    }

    _left() {
        this.currentPuppy = this.shelter.renderRandHTMLCards(
            this.sliderItems[this.currentItem === 0 ? this.sliderItems.length - 1 : this.currentItem - 1],
            this.currentPuppy,
        );
        if (this.isEnabled) {
            this._previousItem(this.currentItem);
        }
    }

    handleResize(event) {
        this._media();
    }

    handleChangePaginate(event) {
        event.preventDefault();

        let btn = event.target.closest('button[data-action]');

        if (!btn) return;

        if (!this.sliderControlElement.contains(btn)) return;

        let action = btn.dataset.action;
        if (action) {
            this[action]();
            this._render();
        }
    }

    _swipeDetect(el) {
        let surface = el;
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let startTime = 0;
        let elapsedTime = 0;

        let threshold = 150;
        let restraint = 100;
        let allowedTime = 300;

        const mouseDownHendler = (e) => {
            startX = e.pageX;
            startY = e.pageY;
            startTime = new Date().getTime();
            e.preventDefault();
        };

        surface.addEventListener('mousedown', mouseDownHendler, false);

        const mouseUpHendler = (e) => {
            distX = e.pageX - startX;
            distY = e.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        if (this.isEnabled) {
                            this._left(this.currentItem);
                        }
                    } else {
                        if (this.isEnabled) {
                            this._right(this.currentItem);
                        }
                    }
                }
            }
            e.preventDefault();
        };

        surface.addEventListener('mouseup', mouseUpHendler, false);

        const touchStartHandler = (e) => {
            if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
                if (e.target.classList.contains('left')) {
                    if (this.isEnabled) {
                        this._left(this.currentItem);
                    }
                } else {
                    if (this.isEnabled) {
                        this._right(this.currentItem);
                    }
                }
            }
            const touchObj = e.changedTouches[0];
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime();
            //e.preventDefault();
        };

        surface.addEventListener('touchstart', touchStartHandler, false);
        surface.addEventListener(
            'touchmove',
            function (e) {
                e.preventDefault();
            },
            false,
        );

        const touchEndHendler = (e) => {
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            elapsedTime = new Date().getTime() - startTime;
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    if (distX > 0) {
                        if (this.isEnabled) {
                            this._left(this.currentItem);
                        }
                    } else {
                        if (this.isEnabled) {
                            this._right(this.currentItem);
                        }
                    }
                }
            }
            //e.preventDefault();
        };

        surface.addEventListener('touchend', touchEndHendler, false);
    }
}
