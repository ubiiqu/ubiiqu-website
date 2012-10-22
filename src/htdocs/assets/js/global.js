$(document).ready(function() {

	var deviceType = device.type();
	if(deviceType == 'desktop') {

		content.setSectionSize();
		setTimeout(function() {content.setContentOffset();}, 1000);

	} else if(deviceType == 'tablet') {

		content.setSectionSize();
		setTimeout(function() {content.setContentOffset();}, 1000);

	} else if(deviceType == 'mobile') {
		// add different script

	}

	content.setBodyHeight();
	content.setBodyWidth();
	content.scroll(0);
	content.box();
	user.actions();

});

var device = {

	getWindowHeight: function() {
		var h = $(window).innerHeight();
		return(h);
	},

	getWindowWidth: function() {
		var w = $(window).innerWidth();
		return(w);
	},

	getMediaQuery: function() {
		return window.getComputedStyle(document.body,':after').getPropertyValue('content');
	},

	type: function() {
		var w = device.getWindowWidth();
		var h = device.getWindowHeight();
		if(w <= 640) {
			var type = 'mobile';
		} else if(w >= 641 && w <= 1024) {
			var type = 'tablet';
		} else if(h <= 767) {
			var type = 'mobile';
		} else {
			var type = 'desktop';
		}
		return type;
	}

}


var content = {

	setBodyHeight: function() {
		var h = device.getWindowHeight();
		var sectionNum = content.countSections();
		var bodyHeight = (h * sectionNum) + 'px';
		$('body').height(bodyHeight);
	},

	setBodyWidth: function() {
		var bodyWidth = device.getWindowWidth() + 'px';
		$('body').width(bodyWidth);
		$('body').css('overflow-x','hidden');
	},

	getSectionSize: function() {
		var h = device.getWindowHeight();
		var secHeight = (h - 42);
		return(secHeight);
	},

	setSectionSize: function() {
		var secHeight = content.getSectionSize();
		$('section').css('height', secHeight + 'px');
	},

	setContentOffset: function() {
		$('section > .inner').each(function() {
			var secHeight = content.getSectionSize();
			var contentHeight = $(this).innerHeight();
			var contentTop = ((secHeight - contentHeight) / 2) + 'px';
			$(this).css('top', contentTop);
		});
	},

	countSections: function() {
		var num = $('.section').size();
		return(num);
	},

	getCurrentSection: function() {
		var pos = content.getPosition();
		var sec = content.getSectionSize();
		if(pos < (1 * sec)) {
			var cur = 0;
		} else if(pos >= (1 * sec) && pos < (2 * sec)) {
			var cur = 1;
		} else if(pos >= (2 * sec) && pos < (3 * sec)) {
			var cur = 2;
		} else if(pos >= (3 * sec) && pos < (4 * sec)) {
			var cur = 3;
		} else if(pos >= (4 * sec) && pos < (5 * sec)) {
			var cur = 4;
		} else if(pos >= (5 * sec) && pos < (6 * sec)) {
			var cur = 5;
		} else if(pos >= (6 * sec) && pos < (7 * sec)) {
			var cur = 6;
		} else if(pos >= (7 * sec) && pos < (8 * sec)) {
			var cur = 7;
		} else if(pos >= (8 * sec) && pos < (9 * sec)) {
			var cur = 8;
		}
		return(cur);
	},

	getPosition: function() {
		var top = $(window).scrollTop();
		return(top);
	},

	scroll: function(val) {
		var h = device.getWindowHeight();
		var scrollPosition = parseInt((val * (h)), 10);
		$(window).scrollTop(scrollPosition);
	},

	box: function() {

		var $box = $('#box')
		, $indicators = $('.goto-slide')
		, $effects = $('.effect')
		, $timeIndicator = $('#time-indicator')
		, slideInterval = 5000;

		var switchIndicator = function ($c, $n, currIndex, nextIndex) {
			$timeIndicator.stop().css('width', 0);
			$indicators.removeClass('current').eq(nextIndex).addClass('current');
		};

		var startTimeIndicator = function () {
			$timeIndicator.animate({width: '680px'}, slideInterval);
		};

		$box.boxSlider({
			speed: 1000
			, autoScroll: true
			, timeout: slideInterval
			, next: '#next'
			, prev: '#prev'
			, pause: '#pause'
			, effect: 'scrollHorz3d'
			, blindCount: 25
			, onbefore: switchIndicator
			, onafter: startTimeIndicator
		});

		startTimeIndicator();

		$('#controls').on('click', '.goto-slide', function (ev) {
			$box.boxSlider('showSlide', $(this).data('slideindex'));
			ev.preventDefault();
		});

	},

}

var user = {

	actions: function() {

		$(window).on('resize', function() {
			content.setBodyHeight();
			content.setBodyWidth();
			content.setSectionSize();
			content.setContentOffset();
		});

		$('header ul li a').on('click', function() {
			var section = parseInt(this.id, 10);
			var size = content.getSectionSize();
			var distance = section * size;
			$(window).scrollTop(distance);
		});

		$('#team menu a').on('click', function() {
			var target = '#toggle-' + this.title;
			$('#toggle-philipp, #toggle-manuel, #toggle-igor').fadeOut('fast');
			$(target).fadeIn('slow');
		});

		$('#a-terms').on('click', function() {
			$('#contents').removeClass('original');
			$('#contents').addClass('zoomout');
			$('#terms').fadeToggle('slow');
		});

		$('#a-imprint').on('click', function() {
			$('#contents').removeClass('original');
			$('#contents').addClass('zoomout');
			$('#imprint').fadeToggle('slow');
		});

		$('aside > button').on('click', function() {
			$('#terms, #imprint').fadeOut('slow');
			$('#contents').removeClass('zoomout');
			$('#contents').addClass('original');
		});

	}

}