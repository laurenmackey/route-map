var main = function () {

    $('#Arrow polygon').click(function() {
        $('.Map').addClass('fadeOut');
        $('.Map').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
            function(e){
                $('.Map').css('display', 'none');
                console.log('Map One finished transitioning')
                //$('.mapTwo').css('display', 'inline');
                console.log('Map Two is inline');
                $('.mapTwo').addClass('fadeIn');
                console.log('Map Two has fadeIn');
            });
        $('.mapTwo').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
            function(e){
                console.log('Map Two finished transitioning');
            });
    });
};

$(document).ready(main);

// Need to fix: transition not working for fade in - maybe display inline is messing it up?