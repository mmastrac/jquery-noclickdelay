jQuery iOS no-click-delay
=========================

This jQuery plugin removes the click delay from iOS webviews. Normally iOS defers the click event until 300ms has 
elapsed, to allow the user to trigger a zoom event with a double-tap. On views that don't support zooming, this
causes a much longer delay than is necessary.

Usage
-----

Just include the script. That's it:

    <script src="jquery-noclickdelay.js"></script>