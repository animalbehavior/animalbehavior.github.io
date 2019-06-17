(($) => {
    'use strict';

    // Bind to resize event
    const onResize = () => {
        // Make body flush with top of viewport
        $(document.body).css('marginTop', 0).css('marginTop', $(document.body).outerHeight() - $(document.documentElement).outerHeight());

        // Position info divs at position of main content
        $('.info').css('left', parseFloat($(document.body).css('paddingLeft')) + parseFloat($('.content').css('marginLeft')))
            .css('top', parseFloat($(document.body).css('paddingTop')) + parseFloat($('.content').css('marginTop')));
    };
    onResize();
    $(window).resize(onResize);

    // Increase grid item height on hover
    const deltaHeight = '1vh';
    $('.item').hover(function () {
        $(this).animate({
            height: '+=' + deltaHeight,
            lineHeight: '+=' + deltaHeight
        }, 200);
    }, function () {
        $(this).animate({
            height: '-=' + deltaHeight,
            lineHeight: '-=' + deltaHeight
        }, 200);
    });
})(jQuery);
