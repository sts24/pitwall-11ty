const pluginSass = require("eleventy-plugin-sass");

module.exports = function(config){
	
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