class Pagination {
    constructor(shelter, {containerElement, paginationElement}) {
        this.shelter = shelter;
        this.containerElement = containerElement;
        this.paginationElement = paginationElement;

        this.offset = 0;
        this.perPage = 8;
        this.currentPage = 1;
        this.totalPages = Math.round(this.shelter.Length / this.perPage); // 6

        this.breakpoint = '';
        this.oldBreakpoint = '';

        this._isDasabledPrev = true;
        this._isDasabledNext = false;
        // this._queryParams = new URLSearchParams(window.location.search);

        this.handleResize = this.handleResize.bind(this);
        this.handleChangePaginate = this.handleChangePaginate.bind(this);
    }

    init() {
        // if (this._queryParams.has('page')) this.currentPage = Number(this._queryParams.get('page'));

        this._media();
        //this._changePaginate();
        //this._render();

        window.addEventListener('resize', this.handleResize);
        this.paginationElement.addEventListener('click', this.handleChangePaginate);
    }

    _media() {
        switch (true) {
            case window.innerWidth > 1280:
                this.perPage = 8;
                this.shelter.Number = 8;
                this.breakpoint = 'large';
                break;
            case window.innerWidth >= 768:
                this.perPage = 6;
                this.shelter.Number = 6;
                this.breakpoint = 'medium';
                break;
            case window.innerWidth >= 320:
                this.perPage = 3;
                this.shelter.Number = 3;
                this.breakpoint = 'small';
                break;
            default:
        }

        if (this.breakpoint !== this.oldBreakpoint) {
            this.totalPages = Math.round(this.shelter.Length / this.perPage);
            if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;

            this.shelter.setPuppies(this.totalPages, this.shelter.Number);

            this._changePaginate();
            this._render();

            this.oldBreakpoint = this.breakpoint;
        }
    }

    _render() {
        this.paginationElement.innerHTML = `
      <li class="pagination__item"><button class="pagination__go-start" data-action="goStart" ${
            this._isDasabledPrev ? 'disabled' : ''
        }><<</button></li>
      <li class="pagination__item"><button class="pagination__prev" data-action="goPrev"  ${
            this._isDasabledPrev ? 'disabled' : ''
        }><</button></li>
      <li class="pagination__item"><span class="pagination__current">${this.currentPage}</span></li>
      <li class="pagination__item"><button class="pagination__next" data-action="goNext"  ${
            this._isDasabledNext ? 'disabled' : ''
        }>></button></li>
      <li class="pagination__item"><button class="pagination__go-end" data-action="goEnd"  ${
            this._isDasabledNext ? 'disabled' : ''
        }>>></button></li>
    `;
    }

    _changePaginate() {
        if (this.currentPage === 1) this._isDasabledPrev = true;
        else this._isDasabledPrev = false;

        if (this.currentPage === this.totalPages) this._isDasabledNext = true;
        else this._isDasabledNext = false;

        this.shelter.Offset = (this.currentPage - 1) * this.perPage;
        this.shelter.renderHTMLCards(this.containerElement);

        // this._queryParams.set('page', this.currentPage);
        // history.replaceState(null, null, '?' + this._queryParams.toString());
    }

    goStart() {
        this.currentPage = 1;
        this._changePaginate();
    }

    goPrev() {
        if (this.currentPage > 1) this.currentPage--;
        this._changePaginate();
    }

    goNext() {
        if (this.currentPage < this.totalPages) this.currentPage++;
        this._changePaginate();
    }

    goEnd() {
        this.currentPage = this.totalPages;
        this._changePaginate();
    }

    handleResize(event) {
        this._media();
    }

    handleChangePaginate(event) {
        event.preventDefault();

        let action = event.target.dataset.action;
        if (action) {
            this[action]();
            this._render();
        }
    }
}
