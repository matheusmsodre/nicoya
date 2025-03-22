$(function($) {
    // ACCORDION
    $(document).ready(function() {
        $('#accordion .acc-head').on('click', f_acc);
    });

    function f_acc() {
        $('#accordion .acc-body').not($(this).next()).slideUp(500);
        $('#accordion .acc-head').not($(this)).removeClass('active');

        $(this).next().slideToggle(1000);
        $(this).toggleClass('active');
    }

    // ACCORDION END


    $(document).on("click", '.popup-show', function() {

        $('.popup-wrap_3').addClass('active');

    });

    $(document).on("click", '.popup-wrap_3 .popup-window-no a', function() {

        $('.popup-wrap_3').removeClass('active');
        $('.popup-wrap_1').addClass('active');

    });

    $(document).on("click", '.popup-wrap_1 .popup-window-no a', function() {

        $('.popup-wrap_1').removeClass('active');

    });

    // ONE POPUP

    $(document).on("click", '.popup-show_1', function() {

        $('.popup-wrap_1').addClass('active');

    });

    $(document).on("click", '.popup-window-close, .popup-scroll__btn a', function() {
        $(this).parents('.popup-wrap').removeClass('active');
        $('.countdown4').empty();
        saveData('exitShown', 0, 24 * 60);
    });

    $(window).on('beforeunload', function() {
        saveData('exitShown', 0, 24 * 60);
    });

});