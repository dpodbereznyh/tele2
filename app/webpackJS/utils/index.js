function insertMarkup (markup) {
	if (!markup) { return; }

	const anchor = document.getElementsByClassName('js-content')[0];
	
	anchor.innerHTML = markup;

	window.setTimeout(() => {
		$('html, body').animate({ 
			scrollTop: anchor.offsetTop,
		}, 400);
	}, 100);

	window.$apiInitComponents();
}

export {
	insertMarkup,
}