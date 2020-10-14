document.querySelector('#season-select').addEventListener('change',function(e){
	window.location = '/'+ e.target.value
});



document.querySelectorAll('.site-nav-button').forEach(function(tabBtn){

	tabBtn.addEventListener('click', function(btn){
		var thisBtn = btn.target;

		// deselect all
		document.querySelector('.content-tab[aria-hidden="false"]').setAttribute('aria-hidden', true);
		document.querySelectorAll('.site-nav-button').forEach(function(otherBtn){
			otherBtn.classList.remove('selected');
		});

		// select tab from ID
		document.querySelector('.content-tab[aria-labelledby="'+ thisBtn.id +'"]').setAttribute('aria-hidden', false);
		thisBtn.classList.add('selected');
	});

});


document.querySelectorAll('.reveal-btn').forEach(function(btn){

	btn.addEventListener('click', function(btn){
		var tableID = '#'+ btn.target.id.replace('-button', '');

		document.querySelector(tableID).classList.add('show-all');
		document.querySelector(tableID +' tfoot').classList.add('hide');
	});

});