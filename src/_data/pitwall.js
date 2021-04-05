const CacheAsset = require("@11ty/eleventy-cache-assets");
const currentDate = require('./currentDate.js');

module.exports = async function(){

	let allYears = [];

	
	// get all data from a specified season
	async function getSeasonData(season){
		let seasonUrl = "https://ergast.com/api/f1/"+ season +"/results.json?limit=1000"
		let json = await CacheAsset(seasonUrl, {
			duration: "5d",
			type: "json"
		}).then(function(data){
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
		let allRacesArray = {};

		await Promise.all(allYears.map(async (year) => {
			let seasonUrl = "https://ergast.com/api/f1/"+ year +"/results.json?limit=1000"
			let seasonData = await CacheAsset(seasonUrl, {
				duration: "5d",
				type: "json"
			}).then(function(data){

				let year = data.MRData.RaceTable.season;
				let races = data.MRData.RaceTable.Races;

				allRacesArray[year] = races;

				return true;
			});

			return seasonData
		}));


		return allRacesArray;


	}



	// drivers standings
	async function driversStandings(){
		let allDriversArray = {}

		await Promise.all(allYears.map(async (year) => {
			let driversUrl = 'https://ergast.com/api/f1/' + year + '/driverStandings.json?limit=1000'
			let driversData = await CacheAsset(driversUrl, {
				duration: "5d",
				type: "json"
			}).then(function(data){

				let year = data.MRData.StandingsTable.season;
				let standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

				allDriversArray[year] = standings;

				return true;
			});

			return driversData
		}));

		return allDriversArray;
	}



	// constrcutors standings
	async function constructorsStandings(){
		let allConstructorsArray = {}

		await Promise.all(allYears.map(async (year) => {
			let constructorsUrl = 'https://ergast.com/api/f1/' + year + '/constructorStandings.json?limit=1000'
			let constructorsData = await CacheAsset(constructorsUrl, {
				duration: "5d",
				type: "json"
			}).then(function(data){

				let year = data.MRData.StandingsTable.season;
				let standings = (year >= 1958) ? data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings : {};

				allConstructorsArray[year] = standings;

				return true;
			});

			return constructorsData
		}));

		return allConstructorsArray;
	}




	// get schedule of current season
	async function currentSchedule(){

		let scheduleUrl = 'https://ergast.com/api/f1/' + currentDate().year + '.json?limit=1000';

		let scheduleData = await CacheAsset(scheduleUrl, {
			duration: "5d",
			type: "json"
		}).then(function(data){
			return data.MRData.RaceTable;
		});

		return scheduleData;

	}



	// return to 11ty
	return {
		years: allSeasonsData,
		races: await allRaces(),
		drivers: await driversStandings(),
		constructors: await constructorsStandings(),
		currentSchedule: await currentSchedule()
	};
}