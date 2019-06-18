(($) => {
    'use strict';

    // Bind to resize event
    const onResize = () => {
        // Make body flush with top of viewport
        $(document.body)
            .css('marginTop', 0)
            .css('marginTop', $(document.body).outerHeight() - $(document.documentElement).outerHeight());

        $('.info')
            // Position info divs directly below main content
            .css('left', parseFloat($(document.body).css('paddingLeft')) + parseFloat($('.content').css('marginLeft')))
            .css('top', parseFloat($(document.body).css('paddingTop')) + parseFloat($('.content').css('marginTop')))
            .css('marginTop', $('.content').outerHeight())
            .each(function () {
                if ($(this).data('shown')) {
                    $(this)
                        .show()
                        .css('marginTop', 0)
                        .find('.back')
                        .css('lineHeight', $('.info > h2').css('lineHeight'));
                }
            });

        // Position footer at bottom of content
        $('.footer').each(function () {
            $(this).css('top', $('.content').outerHeight() - $(this).height() - parseFloat($('.content').css('paddingBottom')));
        });
    };
    onResize();
    $(window).resize(onResize);

    const deltaHeight = '1vh';
    $('.item')
        // Increase grid item height on hover
        .hover(function () {
            $(this).animate({height: '+=' + deltaHeight}, 200);
        }, function () {
            $(this).animate({height: '-=' + deltaHeight}, 200);
        })
        // Display info on click
        .click(function () {
            $(this).next()
                .fadeIn(200)
                .animate({marginTop: '0'}, {
                    duration: 400,
                    queue: false
                })
                .data('shown', true);
        });

    $('.back')
        .css('lineHeight', $('.info > h2').css('lineHeight'))
        .click(function () {
            $(this).parent()
                .removeData('shown')
                .animate({marginTop: $('.content').outerHeight() + 'px'}, 400)
                .fadeOut({
                    duration: 200,
                    queue: false
                });
        });
})(jQuery);
