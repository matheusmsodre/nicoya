$(function($) {

    //BURGER
    var clickDelay = 500,
        clickDelayTimer = null;

    $('.burger-click-region').on('click', function() {

        if (clickDelayTimer === null) {

            var $burger = $(this);
            $burger.toggleClass('active');
            $burger.parent().toggleClass('is-open');
            $('.header__nav').toggleClass('active');

            if (!$burger.hasClass('active')) {
                $burger.addClass('closing');
            }

            clickDelayTimer = setTimeout(function() {
                $burger.removeClass('closing');
                clearTimeout(clickDelayTimer);
                clickDelayTimer = null;
            }, clickDelay);
        }
    });


    $(document).on("click", '.header__nav ul li a', function() {

        var $burger = $('.burger-click-region');

        $('.header__nav').removeClass('active');
        $burger.removeClass('active');
        $burger.parent().removeClass('is-open');

    });

    (function($) {}(jQuery));

    function Anchor(active) {
        function AnchorHref() {
            var anchor = $(this.hash);
            $("html, body").animate({
                scrollTop: anchor.offset().top
            }, 500);
        }
        $("a.anchors").click(AnchorHref);
    }
    Anchor(true);

});