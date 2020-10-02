const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function(){
	
	// get all data from a specified season
	async function getSeasonData(season){
		let seasonUrl = "https://ergast.com/api/f1/"+ season +"/results.json?limit=1000"
		let json = await CacheAsset(seasonUrl, {
			duration: "1d",
			type: "json"
		}).then(function(data){
			//console.log(data.MRData.RaceTable);
			return data.MRData.RaceTable;
		});
				
		return json;
	}
	
	
	// cache list of all seasons
	let allSeasonsUrl = "https://ergast.com/api/f1/seasons.json?limit=1000";
	let json = await CacheAsset(allSeasonsUrl, {
		duration: "1d",
		type: "json"
	});
	
	
	// make array from seasons data
	let allSeasons = [];
	
	json.MRData.SeasonTable.Seasons.forEach(function(item){
		let seasonKey = item.season;
		getSeasonData(item.season).then(function(data){ allSeasons.push(data); });
		
	});
	
	console.log(allSeasons);
	
	// return to 11ty
	return {
		data: allSeasons
	};
}