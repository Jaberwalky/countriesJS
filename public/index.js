var app = function(){

	var url = 'https://restcountries.eu/rest/v2';
	var request = new XMLHttpRequest();
	request.open("GET", url);

	var select = document.getElementById('select-country');

	request.addEventListener('load', function(){
		var jsonString = request.responseText;
		var countries = JSON.parse( jsonString );
		populateDropdown( countries, select );
	});

	select.addEventListener('change', function(){
		var jsonString = request.responseText;
		var countries = JSON.parse( jsonString );
		countries.forEach(function(country){
			if (country.name === select.value){
				updateInfo(country, countries);

			}
		}.bind(this))
	})

	var jsonString = localStorage.getItem('lastCountry')
	var lastCountry =  JSON.parse(jsonString);
	updateInfo( lastCountry );

	request.send();
}

var populateDropdown = function(countries, select){
	// console.log("countries", countries);
	countries.forEach(function(country){
		var option = document.createElement('option');
		option.value = country.name;
		option.innerText = country.name;
		select.appendChild( option );
	});
}

var updateInfo = function(country, countries){
	var countryInfo = document.getElementById("country-info");
	var countryName = document.getElementById("country-name")
	countryName.innerText = "Name : " + country.name;
	var population = document.getElementById("population")
	population.innerText = "Population : " + country.population;
	var capital = document.getElementById("capital")
	capital.innerText = "Capital : " + country.capital;
	var flag = document.getElementById("flag");
	flag.src = country.flag;
	flag.width = 500;

	var neighbours = findNeighbours( country );
	var data = getNeighboursData( countries, neighbours )

	var htmlLIString = createLIs( data );
	var ul = document.getElementById('neighbours');
	ul.innerHTML = htmlLIString;
	var lastCountry = JSON.stringify( country );
	localStorage.setItem('lastCountry', lastCountry);
}

var findNeighbours = function ( country ) {
	var neighbours = country.borders;
	return neighbours;
}

var createLIs = function( neighbours ){
	var liString = "";
	for (var i = 0; i < neighbours.length; i++){
		liString += "<li>" + neighbours[i].name + "</li>";
	}
	return liString;
}

var getNeighboursData = function(countries, neighbours){
	if(!countries){return []}
	var neighbourDetails = [];

	for (var neighbour of neighbours){
		for (var i = 0; i < countries.length; i++){
			var country = countries[i]
			if (neighbour === country.alpha3Code) {
				neighbourDetails.push(countries[i])
			}
		}
	}
	return neighbourDetails
}


// var findLongName = function(alpha3Code){
// 	console.log()
// }





window.addEventListener('load', app);
