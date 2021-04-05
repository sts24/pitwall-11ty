const pluginSass = require("eleventy-plugin-sass");

module.exports = function(config){

	config.addShortcode("log", function (data) {
		console.log(data);
	});

	config.addFilter("convertTimestamp", function(raceDate){
		return Date.parse(raceDate);
	});

	config.addShortcode("formatDate", function(raceDate) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const raceUTC = new Date(raceDate)
  
		return months[raceUTC.getMonth()] + ' ' + raceUTC.getDate() + ', ' + raceUTC.getFullYear()
	});

	config.addShortcode("constructorsList", function(c) {
		let cList = [];

		c.forEach(function(c){
			cList.push('<a href="'+ c.url +'">'+ c.name +'</a>');
		});

		return cList.join(', ');
	});







	
	config.addPlugin(pluginSass, {
		outputDir: ''
	});

	config.addPassthroughCopy("images");
	config.addPassthroughCopy("js");
	config.addPassthroughCopy("fonts");

	
	return {
		dir: {
			input: "src",
			output: "dist"
		},
		templateFormats: [
			'md',
			'njk'
		]
	}
	
	
};