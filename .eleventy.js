const pluginSass = require("eleventy-plugin-sass");

module.exports = function(config){

	config.addShortcode("log", function (data) {
		console.log(data);
	});
	
	config.addPlugin(pluginSass, {
		outputDir: ''
	});

	config.addPassthroughCopy("images");
	config.addPassthroughCopy("js");

	
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