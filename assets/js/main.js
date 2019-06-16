(() => {
    'use strict';

    // Make body flush with top of viewport
    window.onresize = () => {
        document.body.style.marginTop = 0;
        document.body.style.marginTop = document.body.scrollHeight - document.documentElement.scrollHeight + 'px';
    };

    window.onresize();
})();
