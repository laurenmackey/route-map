var main = function () {

    $('#southAmericaArrow polygon').click(function() {
        $('.southAmericaMap').addClass('fadeOut');
        $('.southAmericaMap').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
            function(e){
                $('.southAmericaMap').css('display', 'none');
                $('.centralAmericaMap').addClass('fadeIn');
            });
        $('.centralAmericaMap').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
            function(e){
                console.log('Map Two finished transitioning');
            });
    });
};

$(document).ready(main);