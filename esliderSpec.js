/**
 * Created by ethannguyen on 20/01/2016.
 */
define(['dom', 'simpleSlider'], function(dom, simpleSlider) {

    describe('simpleSlide', function() {
        var simpleSliderEl = '<div class="simpleSlider">' +
            '<div class="simpleSlider_wrapper">' +
            '<section class="simpleSlider_slide" simpleSlider-slide="0"/>' +
            '<section class="simpleSlider_slide" simpleSlider-slide="1"/>' +
            '</div>' +
            '<a class="simpleSlider_button-prev" />' +
            '<a class="simpleSlider_button-next" />' +
            '<div class="simpleSlider_nav">' +
            '<div class="simpleSlider_slide-nav">' +
            '<a href="#" simpleSlider-slide="0" class="simpleSlider_slide-nav-link" />' +
            '<a href="#" simpleSlider-slide="1" class="simpleSlider_slide-nav-link" />' +
            '</div>' +
            '</div>' +
            '</div>';

        beforeEach(function() {
            dom.render();
            document.body.insertAdjacentHTML('beforeend', simpleSliderEl);
        });

        it('simpleSlider should be a function for unit test', function() {
            expect(simpleSlider).toEqual(jasmine.any(Function));
        });

        it('new simpleSlider object', function() {
            var slide = new simpleSlider();
            expect(slide).toEqual(jasmine.any(Object));
        });

        describe('simpleSlider constructor', function() {
            it('should call init function', function() {
                spyOn(simpleSlider.prototype, ['init']).and.callThrough();
                new simpleSlider();
                expect(simpleSlider.prototype.init).toHaveBeenCalled();
            });

            it('should have variables', function() {
                var slide = new simpleSlider();
                expect(slide.el).toBeDefined();
                expect(slide.options).toBeDefined();
            });
        });

        describe('init', function() {
            it('should call other functions', function() {
                spyOn(simpleSlider.prototype, 'moveSlide').and.callThrough();
                spyOn(simpleSlider.prototype, 'navigate').and.callThrough();
                spyOn(simpleSlider.prototype, 'handleTouch').and.callThrough();
                new simpleSlider();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(0);
                expect(simpleSlider.prototype.navigate).toHaveBeenCalled();
                expect(simpleSlider.prototype.handleTouch).toHaveBeenCalled();
            });

            it('should add variables', function() {
                var slide = new simpleSlider();
                expect(slide.slides).toBeDefined();
                expect(slide.links).toBeDefined();
                expect(slide.wrapper).toBeDefined();
                expect(slide.prev).toBeDefined();
                expect(slide.next).toBeDefined();
                expect(slide.total).toBeDefined();
                expect(slide.current).toBeDefined();
            });
        });

        describe('navigate', function() {
            it('should call slideByNav multiple times', function() {
                spyOn(simpleSlider.prototype, 'slideByNav').and.callThrough();
                spyOn(simpleSlider.prototype, 'slideByButton').and.callThrough();
                new simpleSlider();
                expect(simpleSlider.prototype.slideByNav.calls.count()).toBe(2);
                expect(simpleSlider.prototype.slideByButton.calls.count()).toBe(2);
            });
        });

        describe('slideByNav', function() {
            it('should call moveSlide', function() {
                spyOn(simpleSlider.prototype, 'moveSlide').and.callThrough();
                var slider = new simpleSlider();
                slider.links[1].click();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(1);
                slider.links[0].click();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(0);
            });
        });

        describe('slideByButton', function() {
            it('should call moveSlide', function() {
                spyOn(simpleSlider.prototype, 'moveSlide').and.callThrough();
                var slider = new simpleSlider();
                slider.next.click();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(1);
                slider.next.click();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(0);
            });
        });

        describe('moveSlide', function() {
            it('should call removeCurrent and addCurrent', function() {
                spyOn(simpleSlider.prototype, 'removeCurrent').and.callThrough();
                spyOn(simpleSlider.prototype, 'addCurrent').and.callThrough();
                var slide = new simpleSlider();
                slide.moveSlide(1);
                expect(slide.current).toBe(1);
                expect(simpleSlider.prototype.removeCurrent).toHaveBeenCalled();
                expect(simpleSlider.prototype.addCurrent).toHaveBeenCalled();
            });
        });

        describe('removeCurrent', function() {
            it('should remove current class', function() {
                var slide = new simpleSlider();
                slide.removeCurrent();
                for (var i = 0; i < slide.total; i++) {
                    expect(slide.slides[i].classList.contains('simpleSlide-current')).toBe(false);
                    expect(slide.links[i].classList.contains('simpleSlide-current')).toBe(false);
                }
            });
        });

        describe('addCurrent', function() {
            it('should add current class', function() {
                var slide = new simpleSlider();
                slide.addCurrent();
                for (var i = 0; i < slide.total; i++) {
                    if (i === slide.current) {
                        expect(slide.slides[i].classList.contains('simpleSlide-current')).toBe(true);
                        expect(slide.links[i].classList.contains('simpleSlide-current')).toBe(true);
                    } else {
                        expect(slide.slides[i].classList.contains('simpleSlide-current')).toBe(false);
                        expect(slide.links[i].classList.contains('simpleSlide-current')).toBe(false);
                    }
                }
            });
        });

        describe('handleTouch', function() { //current phantom doesnt support touch
            it('should call swipe', function() {
                spyOn(simpleSlider.prototype, 'swipeRight').and.callThrough();
                spyOn(simpleSlider.prototype, 'swipeLeft').and.callThrough();

                var slide = new simpleSlider();
                var touchstart = document.createEvent('Event');
                var touchend = document.createEvent('Event');

                touchstart.initEvent('touchstart', true, true);
                touchend.initEvent('touchend', true, true);

                touchstart.touches =[{screenX: 0, screenY: 0}];
                touchend.touches =[{screenX: 60, screenY: 10}];

                slide.wrapper.dispatchEvent(touchstart);
                 slide.wrapper.dispatchEvent(touchend);
                 expect(simpleSlider.prototype.swipeRight).toHaveBeenCalled();
            });
        });

        describe('swipeLeft', function() {
            it('should call moveSlide(-1)', function() {
                spyOn(simpleSlider.prototype, 'moveSlide').and.callThrough();
                var slide = new simpleSlider();
                var index = slide.current;
                slide.swipeRight();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(index - 1);
            });
        });

        describe('swipeRight', function() {
            it('should call moveSlide(+1)', function() {
                spyOn(simpleSlider.prototype, 'moveSlide').and.callThrough();
                var slide = new simpleSlider();
                var index = slide.current;
                slide.swipeLeft();
                expect(simpleSlider.prototype.moveSlide).toHaveBeenCalledWith(index + 1);
            });
        });

    });
});
