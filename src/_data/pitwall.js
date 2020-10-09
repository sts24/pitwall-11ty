const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function(){

	let allYears = [];

	
	// get all data from a specified season
	async function getSeasonData(season){
		let seasonUrl = "https://ergast.com/api/f1/"+ season +"/results.json?limit=1000"
		let json = await CacheAsset(seasonUrl, {
			duration: "5d",
			type: "json"
		}).then(function(data){
			//console.log(data.MRData.RaceTable);
			return data.MRData.RaceTable.Races;
		});
				
		return json;
	}
	
	
	// cache list of all seasons
	let allSeasonsUrl = "https://ergast.com/api/f1/seasons.json?limit=1000";
	let allSeasonsData = await CacheAsset(allSeasonsUrl, {
		duration: "1d",
		type: "json"
	}).then(data => {
		let returnData = [];
		data.MRData.SeasonTable.Seasons.forEach(item => {
			returnData.push(item.season);
			allYears.push(item.season);
		});
		return returnData;
	});

	

	// get list of races from a season
	async function allRaces(){
		let allRacesArray = []

		await Promise.all(allYears.map(async (year) => {
			let seasonUrl = "https://ergast.com/api/f1/"+ year +"/results.json?limit=1000"
			let seasonData = await CacheAsset(seasonUrl, {
				duration: "5d",
				type: "json"
			}).then(function(data){
				let returnData = {};

				let year = data.MRData.RaceTable.season;
				let races = data.MRData.RaceTable.Races;

				returnData['year'] = year;
				returnData['races'] = races;

				allRacesArray.push(returnData);

				return data.MRData.RaceTable.Races;
			});

			return seasonData
		}));

		return allRacesArray;


	}


	// return to 11ty
	return {
		years: allSeasonsData,
		races: await allRaces()
	};
}