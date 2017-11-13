(function () {
    //variables
    var body = jQuery('html, body'),
        portfolio = jQuery('#portfolio_popup');

    jQuery('.phone input').inputmask({
        mask: '+7 (999) 999-99-99',
        clearMaskOnLostFocus: false
    });

    /*
     |-----------------------------------------------------------
     |   carousel
     |-----------------------------------------------------------
     */
    $("#slider_slogans").owlCarousel({
        navigation : true,
        navigationText: ['',''],
        //slideSpeed : 5000,
        //paginationSpeed : 5000,
        //transitionStyle : "fade",
        //autoPlay: true,
        items: 1,
        itemsTablet: [768,1],
        itemsDesktopSmall: [979,1],
        itemsDesktop: [1199,1],
        itemsMobile: [479,1],
        pagination: false
    });
    $("#guestbook_carousel-items").owlCarousel({
        navigation : true,
        navigationText: ['',''],
        items: 1,
        itemsTablet: [768,1],
        itemsDesktopSmall: [979,1],
        itemsDesktop: [1199,1],
        itemsMobile: [479,1],
        pagination: false
    });
    $("#portfolio").owlCarousel({
        navigation : true,
        navigationText: ['',''],
        items: 3,
        itemsTablet: [768,2],
        itemsDesktopSmall: [979,3],
        itemsDesktop: [1199,3],
        itemsMobile: [479,1],
        pagination: false
    });

    /*
     |-----------------------------------------------------------
     |   up scroll document
     |-----------------------------------------------------------
     */
    jQuery('.contacts_box').on('click', '.icon_up', function () {
        return body.animate({scrollTop:0}, 'slow');
    });

    /*
     |-----------------------------------------------------------
     |   mobile menu
     |-----------------------------------------------------------
     */
    var menu = jQuery('#navbar'),
        menuBtn = jQuery('.navbar-toggle'),
        socialPanel = jQuery('.header_contacts-mobile'),
        iconShare = jQuery('.icon_share'),
        socialMenu = jQuery('.socials_mobile');
    menuBtn.on('click', function () {
        if(socialMenu.hasClass('on')){
            socialMenu.removeClass('on');
            iconShare.removeClass('on');
            body.removeClass('hide_overflow');
        }
        body.toggleClass('hide_overflow');
        return menu.toggleClass('on') && jQuery(this).toggleClass('on');
    });
    socialPanel.on('click', '.icon_share', function () {
        if(menu.hasClass('on')){
            menu.removeClass('on');
            menuBtn.removeClass('on');
            body.removeClass('hide_overflow');
        }
        body.toggleClass('hide_overflow');
        return socialMenu.toggleClass('on') && jQuery(this).toggleClass('on');
    });
    jQuery('.icon_phone, .icon_envelope').on('click', function () {
        socialMenu.removeClass('on');
        iconShare.removeClass('on');
        menu.removeClass('on');
        menuBtn.removeClass('on');
        return body.removeClass('hide_overflow');
    });

    var fancyBtn = jQuery(".fancy_call-btn"),
        orderService = jQuery('#order_service');
    fancyBtn.fancybox({
        'padding': 0,
        'opacity': true,
        'centerOnScroll': true,
        'scrolling' : 'no',
        helpers : {
            overlay : {
                closeClick: false,
                locked: false
            }
        },
        'afterClose': function () {
            return jQuery('.form_box form input, .form_box form textarea').val('') && jQuery('.form-group .help-block').text('');
        }
    });
    fancyBtn.on('click', function () {
        var _this = jQuery(this),
            serviceName = _this.attr('data-service').trim();
        if(serviceName){
            return orderService.find('.service_name').text(serviceName) && orderService.find('#orderform-service').val(serviceName);
        }
        return true;
    });

    jQuery(".portfolio_slider").on('click', '.btn_view', function (e) {
        e.preventDefault();
        var _this = jQuery(this);
        jQuery.ajax({
            type: "POST",
            dataType: "html",
            url: _this.attr('data-link'),
            success: function (data) {
                return portfolio.html(data) && jQuery.fancybox.open(jQuery('#portfolio_popup'),{
                    'padding': 0,
                    'opacity': true,
                    'centerOnScroll': true,
                    'scrolling' : 'no',
                    helpers : {
                        overlay : {
                            closeClick: false,
                            locked: false
                        }
                    }
                }) && runPortfolioSlider();
            }
        });
    });

    sendAjaxForm('#write-message-form');
    sendAjaxForm('#recall-form');
    sendAjaxForm('#order-form');

})();

function sendAjaxForm(selector){
    jQuery(document).on("submit", selector, function(e){
        e.preventDefault();
        var _this = jQuery(this);
        var url = _this.attr('action');
        var data = _this.serialize();

        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: data,
            success: function (data) {
                var alert = _this.find('.alert');
                alert.removeClass('alert-danger alert-success')
                    .addClass('alert-' + data.status)
                    .show()
                    .html(data.message);

                if (data.status == 'success') {
                    setTimeout("$.fancybox.close()", 5000);
                    setTimeout(function() { alert.hide() }, 5000);
                    return _this.trigger('reset');
                }
            }
        });
    });
}

function runPortfolioSlider() {
    return jQuery(".portfolio_popup-carousel").owlCarousel({
        navigation : true,
        navigationText: ['',''],
        items: 1,
        itemsTablet: [768,1],
        itemsDesktopSmall: [979,1],
        itemsDesktop: [1199,1],
        itemsMobile: [479,1],
        pagination: false
    });
}