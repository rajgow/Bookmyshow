    var home = {
        handleMenu : function() {
            $("#toolbar").on('click', function() {
                $(window).width() < 768 ? $("#container").toggleClass('hide-menu') : $("body").toggleClass("short-menu");
            });
        },
        handleResponsiveMenu : function() {
            if( $(window).width() < 768 ) {
                $("body").addClass("short-menu");
                $("#container").addClass('hide-menu');
            } else {
                $("#container").removeClass('hide-menu');
            }
        },
        init : function() {
            home.handleMenu();
            home.handleResponsiveMenu();
            $(window).resize(home.handleResponsiveMenu);
        }
    }
    $(document).ready(function() {
        home.init();
    });
//        PUT https://HnUsOaemBuSD01Qd302yK7mmflVZsrQqOxjJwETp:javascript-key=n73GZ8eKGGFmOJetb9rBm4QBvpPHEZMdwmQr3ApF@api.parse.com/1/classes/abcbank/fkLoqTgdAV
//
//        POST https://HnUsOaemBuSD01Qd302yK7mmflVZsrQqOxjJwETp:javascript-key=n73GZ8eKGGFmOJetb9rBm4QBvpPHEZMdwmQr3ApF@api.parse.com/1/classes/abcbank
//
//        GET https://HnUsOaemBuSD01Qd302yK7mmflVZsrQqOxjJwETp:javascript-key=n73GZ8eKGGFmOJetb9rBm4QBvpPHEZMdwmQr3ApF@api.parse.com/1/classes/abcbank/fkLoqTgdAV