jQuery iOS no-click-delay
=========================

This jQuery plugin removes the click delay from iOS webviews. Normally iOS defers the click event until 300ms has
elapsed, to allow the user to trigger a zoom event with a double-tap. On views that don't support zooming, this
causes a much longer delay than is necessary.

This is a drop-in solution: the code dispatches native click events to the elements in question, allowing onclick
handlers to work 'as expected'.

Usage
-----

Just include the script and decorate your no-click-delay elements with a "button" class. That's it:

    <script src="jquery.noclickdelay.js"></script>

    <a onclick="blah()" href="javascript:;" class="button">Click me!</a>

Notes
-----

The script disables the default webkit highlight on elements that are tapped, as this highlight suffers from the
300ms delay. Instead, the script adds a "pressed" class to elements that the user taps. You can use this to offer your own active
state UI.
