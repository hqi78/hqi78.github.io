var ourLoc;
var view;
var map;

function init() {
	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);

	view = new ol.View({
		center: ourLoc,
		zoom: 3 // Students can play around with the starting zoom.
	});

	map = new ol.Map({
		target: 'map', // The "Target" is our <div> name.
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM() // Explain: this is a required variable.
		  }) 
		  // Explain: Open Layer offers different types of layers. Layers are like
		  // different brushes used to make the same image. They look different.
		  // Some might take more time than others.
		],
		// Note from the View Animation website:
		// Improve user experience by loading tiles while animating. Will make
		// animations stutter on mobile or slow devices.
		loadTilesWhileAnimating: false,
		view: view
	});
}


function panHome() {
	view.animate({
		center: ourLoc, 
		duration: 1000  
	});
}


function panToLocation() {
	var countryName = document.getElementById("country-name").value;
	
	// make sure the person has typed something in.
	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	
	var lon = 0.0;
	var lat = 0.0;
	
	
	var query = "https://restcountries.eu/rest/v2/name/"+countryName;


	query = query.replace(/ /g, "%20")
//	alert(query);


	var countryRequest = new XMLHttpRequest();
	countryRequest.open('GET', query, false);
	countryRequest.send();


	if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === "") {
	 	window.console.error("Request had an error!");
		return;
	}


	var countryInformation = JSON.parse(countryRequest.responseText);

	var lat = countryInformation[0].latlng[0];
	var lon = countryInformation[0].latlng[1];
	
	window.console.log(countryName + ": lon " + lon + " & lat " + lat);

	
//	alert("Ready State " + countryRequest.readyState);
//	alert("Status " + countryRequest.status);
//	alert("Response" + countryRequest.responseText);


	var location = ol.proj.fromLonLat([lon, lat]);


	view.animate({
		center: location, 
		duration: 1000  
	});
}


// We can run the init function when the window loads.
window.onload = init;
