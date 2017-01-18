'use strict';

/**
 * Created by ethannguyen on 11/01/2016.
 */
class eslider {
    /**
     *
     * @param element
     * @param options
     */
    constructor(element, options) {
        if (!element)
            this.el = '.eslider';
        else
            this.el = element;

        this.el = document.querySelector(this.el);
        this.options = {
            links: '.eslider_nav .eslider_slide-nav-link',
            wrapper: '.eslider_wrapper',
            prev: '.eslider_button-prev',
            next: '.eslider_button-next',
            slide: '.eslider_slide',
            slideCaption: '.eslider_slide-caption',
            slideNav: '.eslider_slide-nav',
            slideNavLink: '.eslider_slide-nav-link',
            loop: false
        };

        if (options)
            this.options = options;

        this.init();
    }

    /**
     * init
     */
    init() {
        this.slides = this.el.querySelectorAll(this.options.slide);
        this.links = this.el.querySelectorAll(this.options.links);
        this.wrapper = this.el.querySelector(this.options.wrapper);

        this.prev = this.el.querySelector(this.options.prev);
        this.next = this.el.querySelector(this.options.next);

        this.total = this.slides.length;
        this.current = 0;

        this.moveSlide(0);
        this.navigate();
        this.handleTouch();
    }

    /**
     * navigate
     */
    navigate() {
        for (let i = 0; i < this.links.length; ++i) {
            this.slideByNav(i);
        }

        this.slideByButton(this.prev, -1);
        this.slideByButton(this.next, 1);
    }

    /**
     * slideByNav
     * @param index
     */
    slideByNav(index) {
        let self = this;
        this.links[index].addEventListener('click', function (e) {
            e.preventDefault();
            self.moveSlide(index);
        }, false);
    }

    /**
     * slideByButton
     * @param index
     */
    slideByButton(element, index = 0) {
        let self = this;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            self.moveSlide(this.current + index);
        }, false);
    }

    /**
     * moveSlide
     * @param index
     */
    moveSlide(index = 0) {
        let self = this;

        if (!this.options.loop && (index < 0 || index >= self.total)) return;
        this.current = index;

        self.wrapper.style.left = `-${this.slides[this.current].offsetLeft}px`;

        this.removeCurrent();
        this.addCurrent();
    }

    /**
     * removeCurrent
     */
    removeCurrent() {
        for (let i = 0; i < this.total; i++) {
            this.slides[i].classList.remove('eslide-current');
            this.links[i].classList.remove('eslide-current');
        }
    }

    /**
     * addCurrent
     * @param index
     */
    addCurrent() {
        this.slides[this.current].classList.add('eslide-current');
        this.links[this.current].classList.add('eslide-current');
    }

    /**
     * handleTouch
     */
    handleTouch() {
        let self = this;
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;
        let distanceX = 0;
        let distanceY = 0;

        self.wrapper.addEventListener('touchstart', function (event) {
            touchstartX = event.touches[0].screenX;
            touchstartY = event.touches[0].screenY;
        }, false);

        self.wrapper.addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;

            distanceX = touchendX - touchstartX;
            distanceY = touchendY - touchstartY;


            if (Math.abs(distanceX) > Math.abs(distanceY)) { //swipe left right
                if (distanceX > 50) self.swipeRight();
                if (distanceX < -50) self.swipeLeft();
            }
        }, false);
    }

    /**
     * swipeRight
     */
    swipeRight() {
        this.moveSlide(this.current - 1);
    }

    /**
     * swipeLeft
     */
    swipeLeft() {
        this.moveSlide(this.current + 1);
    }
}

