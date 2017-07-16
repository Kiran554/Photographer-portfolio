var MOBILE_BREAKPOINT = 768;
var SCROLL_SPEED = 500;

var Gallery = {
	is_ie8: $('html').hasClass('ie8'),
    current: null,
    assets: null,
    assets_center: null,
    images_and_captions: [], // used by Gallery.cache_assets_dom_elements()
    videos_and_captions: [], // used by Gallery.cache_assets_dom_elements()

    ie8_hacks: function() {
        $('#content .asset').height($(window).height());
        $('.js_gallery_navigation').hide();
    },

    init: function() {
		Gallery.assets = $('#content .asset');
		Gallery.assets_center = $('#content .asset_center')
        // set current from hash
        var current_item = $('#content .asset' + document.location.hash);
        Gallery.current = (current_item.length ? current_item : $('#no1'));

        // 300ms is enough time for css animations from Gallery.size_assets
        // to finish.
        setTimeout(function() {
            $('#content').removeClass('is_loading');
        }, 400);

        this.init_keyboard();

        this.listen_to_scroll();

        // clicking current images moves to next item
        $('#content').on('click', 'a.asset_image_container', function() {
            Gallery.move("next");
            return false;
        });

        // thumbnail bar
        $('.gallery_thumbs').on("click", "a", function(ev) {
            ev.preventDefault();
            Gallery.goTo($(this).attr('href'));
            Thumbs.goTo($(this).parent('li'));
        });

        // gallery nav arrows
        $('.js_gallery_navigation').on('click', 'button', function() {
            var direction = $(this).data('action');
            Gallery.move(direction);
        });

        $(window).on('resize', debounce(function() {
            Gallery.size_assets();
            Gallery.center_image();
            Thumbs.goToCurrent();
            if ($('html').hasClass('ipad')) {
                Thumbs.goTo(parseInt(document.location.hash.replace('#no', ''), 10));
            }
        }, 200));
    },

    init_keyboard: function() {
        Mousetrap.bind(['down', 'right', 'space'], function() {
            Gallery.move('next');
            return false;
        });

        Mousetrap.bind(['up', 'left'], function() {
            Gallery.move('prev');
            return false;
        });
    },

    // Accepts "next" or "prev"
    // this coincides to jquery's .next() and .prev() methods
    move: function(direction) {
        var new_target = Gallery.current[direction]();
        if (!new_target.length) return false;
        this.goTo(new_target[0]);
    },

    // accepts #id_name as string argument
    // also used behind the scenes by "Gallery.move" function
    goTo: function(id) {
        // you can pass an object, or an id
        var item = $(id);
        $.waypoints('disable'); // disable waypoints while we animate
        this.set_current(item);

        if (!this.is_ie8) {
            window.smoothScroll(Gallery.current[0], SCROLL_SPEED, function() {
                location.replace("#" + Gallery.current[0].id);
            });
        } else {
            location.replace("#" + Gallery.current[0].id);
        }

        Thumbs.goTo(Number(item[0].id.replace('no', '')));
        // Then enable waypoints after scroll ends
        setTimeout($.waypoints.bind(null, 'enable'), SCROLL_SPEED);
    },

    cache_assets_dom_elements: function() {
        // setup images_and_captions and videos_and_captions
        // so that they are cached, and not calculated every time
        $('#content .asset.image').each(function() {
            Gallery.images_and_captions.push({
                asset: $(this).find('img'),
                caption: $(this).find('.asset_caption')
            });
        });
        $('#content .asset.video').each(function() {
            Gallery.videos_and_captions.push({
                asset: $(this).find('.video_wrapper'),
                caption: $(this).find('.asset_caption')
            });
        });
    },

    size_assets: function() {
    	var Menu = document.getElementsByClassName('header')[0];
        var max_height = Number($(window).height()) - Number(Menu.offsetHeight);
        $.each(Gallery.images_and_captions, function(index) {
            var item_max_height = parseInt((max_height - this.caption.height()) * 0.8, 10);
            this.asset.css('max-height', item_max_height + "px");
        });

        $.each(Gallery.videos_and_captions, function(index) {
            var item_max_height = parseInt((max_height - this.caption.height()) * 0.8, 10);
            var calculated_max_width = item_max_height * Number(this.asset.data('video-ratio'));
            this.asset.css("max-width", calculated_max_width + 'px');
        });
    },

    listen_to_scroll: function() {
        // two waypoints: one for going up, and one for down,
        // because we want to trigger them at different offsets
        Gallery.assets
            .waypoint({
                continuous: false,
                offset: '40%',
                handler: function(direction) {
                    if (direction === 'up') return false;
                    var el = parseInt(this.id.replace('no', ''), 10);
                    Gallery.set_current(this);
                    Thumbs.goToCurrent();
                }
            })
            .waypoint({
                continuous: false,
                offset: function() {
                    var window_height = $.waypoints('viewportHeight');
                    return window_height - $(this).outerHeight() * 1.4;
                },
                handler: function(direction) {
                    if (direction === 'down') return false;
                    var el = parseInt(this.id.replace('no', ''), 10);
                    Gallery.set_current(this);
                    Thumbs.goToCurrent();
                }
            });
    },

    set_current: function(item) {
        this.current = $(item);
    },

    center_image: function() {
        if (!Gallery.current.length) return false;
        if (this.is_ie8) return false;
        if (!$('html').hasClass('ipad')) {
            window.smoothScroll(Gallery.current[0], SCROLL_SPEED, function() {
                location.replace("#" + Gallery.current[0].id);
            });
        }
    },

    set_pinning: function(ele) {
        $('img[nopin=""]').attr('nopin', 'true');
        ele.find('img').attr('nopin', '');
    }
}

// -------------------------------------------

var Thumbs = {
}

Thumbs.init = function() {
	$.extend(true, Thumbs, {
	    elements: $('.gallery_thumbs li'),
	    container: $('.gallery_thumbs'),
	    is_animating: false
		}
	);
    this.goToCurrent();
    // 500ms = enough time for the thumbs bar scroll animation to finish
    setTimeout(function() {
        Thumbs.container.removeClass('is_loading');
    }, 600);
};

Thumbs.goTo = debounce(function(index) {
    // you can pass an object, or an id
    if (typeof index == 'object' && index !== null) {
        var target = index
    } else if (typeof index == 'number' || index % 1 == 0) {
        var target = this.elements.eq(index - 1)
    } else {
        throw 'Error: Thumbs.goTo() expects an integer'
    }

    if (!target.length) return false; // guard just in case target doesn't exist.

    var window_height = $.waypoints('viewportHeight');

    var center_screen = window_height / 2 - target.height() / 2;
    var new_target_position = target.offset().top - Thumbs.container.offset().top + Thumbs.container.scrollTop();
    var new_scroll_postion =   new_target_position - Thumbs.container.height()/2 - 10;
    
    Thumbs.container.animate({
	        scrollTop: new_scroll_postion
	    }, 500);

    this.elements.removeClass('is_selected');
    target.addClass('is_selected');
}, 300);

Thumbs.goToCurrent = function() {
    var id = parseInt(Gallery.current[0].id.replace('no', ''), 10);
    Thumbs.goTo(id);
};

global.Gallery = Gallery;
global.Thumbs = Thumbs;