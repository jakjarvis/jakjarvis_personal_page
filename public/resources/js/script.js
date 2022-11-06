$(document).ready(function () {

    /* For the sticky navigation */

    /* Scroll on button */

    $('.js--scroll-to-start').click(function () {
        $('html, body').animate({ scrollTop: $('.js--section-about').offset().top }, 1000);
    });

    /* navigation scroll*/
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $(".qualifications ul a").hover(function () {
        $("#institute").removeClass().addClass($(this).attr('rel'));
        $("#certificate").removeClass().addClass($(this).attr('rel'));
        $("#description").removeClass().addClass($(this).attr('rel'));
    });

    /* Sticky nav */

    const sectionSplash = document.querySelector(".section-splash");

    const obs = new IntersectionObserver(
        function (entries) {
            const ent = entries[0];
            console.log(ent);
            if (ent.isIntersecting === false) {
                document.querySelector('.header').classList.add('sticky');
                sectionSplash.classList.add('sticky');
            }
            if (ent.isIntersecting === true) {
                document.querySelector('.header').classList.remove('sticky');
                sectionSplash.classList.remove('sticky');
            }
        }, {
        // Looking inside the viewport
        root: null,
        // When 0% of the section is in the viewport
        threshold: 0,
        rootMargin: "-5px"
    });
    obs.observe(sectionSplash);

    /* Mobile nav */

    const navBtn = document.querySelector('.mobile-nav-icon');
    const mainNav = document.querySelector('.main-nav');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    navBtn.addEventListener('click', function () {
        mainNav.classList.toggle('nav-open');
        openIcon.classList.toggle('nav-open');
        closeIcon.classList.toggle('nav-open');
    })

    /* Interests hovers */

    $(".js--fly-icon").hover(function () {
        $('.interest-text').append($("<span>I have enjoyed my pilots license since 2006 and flown hundreds of hours over three continents.</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

    $(".js--code-icon").hover(function () {
        $('.interest-text').append($("<span>Check out my github for all my Python and html projects!</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

    $(".js--stem-icon").hover(function () {
        $('.interest-text').append($("<span>Interviewer and mentor for the Arkwright Scholarship Trust.</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

    $(".js--tool-icon").hover(function () {
        $('.interest-text').append($("<span>Owning a 1971 VW beetle and a Motorbike, you need to know how to fix everything!</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

    $(".js--music-icon").hover(function () {
        $('.interest-text').append($("<span>Usually playing bass or piano in a Jazz band.</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

    $(".js--hurl-icon").hover(function () {
        $('.interest-text').append($("<span>Team and committee member for Berlin Setanta GAA.</span>"));
    }, function () {
        $('.interest-text').find("span").last().remove();
    });

});