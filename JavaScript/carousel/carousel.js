export default function createCarousel() {
    let currentPicture = $('.carousel-item.current');
    const enlargedPicture = $('img.enlarged');
    initialize();
    
    function initialize(){
        const pictures = $('.carousel-container > .carousel-item');
        // setting CSS variable depending on screen size
        setCarouselVariables();
        $(window).resize(setCarouselVariables);
        $('.carousel-container > .carousel-button').click(toggleNextPicture);
        pictures.click(showPopup);
        // updating image in the popup
        enlargedPicture.attr('src', currentPicture[0].currentSrc);
        $('.popup-close-button').click(closePopup);
        // hiding unnecessary elements
        pictures.slice(1, pictures.length).hide();
        $('.overlay-wrapper').hide();
    }

    // function to set CSS variables
    function setCarouselVariables() {
        const viewportWidth = $(window).width() ;
        const carouselWidth = viewportWidth > 600 ? '500px' : '85vw';
        document.documentElement.style.setProperty('--carousel-width', carouselWidth);
    
        const viewportHeight = $(window).height();
        const carouselHeight = viewportHeight > 500 ? '375px' : '85vh';
        document.documentElement.style.setProperty('--carousel-height', carouselHeight);
    
        const carouselButtonLength = (viewportWidth > 600 && viewportHeight > 500) ? '45px' : '35px';
        document.documentElement.style.setProperty('--carousel-button-length', carouselButtonLength);
    
        const enlargedWidth = '85vw';
        document.documentElement.style.setProperty('--enlarge-width', enlargedWidth);
        const enlargedHeight = '85vh';
        document.documentElement.style.setProperty('--enlarge-height', enlargedHeight);
    }

    function toggleNextPicture(event) {
        const clickedButtonId = event.target.id;
        let nextPicture;
        if(clickedButtonId === 'iconArrowNext') {
            nextPicture = currentPicture.next();
            // if true it is the last picture.
            if(nextPicture.attr('id') === clickedButtonId) {
                nextPicture = $('.carousel-container > .carousel-item').first();
            }
        } else {
            nextPicture = currentPicture.prev();
            // if true it is the first picture.
            if(nextPicture.attr('id') === clickedButtonId) {
                nextPicture = $('.carousel-container > .carousel-item').last();
            }
        }
        currentPicture.removeClass('current');
        currentPicture.hide();
        currentPicture = nextPicture;
        currentPicture.show();
        enlargedPicture.attr('src', currentPicture[0].currentSrc);
        currentPicture.addClass('current');
        updateIndexMarker();
    }

    function showPopup(){
        // removing margin to cover full screen
        $('.overlay-wrapper').css('transform', `translateY(-${$('main').css('margin-top')})`)
        // lock the main screen when popup is shown
        $('html, body').css({
            overflow: 'hidden',height: '100%'
        });
        $('.overlay-wrapper').addClass('overlay');
        // Setting event listener for esc key
        $(document).on('keydown', escKeyHandler);
        $('.overlay-wrapper').show();
    }

    // function on esc key. Only available when popup is active.
    function escKeyHandler(event){
        event.preventDefault();
        if (event.key == 'Escape'){
            closePopup();
        }
    }

    function closePopup() {
        // removing key listener
        $(document).off('keydown', escKeyHandler);
        // activate scroll bar
        $('html, body').css({
            overflow: 'auto',height: 'auto'
        });
        $('.overlay-wrapper').hide();
    }

    // function to switch index marker
    function updateIndexMarker() {
        const activeMarker = $('.active-marker');
        /* \u25A1 is a white square */
        activeMarker.text('\u25A1');
        activeMarker.removeClass('active-marker');
        /* Add 1 because nth child starts from 1 */
        const currentPosition = $('img.carousel-item').index($('img.carousel-item.current')) + 1;
        const targetMarker = $(`.index-markers > span:nth-of-type(${currentPosition})`);
        /* \u25A0 is a black square */
        targetMarker.text('\u25A0');
        targetMarker.addClass('active-marker');
    }
}