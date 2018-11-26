var data;
var statistics = {
	reps: 0,
	demo: 0,
	indp: 0,
	pctreps: 0,
	pctdemo: 0,
	pctindp: 0,
	
}
var missed_pct;
var webswitch = window.location.pathname;
if (webswitch == "/house-party-loyalty.html") {
	webswitch = "house"
}
if (webswitch == "/senate-party-loyalty.html") {
	webswitch = "senate"
};
fetch("https://api.propublica.org/congress/v1/113/" + webswitch + "/members.json", {
	method: "GET",
	headers: {
		'X-API-Key': 'GzuzMGmbuI9hlH4qsgyL9tvZPk9fi6TKecHbLNav'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw new Error(response.statusText);
}).then(function (data) {
	members = data.results[0].members;
	missed_pct = Math.round(members.length * 0.10); //redondeamos el número de mimembros con Math.round, puesto que no se puede dividir un ser humano. //meter este 10% de miembros en una array nueva 
	fillparty(members);
	document.getElementById("rep1").innerHTML = statistics.reps;
	document.getElementById("dem1").innerHTML = statistics.demo;
	document.getElementById("ind1").innerHTML = statistics.indp;
	document.getElementById("rep2").innerHTML = (statistics.pctreps / statistics.reps).toFixed(2) + " %";
	document.getElementById("dem2").innerHTML = (statistics.pctdemo / statistics.demo).toFixed(2) + " %";
	//document.getElementById("total1").innerHTML = statistics.total;
	//document.getElementById("total2").innerHTML = statistics.averageTotal.toFixed(2) + " %";
	if (statistics.indp > 0) {
		document.getElementById("ind2").innerHTML = (statistics.pctindp / statistics.indp).toFixed(2) + " %";
	} else {
		document.getElementById("ind2").innerHTML = "--"
	}

	members.sort(function (a, b) { //ordenamos a los miembros de los partidos por el menor numero de votaciones
		if (a.votes_with_party_pct > b.votes_with_party_pct) {
			return 1;
		}
		if (a.votes_with_party_pct < b.votes_with_party_pct) {
			return -1;
		}
		return 0;
	});
	createTable(members);
	members.sort(function (a, b) { //ordenamos a los miembros de los partidos por el mayor numero de votaciones , al invertir el orden de los factores negativo y positivo, invertimos el orden de la lista.
		if (a.votes_with_party_pct > b.votes_with_party_pct) {
			return -1;
		}
		if (a.votes_with_party_pct < b.votes_with_party_pct) {
			return 1;
		}
		return 0;
	});
	createTable2(members);
}).catch(function (error) {
	console.log("Request Failed: " + error.message);
});



function fillparty() { //con esta función rellenamos la tabla para el número de RDI + calcular el % de votos de cada uno//
	for (var i = 0; i < members.length; i++) {
		if (members[i].party == "R") {
			statistics.reps += 1;
			statistics.pctreps += members[i].votes_with_party_pct;
		}
		if (members[i].party == "D") {
			statistics.demo += 1;
			statistics.pctdemo += members[i].votes_with_party_pct;
		}
		if (members[i].party == "I") {
			statistics.indp += 1;
			statistics.pctindp += members[i].votes_with_party_pct;
		}

	}


}

function createTable(object) { //creacion de la tabla para los miembros menos votados de cada partido y el % de votos.
	var tableBody = document.getElementById("leastloyal");
	tableBody.innerHTML = "";
	for (var i = 0; i < missed_pct; i++) {

		var tableRow = document.createElement("tr");
		var firstName = object[i].first_name;
		var middleName = object[i].middle_name;

		if (middleName === null) {
			middleName = "";
		}
		var lastName = object[i].last_name;
		var completeName = firstName + " " + middleName + " " + lastName;
		var link = document.createElement("a");
		link.setAttribute("href", object[i].url);
		link.innerHTML = completeName;
		var totalvotes = object[i].total_votes;
		var partypctvotes = object[i].votes_with_party_pct + " %";
		var seniority = object[i].seniority;
		var cells = [completeName, totalvotes, partypctvotes]
		for (var j = 0; j < cells.length; j++) {
			var tableCell = document.createElement("td");
			tableCell.append(cells[j]);
			tableRow.append(tableCell);
		}
		document.getElementById("leastloyal").append(tableRow);
	}
}

function createTable2(object2) { //creacion de la tabla para los miembros más votados de cada partido y el % de votos.
	var tableBody = document.getElementById("mostloyal");
	tableBody.innerHTML = "";
	for (var i = 0; i < missed_pct; i++) {

		var tableRow = document.createElement("tr");
		var firstName = object2[i].first_name;
		var middleName = object2[i].middle_name;

		if (middleName === null) {
			middleName = "";
		}
		var lastName = object2[i].last_name;
		var completeName = firstName + " " + middleName + " " + lastName;
		var link = document.createElement("a");
		link.setAttribute("href", object2[i].url);
		link.innerHTML = completeName;
		var totalvotes = object2[i].total_votes;
		var partypctvotes = object2[i].votes_with_party_pct + " %";
		var seniority = object2[i].seniority;
		var cells = [completeName, totalvotes, partypctvotes]
		for (var j = 0; j < cells.length; j++) {
			var tableCell = document.createElement("td");
			tableCell.append(cells[j]);
			tableRow.append(tableCell);
		}
		document.getElementById("mostloyal").append(tableRow);
	}

}
