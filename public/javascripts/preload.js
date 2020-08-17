(function($) {

    "use strict";

    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if($('.preloader').length){
            $('.preloader').delay(200).fadeOut(500);
        }
    }

    $(window).on('load', function() {
        handlePreloader();
        enableMasonry();
    });

    $('.image-large').magnificPopup({
        type: 'image'
    });

})(window.jQuery);