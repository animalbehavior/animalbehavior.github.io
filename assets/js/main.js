(($) => {
    'use strict';

    let recalcHeight = false;

    // Bind to resize event
    const onResize = () => {
        // Make body flush with top of viewport
        $(document.body)
            .css('marginTop', 0)
            .css('marginTop', $(document.body).outerHeight() - $(document.documentElement).outerHeight());

        // Call for recalculating grid item animation heights
        $('.item').css('height', '').removeData('heightened');
        recalcHeight = true;

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

        // Vertically center back button
        $('.back').css('lineHeight', $('.info > h2').css('lineHeight'))

        // Position footer at bottom of content
        $('.footer').each(function () {
            $(this).css('top', $('.content').outerHeight() - $(this).height() - parseFloat($('.content').css('paddingBottom')));
        });
    };
    onResize();
    $(window).resize(onResize);

    let minHeight, maxHeight;
    const maybeRecalcHeight = () => {
        if (recalcHeight) {
            minHeight = $('.item').filter(function () {
                return !$(this).data('heightened');
            }).height();
            maxHeight = minHeight + ($(window).height() / 100);
            recalcHeight = false;
        }
    };
    $('.item')
        // Increase grid item height on hover
        .hover(function () {
            maybeRecalcHeight();
            $(this).data('heightened', true);
            $(this).animate({height: maxHeight}, {
                duration: 200,
                queue: false
            });
        }, function () {
            maybeRecalcHeight();
            $(this).animate({height: minHeight}, {
                complete: function () {
                    $(this).removeData('heightened');
                },
                duration: 200,
                queue: false
            });
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

    // Show credits on click
    $('.footer > button').click(function () {
        $('.credits')
            .fadeIn(200)
            .animate({marginTop: '0'}, {
                duration: 400,
                queue: false
            })
            .data('shown', true);
    });

    // Go back to main content on click
    $('.back').click(function () {
        $(this).parent()
            .removeData('shown')
            .animate({marginTop: $('.content').outerHeight() + 'px'}, 400)
            .fadeOut({
                duration: 200,
                queue: false
            });
    });
})(jQuery);
