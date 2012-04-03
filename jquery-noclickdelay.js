(function() {

// This code is only for iOS
if (!window.navigator.userAgent.match(/(iPhone|iPad|iPod)/))
	return;

var clicksEaten = [];
var CONFIG = { TOUCH_MOVE_THRESHHOLD: 10, GHOST_CLICK_THRESHOLD: 25, PRESSED_CLASS: "pressed" }

function withinDistance(x1, y1, x2, y2, distance) {
	return Math.abs(x1 - x2) < distance && Math.abs(y1 - y2) < distance;
}

$(document).on('click', function(e) {
	for (var i = 0; i < clicksEaten.length; i++) {
		if (withinDistance(event.clientX, event.clientY, clicksEaten[i][0], clicksEaten[i][1], 
			CONFIG.GHOST_CLICK_THRESHOLD)) { 
			e.stopPropagation();
			e.preventDefault();
		}
	}
});

$(document).on('touchstart', '.button', function(e) {
	var elem = $(this);

	// Disable the webkit tap highlight, since it is no longer accurate
	elem.css('webkitTapHighlightColor', 'rgba(0,0,0,0)');

	elem.addClass(CONFIG.PRESSED_CLASS);

	var touch = e.originalEvent.touches[0];
	var location = [touch.clientX, touch.clientY];
	this.__eventLocation = location;
	
	this.__onTouchMove = function(e) {
		var touch = e.originalEvent.touches[0];
		if (withinDistance(touch.clientX, touch.clientY, location[0], location[1], 
			CONFIG.TOUCH_MOVE_THRESHHOLD)) {
			elem.addClass(CONFIG.PRESSED_CLASS);
		} else {
			elem.removeClass(CONFIG.PRESSED_CLASS);
		}
	};
	
	$(document.body).on('touchmove', this.__onTouchMove);
});

$(document).on('touchcancel', '.button', function(e) {
	var elem = $(this);
	elem.removeClass(CONFIG.PRESSED_CLASS);
	$(document.body).off('touchmove', this.__onTouchMove);
});

$(document).on('touchend', '.button', function(e) {
	var elem = $(this);
	if (elem.hasClass(CONFIG.PRESSED_CLASS)) {
		elem.removeClass(CONFIG.PRESSED_CLASS);
		var location = this.__eventLocation;
		if (location) {
			if (!withinDistance(touch.clientX, touch.clientY, location[0], location[1], CONFIG.TOUCH_MOVE_THRESHHOLD))
				return;
			
			clicksEaten.push(location);
			
			// Eat the click events that WebKit generates for the next 2.5s
			window.setTimeout(function() {
				var i = clicksEaten.indexOf(location);
				if (i >= 0)
					clicksEaten.splice(i, 1);
			}, 2500);
			
			// Dispatch a fake click event
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.dispatchEvent(evt);
			
			// Don't process the default for this event to avoid WebKit stealing focus from a view we might be loading
			e.preventDefault();
		}
	}
	
	$(document.body).off('touchmove', this.__onTouchMove);
});

})()

