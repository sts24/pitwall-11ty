document.querySelector('#season-select').addEventListener('change',function(e){
	window.location = '/'+ e.target.value
});



document.querySelectorAll('.site-nav-button').forEach(function(tabBtn){

	tabBtn.addEventListener('click', function(btn){
		var btnID = btn.target.id;
		document.querySelector('.content-tab[aria-hidden="false"]').setAttribute('aria-hidden', true);

		document.querySelector('.content-tab[aria-labelledby="'+ btnID +'"]').setAttribute('aria-hidden', false);
	});

});