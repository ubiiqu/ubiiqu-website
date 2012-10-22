
(function(){

	var container = document.documentElement,
		popup = document.querySelector( '.popup' ),
		cover = document.querySelector( '.cover' ),
		currentState = null;

	container.className = container.className.replace( /\s+$/gi, '' ) + 'overlay-ready';

	// Deactivate on ESC
	function onDocumentKeyUp( event ) {
		if( event.keyCode === 27 ) {
			deactivate();
		}
	}

	// Deactivate on click outside
	function onDocumentClick( event ) {
		if( event.target === cover ) {
			deactivate();
		}
	}

	function activate( state ) {
		document.addEventListener( 'keyup', onDocumentKeyUp, false );
		document.addEventListener( 'click', onDocumentClick, false );

		removeClass( popup, currentState );
		addClass( popup, 'no-transition' );
		addClass( popup, state );

		setTimeout( function() {
			removeClass( popup, 'no-transition' );
			addClass( container, 'overlay-active' );
		}, 0 );

		currentState = state;
	}

	function deactivate() {
		document.removeEventListener( 'keyup', onDocumentKeyUp, false );
		document.removeEventListener( 'click', onDocumentClick, false );

		removeClass( container, 'overlay-active' );
	}

	function disableBlur() {
		addClass( document.documentElement, 'no-blur' );
	}

	function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( name, '' );
	}

	window.avgrund = {
		activate: activate,
		deactivate: deactivate,
		disableBlur: disableBlur
	}

})();