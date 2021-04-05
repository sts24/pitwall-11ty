module.exports = function(){
	const date = new Date();

	const fullDate = date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2);

	return {
		'year': [ date.getFullYear() ],
		'full': fullDate,
		'timestamp': Date.now()
	}
}